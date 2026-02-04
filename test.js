import axios from "axios";

/**
 * Attempts multiple lightweight methods to get Instagram post metadata
 * without cheerio, proxies, or login.
 *
 * @param {string} url - Full Instagram post URL (https://www.instagram.com/p/SHORTCODE/)
 * @returns {Promise<{title: string|null, thumbnail: string|null, video: string|null, description: string|null, source: string|null, raw?: any}|null>}
 */
export async function getInstagramMeta(url) {
  // polite headers (browser-like)
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp',
    'Referer': 'https://www.instagram.com/',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
  };

  // small helper for meta regex extraction
  const extractMeta = (html, property) => {
    // try property attr pattern first
    let re = new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, "i");
    let m = html.match(re);
    if (m && m[1]) return decodeHtmlEntities(m[1]);

    // try name="" pattern fallback
    re = new RegExp(`<meta[^>]+name=["']${property}["'][^>]+content=["']([^"']+)["']`, "i");
    m = html.match(re);
    if (m && m[1]) return decodeHtmlEntities(m[1]);

    return null;
  };

  // decode basic HTML entities in meta values
  const decodeHtmlEntities = (str) => {
    if (!str) return str;
    return str.replace(/&amp;/g, "&")
              .replace(/&lt;/g, "<")
              .replace(/&gt;/g, ">")
              .replace(/&quot;/g, '"')
              .replace(/&#39;/g, "'");
  };

  // Try 1: fetch raw HTML and look for og: meta tags
  try {
    const { data: html } = await axios.get(url, {
      headers,
      timeout: 10000,
      maxRedirects: 5,
      responseType: "text",
      validateStatus: s => s >= 200 && s < 400
    });

    // Primary meta extraction (fast)
    const title = extractMeta(html, "og:title");
    const thumbnail = extractMeta(html, "og:image");
    const video = extractMeta(html, "og:video");
    const description = extractMeta(html, "og:description");

    if (title || thumbnail || video || description) {
      return { title, thumbnail, video, description, source: "og_meta" };
    }

    // Try 2: structured JSON-LD: <script type="application/ld+json">...</script>
    let ldjsonMatch = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i);
    if (ldjsonMatch && ldjsonMatch[1]) {
      try {
        const jsonLd = JSON.parse(ldjsonMatch[1].trim());
        // JSON-LD shapes vary; try common fields
        const title_ld = jsonLd.headline || jsonLd.name || jsonLd.caption || null;
        const thumbnail_ld = (jsonLd.image && (typeof jsonLd.image === "string" ? jsonLd.image : jsonLd.image.url)) || null;
        const video_ld = (jsonLd.video && jsonLd.video.contentUrl) || null;
        const desc_ld = jsonLd.description || null;

        if (title_ld || thumbnail_ld || video_ld || desc_ld) {
          return {
            title: title_ld,
            thumbnail: thumbnail_ld,
            video: video_ld,
            description: desc_ld,
            source: "json_ld",
            raw: jsonLd
          };
        }
      } catch (e) {
        // ignore parse error, continue
      }
    }

    // Try 3: window._sharedData or other inline JSON blobs
    // Patterns:
    //  - window._sharedData = {...};
    //  - window.__additionalDataLoaded('shortcode', {...});
    //  - <script>window.__additionalDataLoaded(...)</script>
    const sharedDataRegex = /window\._sharedData\s*=\s*({[\s\S]*?});/;
    let sdMatch = html.match(sharedDataRegex);
    if (!sdMatch) {
      // try __additionalDataLoaded pattern
      const addDataRegex = /window\.__additionalDataLoaded\([^,]+,\s*({[\s\S]*?})\s*\);/;
      sdMatch = html.match(addDataRegex);
    }
    if (sdMatch && sdMatch[1]) {
      try {
        const shared = JSON.parse(sdMatch[1]);
        // navigate common graphql structures if present
        const shortcodeMedia = (
          shared?.entry_data?.PostPage?.[0]?.graphql?.shortcode_media ||
          shared?.graphql?.shortcode_media ||
          shared?.shortcode_media ||
          null
        );
        if (shortcodeMedia) {
          const title_sd = (shortcodeMedia.edge_media_to_caption?.edges?.[0]?.node?.text) || shortcodeMedia.title || null;
          const thumbnail_sd = shortcodeMedia.display_url || shortcodeMedia.thumbnail_src || null;
          const video_sd = shortcodeMedia.video_url || (shortcodeMedia.video_resources && shortcodeMedia.video_resources[0] && shortcodeMedia.video_resources[0].src) || null;
          const desc_sd = title_sd;

          if (title_sd || thumbnail_sd || video_sd || desc_sd) {
            return {
              title: title_sd,
              thumbnail: thumbnail_sd,
              video: video_sd,
              description: desc_sd,
              source: "shared_data",
              raw: shortcodeMedia
            };
          }
        }
      } catch (e) {
        // ignore parse error
      }
    }

    // Try 4: unofficial JSON endpoint ?__a=1&__d=dis
    // Sometimes Instagram returns JSON for this endpoint if headers look browser-like.
    try {
      // append params safely
      const endpoint = url.endsWith("/") ? `${url}?__a=1&__d=dis` : `${url}/?__a=1&__d=dis`;
      const res = await axios.get(endpoint, {
        headers,
        timeout: 8000,
        maxRedirects: 3,
        responseType: "json",
        validateStatus: s => (s >= 200 && s < 400) || s === 429
      });

      if (res.status === 200 && res.data) {
        // response shape varies between versions; try to find shortcode_media
        const body = res.data;
        const shortcodeMedia = body?.graphql?.shortcode_media || body?.items?.[0] || body?.items || body?.media || null;

        if (shortcodeMedia) {
          const title_q = (shortcodeMedia.edge_media_to_caption?.edges?.[0]?.node?.text) || shortcodeMedia.caption || shortcodeMedia.title || null;
          const thumbnail_q = shortcodeMedia.display_url || shortcodeMedia.thumbnail_src || (shortcodeMedia.image_versions2 && shortcodeMedia.image_versions2.candidates && shortcodeMedia.image_versions2.candidates[0].url) || null;
          const video_q = shortcodeMedia.video_url || (shortcodeMedia.video_versions && shortcodeMedia.video_versions[0] && shortcodeMedia.video_versions[0].url) || null;

          if (title_q || thumbnail_q || video_q) {
            return {
              title: title_q,
              thumbnail: thumbnail_q,
              video: video_q,
              description: title_q,
              source: "?__a=1",
              raw: shortcodeMedia
            };
          }
        }
      }
    } catch (e) {
      // ignore errors from this attempt
    }

    // nothing found
    return { title: null, thumbnail: null, video: null, description: null, source: "not_found" };
  } catch (err) {
    // Top-level fetch error (network, 4xx/5xx)
    return { title: null, thumbnail: null, video: null, description: null, source: "fetch_error", error: err.message };
  }
}

// quick manual test run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  (async () => {
    const testUrl = process.argv[2] || "https://www.instagram.com/reel/DOQ3-kLE0vA";
    const r = await getInstagramMeta(testUrl);
    console.log(r);
    process.exit(0);
  })();
}

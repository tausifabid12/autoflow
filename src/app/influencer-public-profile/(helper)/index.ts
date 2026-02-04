export interface IMedia {
    id: string;
    like_count: number;
    comments_count: number;
    timestamp: string;
    username: string;
    message: string;
    media_product_type: string;
    media_type: string;
    owner: Record<string, any>; 
    permalink: string;
    media_url: string;
    thumbnail_url: string;
    full_picture: string
    likes: {
        data: unknown[]; 
        summary: {
          total_count: number;
          can_like: boolean;
          has_liked: boolean;
        };
      };
      comments: {
        data: Array<{
          created_time: string;
          message: string;
          id: string;
          from?: {
            name: string;
            id: string;
          };
        }>;
        paging: {
          cursors: {
            before: string;
            after: string;
          };
        };
        summary: {
          order: string;
          total_count: number;
          can_comment: boolean;
        };
      };
      shares: {
        count: number;
      };
}



export async function getInstagramPost(accessToken: string, profileId: string, website: string): Promise<IMedia[]> {
  try {

    const response = await fetch('/api/instagram/get-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        access_token: accessToken,
        profileId: profileId,
        website: website
      })
    })

    const responseData = await response.json()
    return responseData?.data
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}


export interface IInstagramAccountDetails {
  id: string;
  username: string;
  followers_count: number;
  follows_count: number;
  media_count: number;
  profile_picture_url: string;
  account_type: string;
  website: string;
  biography: string;
}


// api/instagram.ts
export const fetchAccountDetails = async (accessToken: string, profileId: string, website: string): Promise<IInstagramAccountDetails> => {

  const response = await fetch('/api/instagram/account-details', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      instagramAccountId: profileId,
      accessToken: accessToken,
      website: website,
    }),
  });

  return response.json();
};

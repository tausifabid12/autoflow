import { NextRequest, NextResponse } from 'next/server';

// Types for better TypeScript support
interface MetricFilter {
  min?: number;
  max?: number;
  time_range?: string;
  breakdown?: string;
}

interface CreatorSearchParams {
  creator_id?: string;
  limit?: number;
  query?: string;
  sort_by?: 'followers' | 'relevance';
  creator_categories?: string[];
  creator_interests?: string[];
  creator_countries?: string[];
  major_audience_age_bucket?: string;
  major_audience_gender?: 'male' | 'female';
  major_audience_country?: string[];
  follower_count?: MetricFilter;
  interaction_rate?: MetricFilter;
  reach?: MetricFilter;
  interactions?: MetricFilter;
  publishing_activity?: MetricFilter;
  views?: MetricFilter;
  creator_languages?: string[];
  past_partnerships?: string[];
  has_past_partnerships?: boolean;
  fields?: string;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Access token - should be stored in environment variables
    const accessToken = 'EAAJomdeHZCb0BQsP2BrrA7rXpJrS6upaf8FnevUl8QDZCqIw6ReFhy8TR5OwWkac1ZBernV0q7tY0CjMJDadlP7EU5XziBFkZBzGVo1UiIrxH28ZCz3UtjsKAY1xrVoOhUAjuJ0kaYIlzmmQLrkeZB4aBJTJPAZC9emZBjDMOZCtacTR4Oh2xRB3HejjxLwqOF9nMOBNflSv4C3jNjFOZB1wN5ISwZBhxFkt0jZBRDAYoOH1Uha4Oib8NNrZBthRo';
    
    if (!accessToken) {
      return NextResponse.json(
        { error: 'Access token not configured' },
        { status: 500 }
      );
    }

    // Build query parameters
    const queryParams = new URLSearchParams();
    queryParams.append('access_token', accessToken);

    // Basic parameters
    const creatorId = searchParams.get('creator_id');
    if (creatorId) queryParams.append('creator_id', creatorId);

    const limit = searchParams.get('limit');
    if (limit) queryParams.append('limit', limit);

    const query = searchParams.get('query');
    if (query) queryParams.append('query', query);

    const sortBy = searchParams.get('sort_by');
    if (sortBy) queryParams.append('sort_by', sortBy);

    // Array parameters
    const creatorCategories = searchParams.get('creator_categories');
    if (creatorCategories) queryParams.append('creator_categories', creatorCategories);

    const creatorInterests = searchParams.get('creator_interests');
    if (creatorInterests) queryParams.append('creator_interests', creatorInterests);

    const creatorCountries = searchParams.get('creator_countries');
    if (creatorCountries) queryParams.append('creator_countries', creatorCountries);

    const creatorLanguages = searchParams.get('creator_languages');
    if (creatorLanguages) queryParams.append('creator_languages', creatorLanguages);

    const majorAudienceCountry = searchParams.get('major_audience_country');
    if (majorAudienceCountry) queryParams.append('major_audience_country', majorAudienceCountry);

    const pastPartnerships = searchParams.get('past_partnerships');
    if (pastPartnerships) queryParams.append('past_partnerships', pastPartnerships);

    // Audience parameters
    const majorAudienceAgeBucket = searchParams.get('major_audience_age_bucket');
    if (majorAudienceAgeBucket) queryParams.append('major_audience_age_bucket', majorAudienceAgeBucket);

    const majorAudienceGender = searchParams.get('major_audience_gender');
    if (majorAudienceGender) queryParams.append('major_audience_gender', majorAudienceGender);

    // Boolean parameters
    const hasPastPartnerships = searchParams.get('has_past_partnerships');
    if (hasPastPartnerships) queryParams.append('has_past_partnerships', hasPastPartnerships);

    // Metric filter parameters (JSON format)
    const followerCount = searchParams.get('follower_count');
    if (followerCount) queryParams.append('follower_count', followerCount);

    const interactionRate = searchParams.get('interaction_rate');
    if (interactionRate) queryParams.append('interaction_rate', interactionRate);

    const reach = searchParams.get('reach');
    if (reach) queryParams.append('reach', reach);

    const interactions = searchParams.get('interactions');
    if (interactions) queryParams.append('interactions', interactions);

    const publishingActivity = searchParams.get('publishing_activity');
    if (publishingActivity) queryParams.append('publishing_activity', publishingActivity);

    const views = searchParams.get('views');
    if (views) queryParams.append('views', views);

    // Fields parameter for response customization
    const fields = searchParams.get('fields');
    if (fields) {
      queryParams.append('fields', fields);
    }

    // Make request to Meta Creator Marketplace API
    const apiUrl = `https://graph.facebook.com/v21.0/creator_marketplace/creators?${queryParams.toString()}`;
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error('Creator Search API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// POST method for more complex queries
export async function POST(request: NextRequest) {
  try {
    const body: CreatorSearchParams = await request.json();
    
    const accessToken = process.env.META_ACCESS_TOKEN;
    
    if (!accessToken) {
      return NextResponse.json(
        { error: 'Access token not configured' },
        { status: 500 }
      );
    }

    const queryParams = new URLSearchParams();
    queryParams.append('access_token', accessToken);

    // Process all parameters from body
    if (body.creator_id) queryParams.append('creator_id', body.creator_id);
    if (body.limit) queryParams.append('limit', body.limit.toString());
    if (body.query) queryParams.append('query', body.query);
    if (body.sort_by) queryParams.append('sort_by', body.sort_by);
    
    if (body.creator_categories?.length) {
      queryParams.append('creator_categories', body.creator_categories.join(','));
    }
    
    if (body.creator_interests?.length) {
      queryParams.append('creator_interests', body.creator_interests.join(','));
    }
    
    if (body.creator_countries?.length) {
      queryParams.append('creator_countries', body.creator_countries.join(','));
    }
    
    if (body.creator_languages?.length) {
      queryParams.append('creator_languages', body.creator_languages.join(','));
    }
    
    if (body.major_audience_country?.length) {
      queryParams.append('major_audience_country', body.major_audience_country.join(','));
    }
    
    if (body.past_partnerships?.length) {
      queryParams.append('past_partnerships', body.past_partnerships.join(','));
    }
    
    if (body.major_audience_age_bucket) {
      queryParams.append('major_audience_age_bucket', body.major_audience_age_bucket);
    }
    
    if (body.major_audience_gender) {
      queryParams.append('major_audience_gender', body.major_audience_gender);
    }
    
    if (body.has_past_partnerships !== undefined) {
      queryParams.append('has_past_partnerships', body.has_past_partnerships.toString());
    }

    // Handle metric filters
    if (body.follower_count) {
      queryParams.append('follower_count', JSON.stringify(body.follower_count));
    }
    
    if (body.interaction_rate) {
      queryParams.append('interaction_rate', JSON.stringify(body.interaction_rate));
    }
    
    if (body.reach) {
      queryParams.append('reach', JSON.stringify(body.reach));
    }
    
    if (body.interactions) {
      queryParams.append('interactions', JSON.stringify(body.interactions));
    }
    
    if (body.publishing_activity) {
      queryParams.append('publishing_activity', JSON.stringify(body.publishing_activity));
    }
    
    if (body.views) {
      queryParams.append('views', JSON.stringify(body.views));
    }

    if (body.fields) {
      queryParams.append('fields', body.fields);
    }

    const apiUrl = `https://graph.facebook.com/v21.0/creator_marketplace/creators?${queryParams.toString()}`;
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error('Creator Search API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
export interface ArtistType {
  id: number;
  api_model: string;
  api_link: string;
  title: string;
  sort_title: string;
  alt_titles: string[];
  is_artist: boolean;
  birth_date: number;
  death_date: number;
  description: string;
  ulan_id: number;
  suggest_autocomplete_boosted: {
    input: string[];
    weight: number;
  };
  suggest_autocomplete_all: {
    input: string[];
    weight: number;
    contexts: {
      groupings: string[];
    };
  };
  source_updated_at: string;
  updated_at: string;
  timestamp: string;
}

export interface ArtistDetailsType {
  data: ArtistType;
  config: {
    website_url: string;
  };
  info: {
    license_links: string[];
    license_text: string;
    version: string;
  };
}

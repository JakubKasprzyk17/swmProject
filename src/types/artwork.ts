export interface ArtworkType {
  alt_artist_ids: [];
  alt_classification_ids: string[];
  alt_image_ids: [];
  alt_material_ids: [];
  alt_style_ids: [];
  alt_subject_ids: [];
  alt_technique_ids: [];
  alt_titles: null;
  api_link: string;
  api_model: string;
  artist_display: string;
  artist_id: number;
  artist_ids: number[];
  artist_title: string;
  artist_titles: string[];
  artwork_type_id: number;
  artwork_type_title: string;
  boost_rank: null;
  catalogue_display: string;
  category_ids: string[];
  category_titles: string[];
  classification_id: string;
  classification_ids: string[];
  classification_title: string;
  classification_titles: string[];
  color: {
    h: number;
    l: number;
    percentage: number;
    population: number;
    s: number;
  };
  colorfulness: number;
  copyright_notice: string;
  credit_line: string;
  date_display: string;
  date_end: number;
  date_qualifier_id: number;
  date_qualifier_title: string;
  date_start: number;
  department_id: string;
  department_title: string;
  description: string;
  dimensions: string;
  dimensions_detail: {
    clarification: string;
    depth_cm: number;
    depth_in: number;
    diameter_cm: number;
    diameter_in: number;
    height_cm: number;
    height_in: number;
    width_cm: number;
    width_in: number;
  }[];
  document_ids: [];
  edition: null;
  exhibition_history: null;
  fiscal_year: null;
  fiscal_year_deaccession: null;
  gallery_id: null;
  gallery_title: null;
  has_advanced_imaging: false;
  has_educational_resources: false;
  has_multimedia_resources: false;
  has_not_been_viewed_much: true;
  id: number;
  image_id: string;
  inscriptions: null;
  internal_department_id: 3;
  is_boosted: false;
  is_on_view: false;
  is_public_domain: false;
  is_zoomable: true;
  latitude: number;
  latlon: null;
  longitude: number;
  main_reference_number: string;
  material_id: string;
  material_ids: string[];
  material_titles: string[];
  max_zoom_window_size: number;
  medium_display: string;
  nomisma_id: null;
  on_loan_display: null;
  place_of_origin: string;
  provenance_text: null;
  publication_history: null;
  publishing_verification_level: string;
  section_ids: [];
  section_titles: [];
  site_ids: [];
  sound_ids: [];
  source_updated_at: string;
  style_id: null;
  style_ids: [];
  style_title: null;
  style_titles: [];
  subject_id: null;
  subject_ids: [];
  subject_titles: [];
  suggest_autocomplete_all: {
    contexts: any;
    input: any[];
    weight: number;
  }[];

  technique_id: null;
  technique_ids: [];
  technique_titles: [];
  term_titles: string[];
  text_ids: [];
  theme_titles: [];
  thumbnail: {
    alt_text: string;
    height: number;
    lqip: string;
    width: number;
  };
  timestamp: string;
  title: string;
  updated_at: string;
  video_ids: [];
}

export interface ArtworkDetailsType {
  data: ArtworkType;
  config: {
    iiif_url: string;
    website_url: string;
  };
  info: {
    license_links: string[];
    license_text: string;
    version: string;
  };
}

export interface ArtworksType {
  data: ArtworkType[];
  info: {
    license_links: string[];
    license_text: string;
    version: string;
  };
  config: {
    iiif_url: string;
    website_url: string;
  };
}

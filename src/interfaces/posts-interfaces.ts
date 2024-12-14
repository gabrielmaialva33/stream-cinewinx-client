export interface IReaction {
  reaction: string;
  count: number;
}

export interface IParsedContent {
  title: string;
  release_date: string | null;
  country_of_origin: string[];
  flags_of_origin: string[];
  directors: string[];
  writers: string[];
  cast: string[];
  languages: string[];
  flags_of_language: string[];
  subtitles: string[];
  flags_of_subtitles: string[];
  genres: string[];
  tags: string[];
  synopsis: string;
  curiosities: string | null;
}

export interface IPost {
  image_url: string;
  video_url: string;
  grouped_id: number;
  message_id: number;
  date: string;
  author: string;
  reactions: IReaction[];
  original_content: string;
  parsed_content: IParsedContent;
  document_id: number;
  document_size: number;
  message_document_id: number;
}
export interface IPostsAPI {
  data: IPost[];
  pagination: {
    total: number;
    per_page: number;
    offset_id: number;
    first_offset_id: number;
    last_offset_id: number;
    offset_date: string | null;
    add_offset: number;
    max_id: number;
    min_id: number;
  };
}

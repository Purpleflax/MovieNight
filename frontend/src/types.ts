export interface Movie {
  id: number;
  title: string;
  release_date: string | null;
  vote_average: number | null;
  genres: Genre[];
  poster_path: string | null;
  overview: string | null;
  director: string | null;
  year: number;
  primaryGenre: string;
  streamingServices?: StreamingService[];
}

export interface StreamingService {
  provider_id: number;
  provider_name: string;
  logo_path: string | null;
}

export interface Genre {
  id: number;
  name: string;
}

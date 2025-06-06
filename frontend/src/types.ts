export interface Movie {
  id: number;
  title: string;
  releaseDate: string | null;
  voteAverage: number;
  genres: Genre[];
  posterPath: string | null;
  overview: string | null;
  director: string | null;
  year: number;
  primaryGenre: string;
  streamingServices?: StreamingService[];
}

export interface StreamingService {
  providerId: number;
  providerName: string;
  logoPath: string | null;
}

export interface Genre {
  id: number;
  name: string;
}

// export interface Movie {
//   id: number;
//   title: string;
//   overview: string;
//   poster_path: string;
//   vote_average: number;
//   vote_count: number;
//   release_date: string;
//   genre_ids?: number[];
//   genres?: { id: number; name: string }[];
//   credits?: {
//     cast: CastMember[];
//     crew: CrewMember[];
//   };
// }

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
}

export type TMDBPage = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

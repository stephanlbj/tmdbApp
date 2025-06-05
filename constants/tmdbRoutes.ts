export const TMDB_API = {
  popular: (page: number) => `/movie/popular?page=${page}`,
  search: (query: string) => `/search/movie?query=${encodeURIComponent(query)}`,
  details: (id: string) => `/movie/${id}?append_to_response=credits`,
};

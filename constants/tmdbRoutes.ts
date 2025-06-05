export const TMDB_API = {
  popular: (page: number) => `/movie/popular?page=${page}`,
  search: (query: string, page: number) =>
    `/search/movie?query=${encodeURIComponent(query)}&page=${page}`,
  details: (id: number) => `/movie/${id}?append_to_response=credits`,
};

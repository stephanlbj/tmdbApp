import { getTMDBService } from "@/services/tmdb";
import { TMDBPage } from "@/types/movie";

export const fetchPopularMovies = async ({
  pageParam = 1,
}: {
  pageParam: number;
}) => {
  const tmdb = getTMDBService();
  return await tmdb.fetchPopularMovies(pageParam);
};

export const getNextPopularMoviesPage = (lastPage: TMDBPage) =>
  lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;

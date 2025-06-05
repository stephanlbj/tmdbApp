import { getQueryClient } from "@/lib/reactQueryClient";
import {
  fetchPopularMovies,
  getNextPopularMoviesPage,
} from "@/lib/usecases/fetchPopularMovies";
import { TMDBPage } from "@/types/movie";
import { InfiniteData } from "@tanstack/react-query";

export const prefetchPopularMovies = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery<
    TMDBPage,
    unknown,
    InfiniteData<TMDBPage, number>,
    ["movies"],
    number
  >({
    queryKey: ["movies"],
    queryFn: fetchPopularMovies,
    initialPageParam: 1,
    getNextPageParam: getNextPopularMoviesPage,
  });

  return queryClient;
};

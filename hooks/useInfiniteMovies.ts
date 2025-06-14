"use client";
import {
  useInfiniteQuery,
  useQueryClient,
  InfiniteData,
} from "@tanstack/react-query";
import { TMDBPage } from "@/types/movie";
import { getTMDBService } from "@/services/tmdb";

const tmdb = getTMDBService();

export const useInfiniteMovies = () => {
  const queryClient = useQueryClient();

  const cached = queryClient.getQueryData<InfiniteData<TMDBPage, number>>([
    "movies",
  ]);

  return useInfiniteQuery<
    TMDBPage,
    unknown,
    InfiniteData<TMDBPage, number>,
    [string],
    number
  >({
    queryKey: ["movies"],
    queryFn: ({ pageParam = 1 }) => tmdb.fetchPopularMovies(pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    initialData: cached as InfiniteData<TMDBPage, number> | undefined,
    refetchOnWindowFocus: false,
  });
};

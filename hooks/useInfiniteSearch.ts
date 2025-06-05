"use client";
import {
  useInfiniteQuery,
  useQueryClient,
  InfiniteData,
} from "@tanstack/react-query";
import { TMDBPage } from "@/types/movie";
import { getTMDBService } from "@/services/tmdb";

const tmdb = getTMDBService();

export const useInfiniteSearch = (query: string) => {
  const queryClient = useQueryClient();

  const cached = queryClient.getQueryData<InfiniteData<TMDBPage, number>>([
    "search",
  ]);

  return useInfiniteQuery<
    TMDBPage,
    unknown,
    InfiniteData<TMDBPage, number>,
    [string, string],
    number
  >({
    queryKey: ["search", query],
    queryFn: ({ pageParam = 1 }) => tmdb.searchMovies(query, pageParam),
    enabled: query.length > 0,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    initialData: cached as InfiniteData<TMDBPage, number> | undefined,
    refetchOnWindowFocus: false,
  });
};

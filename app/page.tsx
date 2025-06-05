import {
  HydrationBoundary,
  InfiniteData,
  dehydrate,
} from "@tanstack/react-query";
import { getQueryClient } from "@/lib/reactQueryClient";
import { getTMDBService } from "@/services/tmdb";
import { MovieList } from "@/components/MovieList/MovieList";
import { TMDBPage } from "@/types/movie";

export default async function Home() {
  const queryClient = getQueryClient();
  const tmdb = getTMDBService();

  await queryClient.prefetchInfiniteQuery<
    TMDBPage,
    unknown,
    InfiniteData<TMDBPage, number>,
    ["movies"],
    number
  >({
    queryKey: ["movies"],
    queryFn: ({ pageParam = 1 }: { pageParam: number }) =>
      tmdb.fetchPopularMovies(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage: TMDBPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MovieList />
    </HydrationBoundary>
  );
}

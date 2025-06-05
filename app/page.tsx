import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { MovieList } from "@/components/MovieList/MovieList";
import SearchInput from "@/components/SearchInput/SearchInput";
import { prefetchPopularMovies } from "@/lib/prefetch/prefetchPopularMovies";

export default async function Home() {
  const queryClient = await prefetchPopularMovies();

  return (
    <>
      <SearchInput />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MovieList />
      </HydrationBoundary>
    </>
  );
}

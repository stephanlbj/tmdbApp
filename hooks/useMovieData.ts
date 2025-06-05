"use client";
import { useInfiniteMovies } from "@/hooks/useInfiniteMovies";
import { useInfiniteSearch } from "@/hooks/useInfiniteSearch";
import { useSearch } from "@/providers/Provider";
import { Movie } from "@/types/movie";

type MovieData = {
  movies: Movie[];
  isLoading: boolean;
  isError: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
};

export function useMovieData(): MovieData {
  const { searchQuery } = useSearch();

  const isSearching = searchQuery.length > 0;

  const {
    data: searchData,
    isLoading: searchLoading,
    isError: searchError,
    fetchNextPage: fetchNextSearchPage,
    hasNextPage: hasNextSearchPage,
    isFetchingNextPage: isFetchingNextSearchPage,
  } = useInfiniteSearch(searchQuery);

  const {
    data: popularData,
    isLoading: popularLoading,
    isError: popularError,
    fetchNextPage: fetchNextPopularPage,
    hasNextPage: hasNextPopularPage,
    isFetchingNextPage: isFetchingNextPopularPage,
  } = useInfiniteMovies();

  if (isSearching) {
    return {
      movies: searchData?.pages.flatMap((page) => page.results) ?? [],
      isLoading: searchLoading,
      isError: searchError,
      fetchNextPage: fetchNextSearchPage,
      hasNextPage: hasNextSearchPage,
      isFetchingNextPage: isFetchingNextSearchPage,
    };
  } else {
    return {
      movies: popularData?.pages.flatMap((page) => page.results) ?? [],
      isLoading: popularLoading,
      isError: popularError,
      fetchNextPage: fetchNextPopularPage,
      hasNextPage: hasNextPopularPage,
      isFetchingNextPage: isFetchingNextPopularPage,
    };
  }
}

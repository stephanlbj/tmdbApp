"use client";

import { useInfiniteMovies } from "@/hooks/useInfiniteMovies";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { Movie } from "../Movie/Movie";
import { useInfiniteSearch } from "@/hooks/useInfiniteSearch";
import { useSearch } from "@/providers/Provider";

export const MovieList = () => {
  const { searchQuery } = useSearch();

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

  const isSearching = searchQuery.length > 0;

  const loadMoreRef = useInfiniteScroll(
    isSearching ? fetchNextSearchPage : fetchNextPopularPage,
    isSearching ? hasNextSearchPage : hasNextPopularPage
  );

  if (isSearching && searchLoading)
    return <div>Chargement de la recherche...</div>;
  if (isSearching && searchError) return <div>Erreur lors de la recherche</div>;
  if (!isSearching && popularLoading)
    return <div>Chargement des films populaires...</div>;
  if (!isSearching && popularError)
    return <div>Erreur lors du chargement des films populaires</div>;

  const movies = isSearching
    ? searchData?.pages.flatMap((page) => page.results) ?? []
    : popularData?.pages.flatMap((page) => page.results) ?? [];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {movies.map((movie, index) => (
        // key={`${movie.id}-${index}`}
        <Movie key={`${movie.id}-${index}`} movie={movie} index={index} />
      ))}
      <div ref={loadMoreRef} className="h-8 col-span-full">
        {(isSearching
          ? isFetchingNextSearchPage
          : isFetchingNextPopularPage) && <p>Chargement...</p>}
      </div>
    </div>
  );
};

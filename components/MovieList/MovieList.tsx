"use client";

import { useInfiniteMovies } from "@/hooks/useInfiniteMovies";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { Movie } from "../Movie/Movie";

export const MovieList = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteMovies();
  const loadMoreRef = useInfiniteScroll(fetchNextPage, hasNextPage);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Une erreur est survenue</div>;

  const movies = data.pages.flatMap((page) => page.results);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {movies.map((movie, index) => (
        // key={`${movie.id}-${index}`} Non recommandé sauf cas extrême
        <Movie key={`${movie.id}-${index}`} movie={movie} index={index} />
      ))}
      <div ref={loadMoreRef} className="h-8 col-span-full">
        {isFetchingNextPage && <p>Chargement...</p>}
      </div>
    </div>
  );
};

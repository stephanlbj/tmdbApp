"use client";

import { useInfiniteMovies } from "@/hooks/useInfiniteMovies";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

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
      {movies.map((movie) => (
        <div key={movie.id} className="bg-white shadow rounded-xl p-2">
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-md"
          />
          <h2 className="mt-2 font-semibold text-sm">{movie.title}</h2>
        </div>
      ))}
      <div ref={loadMoreRef} className="h-8 col-span-full">
        {isFetchingNextPage && <p>Chargement...</p>}
      </div>
    </div>
  );
};

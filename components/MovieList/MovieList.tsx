"use client";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useMovieData } from "@/hooks/useMovieData";
import { MovieGrid } from "@/components/MovieGrid/MovieGrid";
import CustomParagraph from "../CustomParagraph/CustomParagraph";

export const MovieList = () => {
  const {
    movies,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMovieData();

  const loadMoreRef = useInfiniteScroll(fetchNextPage, hasNextPage ?? false);

  if (isLoading) return <CustomParagraph message="Chargement..." />;
  if (isError) return <CustomParagraph message="Une erreur est survenue" />;

  return (
    <MovieGrid
      movies={movies}
      loadMoreRef={loadMoreRef}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
};

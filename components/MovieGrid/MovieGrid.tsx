import { Movie } from "@/types/movie";
import MovieCard from "@/components/MovieCard/MovieCard";
import CustomParagraph from "../CustomParagraph/CustomParagraph";

interface MovieGridProps {
  movies: Movie[];
  loadMoreRef: React.RefObject<HTMLDivElement | null>;
  isFetchingNextPage: boolean;
}

export function MovieGrid({
  movies,
  loadMoreRef,
  isFetchingNextPage,
}: MovieGridProps) {
  if (movies.length === 0) {
    return <CustomParagraph message="No result found!!" />;
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {movies.map((movie, index) => (
        <MovieCard key={`${movie.id}-${index}`} movie={movie} index={index} />
      ))}
      <div ref={loadMoreRef} className="h-8 col-span-full">
        {isFetchingNextPage && <CustomParagraph message="Chargement..." />}
      </div>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { Movie as MovieType } from "@/types/movie";

interface MovieProps {
  movie: Pick<MovieType, "id" | "title" | "poster_path">;
  index: number;
}

export const Movie = ({ movie, index }: MovieProps) => {
  const id = movie.id ?? 0;
  const title = movie.title ?? "Titre inconnu";
  const posterPath = movie.poster_path ?? null;

  if (!id) {
    return (
      <div className="block bg-white shadow rounded-xl p-2">
        <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center">
          <span className="text-gray-500 text-sm">Movie ID manquant</span>
        </div>
        <h2 className="mt-2 font-semibold text-sm truncate">{title}</h2>
      </div>
    );
  }

  return (
    <Link
      href={`/movies/${id}`}
      className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-2"
    >
      {posterPath ? (
        <div className="relative w-full aspect-[2/3] rounded-md overflow-hidden">
          <Image
            src={`https://image.tmdb.org/t/p/w500${posterPath}`}
            alt={title + id}
            fill
            className="object-cover"
            loading={index < 7 ? "eager" : "lazy"}
            priority={index < 7}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ) : (
        <div className="w-full aspect-[2/3] bg-gray-200 rounded-md flex items-center justify-center">
          <span className="text-gray-500 text-sm">Image indisponible</span>
        </div>
      )}

      <h2 className="mt-2 font-semibold text-sm sm:text-base text-center truncate">
        {title}
      </h2>
    </Link>
  );
};

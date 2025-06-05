import Image from "next/image";
import { TMDBMovie } from "@/types/movie";
import { getTMDBService } from "@/services/tmdb";
import CustomParagraph from "@/components/CustomParagraph/CustomParagraph";

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movieId = Number(id);

  if (isNaN(movieId)) {
    return <CustomParagraph message="Paramètre invalide" />;
  }

  const tmdb = getTMDBService();

  let movie: TMDBMovie;
  try {
    movie = await tmdb.fetchMovieDetails(movieId);
  } catch (error: unknown) {
    let message = "Erreur inconnue lors du chargement du film.";

    if (error instanceof Error) {
      message = error.message;
    }

    return <CustomParagraph message={message} />;
  }

  if (!movie) return <CustomParagraph message="Film introuvable" />;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mb-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center md:text-left">
        {movie.title}
      </h1>

      {movie.poster_path ? (
        <div className="relative w-full aspect-[2/3] md:aspect-[3/4] max-w-md mx-auto md:mx-0 mb-6">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title + movieId}
            fill
            className="rounded-lg object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ) : (
        <div className="w-full h-64 bg-gray-300  flex items-center justify-center mb-6 rounded-lg text-center text-sm text-gray-600">
          Image non disponible
        </div>
      )}

      <div className="space-y-2 text-base sm:text-lg">
        <p>
          <strong>Sortie :</strong> {movie.release_date || "Date inconnue"}
        </p>
        <p>
          <strong>Note moyenne :</strong> {movie.vote_average ?? "N/A"} / 10
        </p>
        <div>
          <p className="font-semibold mt-4 mb-1">Description :</p>
          <p>{movie.overview || "Pas de description disponible."}</p>
        </div>
      </div>
    </div>
  );
}

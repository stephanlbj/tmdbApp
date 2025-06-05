import { TMDB_API } from "@/constants/tmdbRoutes";
import { TMDBMovie, TMDBPage } from "@/types/movie";

export class TMDBService {
  constructor(private apiKey: string) {}

  private async get<T>(path: string, options?: RequestInit): Promise<T> {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${path}&api_key=${this.apiKey}`,
        {
          ...options,
        }
      );
      if (!res.ok) throw new Error(`TMDB API error: ${res.status}`);
      return res.json();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`TMDBService error: ${error.message}`);
      } else {
        throw new Error("TMDBService: erreur inconnue");
      }
    }
  }

  fetchPopularMovies(page = 1) {
    return this.get<TMDBPage>(TMDB_API.popular(page));
  }

  searchMovies(query: string, page: number = 1): Promise<TMDBPage> {
    return this.get<TMDBPage>(TMDB_API.search(query, page));
  }

  async fetchMovieDetails(id: number): Promise<TMDBMovie> {
    return this.get<TMDBMovie>(TMDB_API.details(id), {
      next: { revalidate: 3600 },
      cache: "force-cache",
    });
  }
}

import { TMDB_API } from "@/constants/tmdbRoutes";
import { TMDBMovie, TMDBPage } from "@/types/movie";

export class TMDBService {
  constructor(private apiKey: string) {}

  private async get<T>(path: string): Promise<T> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${path}&api_key=${this.apiKey}`
    );
    if (!res.ok) throw new Error(`TMDB API error: ${res.status}`);
    return res.json();
  }

  fetchPopularMovies(page = 1) {
    return this.get<TMDBPage>(TMDB_API.popular(page));
  }

  searchMovies(query: string, page: number = 1): Promise<TMDBPage> {
    return this.get<TMDBPage>(TMDB_API.search(query, page));
  }

  fetchMovieDetails(id: number) {
    return this.get<TMDBMovie>(TMDB_API.details(id));
  }
}

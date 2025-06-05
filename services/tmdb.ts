import { TMDBService } from "./tmdbServices";

let tmdbServiceInstance: TMDBService | null = null;

export function getTMDBService() {
  if (!tmdbServiceInstance) {
    tmdbServiceInstance = new TMDBService(process.env.NEXT_PUBLIC_API_KEY!);
  }
  return tmdbServiceInstance;
}

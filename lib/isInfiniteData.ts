import { TMDBPage } from "@/types/movie";
import type { InfiniteData } from "@tanstack/react-query";

export function isInfiniteTMDBPage(
  data: unknown
): data is InfiniteData<TMDBPage> {
  return (
    typeof data === "object" &&
    data !== null &&
    Array.isArray((data as InfiniteData<TMDBPage>).pages) &&
    Array.isArray((data as InfiniteData<TMDBPage>).pageParams)
  );
}

import {
  useInfiniteQuery,
  useQueryClient,
  InfiniteData,
} from "@tanstack/react-query";
import { TMDBService } from "@/services/tmdbServices";
import { TMDBPage } from "@/types/movie";

const tmdb = new TMDBService(process.env.NEXT_PUBLIC_API_KEY!);

export const useInfiniteMovies = () => {
  const queryClient = useQueryClient();

  const cached = queryClient.getQueryData<InfiniteData<TMDBPage, number>>([
    "movies",
  ]);

  return useInfiniteQuery<
    TMDBPage,
    unknown,
    InfiniteData<TMDBPage, number>,
    [string],
    number
  >({
    queryKey: ["movies"],
    queryFn: ({ pageParam = 1 }) => tmdb.fetchPopularMovies(pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    initialData: cached as InfiniteData<TMDBPage, number> | undefined,
  });
};

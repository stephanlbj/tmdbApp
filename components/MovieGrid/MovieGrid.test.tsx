import { render, screen } from "@testing-library/react";
import { MovieGrid } from "./MovieGrid";
import { Movie } from "@/types/movie";
import { mockedMovies } from "@/mocks/mockedMovies";

jest.mock("@/components/MovieCard/MovieCard", () => ({
  __esModule: true,
  default: ({ movie, index }: { movie: Movie; index: number }) => (
    <div data-testid="movie-card">
      {movie.title}-{index}
    </div>
  ),
}));

jest.mock("../CustomParagraph/CustomParagraph", () => ({
  __esModule: true,
  default: ({ message }: { message: string }) => <div>{message}</div>,
}));

describe("MovieGrid", () => {
  const movies: Movie[] = mockedMovies;

  const loadMoreRef = { current: null };

  it("renders MovieCard for each movie", () => {
    render(
      <MovieGrid
        movies={movies}
        loadMoreRef={loadMoreRef}
        isFetchingNextPage={false}
      />
    );

    const cards = screen.getAllByTestId("movie-card");
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent("Movie Title 1-0");
    expect(cards[1]).toHaveTextContent("Movie Title 2-1");
  });

  it("shows loading indicator when fetching next page", () => {
    render(
      <MovieGrid
        movies={movies}
        loadMoreRef={loadMoreRef}
        isFetchingNextPage={true}
      />
    );

    expect(screen.getByText("Chargement...")).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import MovieCard from "./MovieCard";

describe("MovieCard", () => {
  const baseMovie = {
    id: 123,
    title: "Un super film",
    poster_path: "/abc123.jpg",
  };

  it("renders link and image when movie has id and poster", () => {
    render(<MovieCard movie={baseMovie} index={0} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/movies/123");

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", baseMovie.title + baseMovie.id);
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent(baseMovie.poster_path))
    );

    expect(image).toHaveAttribute("loading", "eager");
  });

  it("sets loading=lazy and no priority when index >= 7", () => {
    render(<MovieCard movie={baseMovie} index={7} />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("loading", "lazy");
    expect(image).not.toHaveAttribute("priority");
  });

  it("renders placeholder when poster_path is missing", () => {
    const movie = { ...baseMovie, poster_path: null };
    render(<MovieCard movie={movie} index={0} />);

    expect(screen.queryByRole("img")).toBeNull();
    expect(screen.getByText(/Image indisponible/i)).toBeInTheDocument();
  });

  it("renders error message when id is missing", () => {
    const movie = { id: 0, title: "Titre sans id", poster_path: "/abc123.jpg" };
    render(<MovieCard movie={movie} index={0} />);

    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByText(/Movie ID manquant/i)).toBeInTheDocument();
    expect(screen.getByText("Titre sans id")).toBeInTheDocument();
  });

  it("renders default title when title is missing or empty", () => {
    const movie = { id: 123, title: undefined, poster_path: "/abc123.jpg" };
    render(<MovieCard movie={movie} index={0} />);

    expect(screen.getByText("Titre inconnu")).toBeInTheDocument();
  });
});

/**
 * @jest-environment node
 */
import nock from "nock";
import { TMDBService } from "@/services/tmdbServices";
import { TMDB_API } from "@/constants/tmdbRoutes";
import type { TMDBPage } from "@/types/movie";
import { mockedMovies, mockTMDBMovie } from "@/mocks/mockedMovies";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;

describe("TMDBService", () => {
  let service: TMDBService;

  beforeAll(() => {
    service = new TMDBService(API_KEY);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it("fetchPopularMovies should return popular movies page", async () => {
    const page = 1;
    const mockResponse: TMDBPage = {
      page,
      results: mockedMovies,
      total_pages: 10,
      total_results: 100,
    };

    nock(API_URL)
      .get(
        new RegExp(
          `${TMDB_API.popular(page).replace(/\?/g, "\\?")}.*api_key=${API_KEY}`
        )
      )
      .reply(200, mockResponse);

    const data = await service.fetchPopularMovies(page);
    expect(data).toEqual(mockResponse);
  });

  it("searchMovies should return search results", async () => {
    const query = "batman";
    const page = 2;
    const mockResponse: TMDBPage = {
      page,
      results: mockedMovies,
      total_pages: 5,
      total_results: 50,
    };

    nock(API_URL)
      .get(
        new RegExp(
          `${TMDB_API.search(query, page).replace(
            /\?/g,
            "\\?"
          )}.*api_key=${API_KEY}`
        )
      )
      .reply(200, mockResponse);

    const data = await service.searchMovies(query, page);
    expect(data).toEqual(mockResponse);
  });

  it("fetchMovieDetails should return movie details", async () => {
    const id = 42;
    const mockResponse = mockTMDBMovie;

    nock(API_URL)
      .get(
        new RegExp(
          `${TMDB_API.details(id).replace(/\?/g, "\\?")}.*api_key=${API_KEY}`
        )
      )
      .reply(200, mockResponse);

    const data = await service.fetchMovieDetails(id);
    expect(data).toEqual(mockResponse);
  });

  it("should throw error on bad response", async () => {
    const page = 1;

    nock(API_URL)
      .get(
        new RegExp(
          `${TMDB_API.popular(page).replace(/\?/g, "\\?")}.*api_key=${API_KEY}`
        )
      )
      .reply(500);

    await expect(service.fetchPopularMovies(page)).rejects.toThrow(
      /TMDB API error/
    );
  });

  it("should throw error on network failure", async () => {
    const page = 1;

    nock(API_URL)
      .get(
        new RegExp(
          `${TMDB_API.popular(page).replace(/\?/g, "\\?")}.*api_key=${API_KEY}`
        )
      )
      .replyWithError("Network failure");

    await expect(service.fetchPopularMovies(page)).rejects.toThrow(
      /TMDBService error/
    );
  });

  it("fetchMovieDetails should throw error when movie not found (404)", async () => {
    const id = 999999;

    nock(API_URL)
      .get(
        new RegExp(
          `${TMDB_API.details(id).replace(/\?/g, "\\?")}.*api_key=${API_KEY}`
        )
      )
      .reply(404, {
        status_message: "The resource you requested could not be found.",
      });

    await expect(service.fetchMovieDetails(id)).rejects.toThrow(
      /TMDB API error: 404/
    );
  });

  it("searchMovies should return empty results when no match", async () => {
    const query = "thismovieprobablydoesnotexist";
    const page = 1;
    const emptyResponse: TMDBPage = {
      page,
      results: [],
      total_pages: 0,
      total_results: 0,
    };

    nock(API_URL)
      .get(
        new RegExp(
          `${TMDB_API.search(query, page).replace(
            /\?/g,
            "\\?"
          )}.*api_key=${API_KEY}`
        )
      )
      .reply(200, emptyResponse);

    const data = await service.searchMovies(query, page);
    expect(data.results).toHaveLength(0);
    expect(data.total_results).toBe(0);
  });
});

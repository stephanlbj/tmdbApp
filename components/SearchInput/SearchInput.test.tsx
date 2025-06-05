import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchInput from "./SearchInput";

const setSearchQueryMock = jest.fn();

jest.mock("@/providers/Provider", () => ({
  useSearch: () => ({
    searchQuery: "",
    setSearchQuery: setSearchQueryMock,
  }),
}));

// On mock aussi useDebounce pour accélérer le test et éviter les timers réels
jest.mock("@/hooks/useDebounce", () => ({
  useDebounce: (value: string) => value,
}));

describe("SearchInput", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with default placeholder and classname", () => {
    render(<SearchInput />);
    const input = screen.getByPlaceholderText("search movie...");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass(
      "block w-full max-w-md p-2.5 mt-10 mx-auto mb-2.5 border-gray-900 bg-gray-300"
    );
  });

  it("calls setSearchQuery with debounced input value", async () => {
    render(<SearchInput debounceTime={300} />);
    const input = screen.getByPlaceholderText("search movie...");

    fireEvent.change(input, { target: { value: "hello" } });
    expect(input).toHaveValue("hello");

    await waitFor(() => {
      expect(setSearchQueryMock).toHaveBeenCalledWith("hello");
    });
  });

  it("accepts custom placeholder and classname", () => {
    render(<SearchInput placeholder="Tapez ici..." classname="my-class" />);
    const input = screen.getByPlaceholderText("Tapez ici...");
    expect(input).toHaveClass("my-class");
  });
});

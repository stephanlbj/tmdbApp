import { render, screen } from "@testing-library/react";
import CustomParagraph from "@/components/CustomParagraph/CustomParagraph";

describe("CustomParagraph", () => {
  it("affiche le message", () => {
    render(<CustomParagraph message="Bonjour le monde" />);
    expect(screen.getByText("Bonjour le monde")).toBeInTheDocument();
  });
});

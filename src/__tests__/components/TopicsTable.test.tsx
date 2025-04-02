/// <reference types="jest" />
import { render, screen, fireEvent, waitFor } from "../../test-utils";
import { TopicsTable } from "@/components/TopicsTable";
import "@testing-library/jest-dom";

describe("TopicsTable", () => {
  const mockTopics = [
    {
      id: 1,
      name: "Luxury Hotels",
      brandsDiscovered: 50,
      lastUpdated: "Mar 15, 2024",
    },
    {
      id: 2,
      name: "Beach Resorts",
      brandsDiscovered: 75,
      lastUpdated: "Mar 16, 2024",
    },
  ];

  it("renders the table with data", () => {
    render(<TopicsTable topics={mockTopics} activeFilter="All Topics" />);
    expect(screen.getByText("Luxury Hotels")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
  });

  it("handles search functionality", async () => {
    render(<TopicsTable topics={mockTopics} activeFilter="All Topics" />);
    const searchInput = screen.getByPlaceholderText(
      "Search topics, brands, or dates..."
    );
    fireEvent.change(searchInput, { target: { value: "Luxury" } });

    await waitFor(() => {
      expect(screen.getByText("Luxury Hotels")).toBeInTheDocument();
      expect(screen.queryByText("Beach Resorts")).not.toBeInTheDocument();
    });
  });

  it("handles pagination display", () => {
    render(<TopicsTable topics={mockTopics} activeFilter="All Topics" />);
    expect(screen.getByText("Showing 1 to 2 of 2 results")).toBeInTheDocument();
  });

  it("handles row size changes", async () => {
    render(<TopicsTable topics={mockTopics} activeFilter="All Topics" />);
    const select = screen.getByRole("combobox");
    fireEvent.click(select);
    fireEvent.click(screen.getByText("20"));
    expect(screen.getByText("Showing 1 to 2 of 2 results")).toBeInTheDocument();
  });
});

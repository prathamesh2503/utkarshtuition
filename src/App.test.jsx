import { render, screen } from "@testing-library/react";

// A tiny fake component to test
function SimpleHeader() {
  return <h1>Welcome to the Tuition Center</h1>;
}

test("renders the header correctly", () => {
  // 1. Render the component in our fake browser
  render(<SimpleHeader />);

  // 2. Find the element by its text
  const headingElement = screen.getByText(/Welcome to the Tuition Center/i);

  // 3. Assert that it actually exists on the screen
  expect(headingElement).toBeInTheDocument();
});

import { render, screen, fireEvent } from "@testing-library/react";
import BookingPage from "./components/BookingPage";
import { act } from "react-dom/test-utils";

test("renders learn react link", () => {

  render(<BookingPage />)

  act(() => {
    const date = screen.getByLabelText(/date/);
    const time = screen.getByDisplayValue(/17:00/);
    const guest = screen.getByLabelText(/guest/);
    const occasion = screen.getByDisplayValue(/Birthday/);
    const form = screen.getByRole("form");
    fireEvent.change(date, { target: { value: "2020.2.21" } });
    fireEvent.change(guest, { target: { value: 3 } });
    fireEvent.submit(form);
  });
});
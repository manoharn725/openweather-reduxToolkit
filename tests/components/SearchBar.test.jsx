import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../../src/components/SearchBar";

describe('SearchBar', ()=>{
    it("alls onFormSubmit with the correct input value", ()=>{
     // Mock the onFormSubmit function
     const mockOnFormSubmit = vi.fn();

     // Render the SearchBar component
     render(<SearchBar onFormSubmit={mockOnFormSubmit} />);
 
     // Find the input and button elements
     const inputElement = screen.getByRole("textbox");
     const buttonElement = screen.getByRole("button", { name: /search/i });
 
     // Simulate typing in the input field
     fireEvent.change(inputElement, { target: { value: "neralakatte" } });
 
     // Simulate clicking the search button
     fireEvent.click(buttonElement);
 
     // Assert that the mock function was called with the correct value
     expect(mockOnFormSubmit).toHaveBeenCalledTimes(1);
     expect(mockOnFormSubmit).toHaveBeenCalledWith("neralakatte");
    })
})
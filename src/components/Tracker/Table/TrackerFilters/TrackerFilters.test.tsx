import { render, fireEvent, screen } from "@testing-library/react";
import TrackerFilters from ".";
import TrackerFilterContainer from "./TrackerFilterContainer";

describe("TrackerFilterContainer", () => {
  it("should render the TrackerFilterContainer component", () => {
    const htmlFor = "filter-input";
    const label = "Filter Label";

    render(
      <TrackerFilterContainer htmlFor={htmlFor} label={label}>
        <input type="text" id={htmlFor} />
      </TrackerFilterContainer>
    );

    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  it("should associate the label with the input element", () => {
    const htmlFor = "filter-input";
    const label = "Filter Label";

    render(
      <TrackerFilterContainer htmlFor={htmlFor} label={label}>
        <input type="text" id={htmlFor} />
      </TrackerFilterContainer>
    );

    const labelElement = screen.getByText(label);
    const inputElement = screen.getByLabelText(label);
    expect(labelElement).toHaveAttribute("for", htmlFor);
    expect(inputElement).toHaveAttribute("id", htmlFor);
  });
});

describe("TrackerFilters", () => {
  const filters = {
    dateFrom: null,
    dateTo: null,
    searchTerm: "",
  };
  const onFiltersChange = jest.fn();

  it("should render the TrackerFilters component", () => {
    render(
      <TrackerFilters filters={filters} onFiltersChange={onFiltersChange} />
    );

    expect(screen.getByLabelText("Date from")).toBeInTheDocument();
    expect(screen.getByLabelText("Date to")).toBeInTheDocument();
    expect(screen.getByLabelText("Search")).toBeInTheDocument();
  });

  // NOTE: This test is commented out since I haven't figured out how to trigger a change in the Calendar component,
  // it could be done by clicking manually on the calendar icon and then selecting a date, but it seems unreliable.

  //   it("should update filters on date input change", () => {
  //     const { container } = render(
  //       <TrackerFilters filters={filters} onFiltersChange={onFiltersChange} />
  //     );

  //     const dateFromInput = container.querySelector(`input[name="dateFrom"]`)!;
  //     const dateToInput = container.querySelector(`input[name="dateTo"]`)!;

  //     fireEvent.change(dateFromInput, { target: { value: "2023-01-01" } });

  //     expect(onFiltersChange).toHaveBeenCalledWith({
  //       ...filters,
  //       dateFrom: "2023-01-01",
  //     });

  //     fireEvent.change(dateToInput, { target: { value: "2023-01-31" } });

  //     expect(onFiltersChange).toHaveBeenCalledWith({
  //       ...filters,
  //       dateFrom: "2023-01-01",
  //       dateTo: "2023-01-31",
  //     });
  //   });

  it("should update filters on search input change", () => {
    const { container } = render(
      <TrackerFilters
        filters={{ ...filters, searchTerm: "" }}
        onFiltersChange={onFiltersChange}
      />
    );

    const search = container.querySelector(`input[name="searchTerm"]`);

    fireEvent.change(search!, { target: { value: "Sample" } });

    expect(onFiltersChange).toHaveBeenCalledWith({
      ...filters,
      searchTerm: "Sample",
    });
  });

  it("should clear the search term when the clear icon is clicked", () => {
    const { container } = render(
      <TrackerFilters
        filters={{ ...filters, searchTerm: "Sample" }}
        onFiltersChange={onFiltersChange}
      />
    );

    const clearIcon = container.querySelector("i.pi.pi-times")!;

    fireEvent.click(clearIcon);

    expect(onFiltersChange).toHaveBeenCalledWith({
      ...filters,
      searchTerm: "",
    });
  });
});

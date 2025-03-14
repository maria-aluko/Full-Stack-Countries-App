import { render, screen } from "@testing-library/react";
import { DynamicTable } from "../DynamicTable";

describe("DynamicTable Tests", () => {
  it("should render the table with no data", () => {
    const data = [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "987-654-321",
      }
    ];
    // Render the component and check if it renders with no data:
    render(<DynamicTable data={data}/>);
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("undefined")).toBeInTheDocument();
  });
});
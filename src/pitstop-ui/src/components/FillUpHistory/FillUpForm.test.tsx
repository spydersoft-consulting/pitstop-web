import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { FillUpForm, type FillUpFormValues } from "./FillUpForm";

function renderForm(props: Partial<React.ComponentProps<typeof FillUpForm>> = {}) {
  const onSubmit = vi.fn();
  const utils = render(
    <MemoryRouter>
      <FillUpForm onSubmit={onSubmit} {...props} />
    </MemoryRouter>,
  );
  return { onSubmit, ...utils };
}

const filled: FillUpFormValues = {
  filledAt: new Date("2026-01-15T12:30:00Z"),
  odometerReading: 45230,
  gallonsAdded: 12.345,
  fuelGrade: "Premium",
  pricePerGallon: 3.459,
  totalCost: 42.71,
  isFullFillUp: true,
  stationName: "Shell on Main",
  notes: "Smelled like burnt toast",
};

describe("FillUpForm", () => {
  it("blocks submission and surfaces errors when required fields are missing", async () => {
    const user = userEvent.setup();
    const { onSubmit } = renderForm({
      initialValues: {
        ...filled,
        odometerReading: null,
        gallonsAdded: null,
        pricePerGallon: null,
        totalCost: null,
      },
    });

    await user.click(screen.getByRole("button", { name: /add fill-up/i }));

    expect(screen.getByText("Odometer reading is required.")).toBeInTheDocument();
    expect(screen.getByText("Gallons added is required.")).toBeInTheDocument();
    expect(screen.getByText("Price per gallon is required.")).toBeInTheDocument();
    expect(screen.getByText("Total cost is required.")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits a normalized create payload with ISO timestamp and trimmed strings", async () => {
    const user = userEvent.setup();
    const { onSubmit } = renderForm({
      initialValues: {
        ...filled,
        stationName: "  Shell  ",
        notes: "  ",
      },
    });

    await user.click(screen.getByRole("button", { name: /add fill-up/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    const body = onSubmit.mock.calls[0][0];
    expect(body).toMatchObject({
      odometerReading: 45230,
      gallonsAdded: 12.345,
      pricePerGallon: 3.459,
      totalCost: 42.71,
      isFullFillUp: true,
      fuelGrade: "Premium",
      stationName: "Shell",
      notes: null,
    });
    expect(body.filledAt).toBe("2026-01-15T12:30:00.000Z");
  });

  it("defaults a blank fuel grade to Midgrade", async () => {
    const user = userEvent.setup();
    const { onSubmit } = renderForm({
      initialValues: { ...filled, fuelGrade: "  " },
    });

    await user.click(screen.getByRole("button", { name: /add fill-up/i }));

    expect(onSubmit.mock.calls[0][0].fuelGrade).toBe("Midgrade");
  });

  it("uses the Save Changes label when in edit mode", () => {
    renderForm({ initialValues: filled, isEdit: true });
    expect(
      screen.getByRole("button", { name: /save changes/i }),
    ).toBeInTheDocument();
  });
});

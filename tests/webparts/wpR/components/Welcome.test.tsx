import { render, screen } from "@testing-library/react";
import * as React from "react";
import Welcome from "@/webparts/wpR/components/Welcome/Welcome";

describe("welcome component", () => {
	it("should render btn", () => {
		render(<Welcome msg="welcome" />);
		const btn = screen.getByRole("button", { name: /increase/i });
		expect(btn).toBeInTheDocument();
	});
});

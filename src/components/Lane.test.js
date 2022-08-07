import { render, screen } from "@testing-library/react";
import {Provider} from "react-redux";
import store from '../store'
import Lane from "./Lane";

//test block
test("Lane component", () => {
// render the component on virtual dom
render(<Provider store={store}><Lane /></Provider>);

//select the elements you want to interact with
const lane = screen.getByTestId("lane");
const laneTitle = screen.getByTestId("laneTitle");
const lanedata = screen.getByTestId("lanedata");

expect(lane).toHaveClass("lane");
expect(laneTitle).toHaveClass("laneTitle");
expect(lanedata).toHaveClass("lanedata");
});
import { render, screen } from "@testing-library/react";
import {Provider} from "react-redux";
import store from '../store'
import Item from "./Item";

//test block
test("Item component", () => {
// render the component on virtual dom
render(<Provider store={store}><Item /></Provider>);

//select the elements you want to interact with
const deleteItemButton = screen.getByTestId("deleteItemButton");
const discription = screen.getByTestId("discription");
const itemTitle = screen.getByTestId("itemTitle");
const itemFooter = screen.getByTestId("itemFooter");
const assignee = screen.getByTestId("assignee");
const viewButton = screen.getByTestId("viewButton");


expect(deleteItemButton).toHaveClass("deleteItemButton");
expect(discription).toHaveClass("discription");
expect(itemTitle).toHaveClass("itemTitle");
expect(itemFooter).toHaveClass("itemFooter");
expect(assignee).toHaveClass("assignee");
expect(viewButton).toHaveClass("viewButton")
});
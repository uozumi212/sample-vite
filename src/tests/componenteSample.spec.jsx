/**
 * @jest-environment jsdom
 */

import TestApp from "../testApp";
import React from "react";
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";

describe("Title Test", () => {
  it("タイトルがHello Jestであること", () => {
    // testId(title)を指定して取得
    render(<TestApp />);
    const title = screen.getByTestId("title");
    expect(title).toHaveTextContent("Hello Jest");
  });
});

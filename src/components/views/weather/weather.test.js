import React from "react";
import { shallow } from "enzyme";
import Weather from "./weather";

describe("Weather", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Weather />);
    expect(wrapper).toMatchSnapshot();
  });
});

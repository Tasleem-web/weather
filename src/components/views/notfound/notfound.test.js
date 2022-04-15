import React from "react";
import { shallow } from "enzyme";
import Notfound from "./notfound";

describe("Notfound", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Notfound />);
    expect(wrapper).toMatchSnapshot();
  });
});

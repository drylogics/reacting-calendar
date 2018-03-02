import React from "react";
import { render } from "react-dom";
import Calendar from "reacting-calendar";

const target = document.querySelector("#root");

render(
  <Calendar 
    name="Select Date:" 
    textInputVisible
  />, 
  target
);

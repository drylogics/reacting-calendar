import React from "react";
import { render } from "react-dom";
import Calendar from "./components/Calendar";
import "./index.css";

const target = document.querySelector("#root");

render(<Calendar name="Select Date:" textInputVisible={true} />, target);

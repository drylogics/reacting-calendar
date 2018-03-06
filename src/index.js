import React from "react";
import { render } from "react-dom";
import Calendar from "./components/Calendar";
import "./index.css";

const target = document.querySelector("#root");

render(
  <div className="container">
    <h1>Components</h1>
    <ul>
      <li className='component'>
        <div className="component calendar-component">
          <h2>Calendar Component</h2>
          <Calendar name="Select Date:" textInputVisible={true} />
        </div>
      </li>
    </ul>
  </div>,
  target
);

import React from "react";
import { render } from "react-dom";
import Calendar from "./components/Calendar";
import DataTable from "./components/DataTable";
import Table from "./components/Table/index.jsx";
import "./index.css";
import data from './temp.js';

const target = document.querySelector("#root");

let fakeDataTableData = data.fakeDataTableData;
let emptyDataTableData = data.emptyDataTableData;
let episodes = data.episodes;
let seasons = data.seasons;

render(
  <div className="container">
    <h1>Components</h1>
    <ul>
      {/* <li className='component'>
        <div className="component Calendar-component">
          <h2>Calendar Component</h2>
          <Calendar name="Select Date:" textInputVisible={true} />
        </div>
      </li>
      <li className='component'>
        <div className="component DataTable-component">
          <h2> DataTable Component</h2>
          <DataTable data={fakeDataTableData} />
        </div>
      </li> */}
      {/* <li className='component'>
        <div className="component DataTable-component">
          <h2>Empty DataTable Component</h2>
          <DataTable data={emptyDataTableData} />
        </div>
      </li> */}
      <li className='component'>
        <div className="component Table-component">
          <h2>Table Component</h2>
          <Table
            title="episodes"
            columns={episodes.columns}
            values={episodes.values} 
          />
        </div>
      </li>
    </ul>
  </div>,
  target
);

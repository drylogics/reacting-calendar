import React from "react";
import { render } from "react-dom";
import Calendar from "./components/Calendar";
import DataTable from "./components/DataTable";
import Table from "./components/Table/index.jsx";
import FilterTile from "./components/FilterTile/index.jsx";
import TvOverrideView from "./components/TableEdittable/index.jsx";
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
      {/* <li className='component'>
        <div className="component Table-component">
          <h2>Table Component</h2>
          <Table
            title="episodes"
            columns={episodes.columns}
            values={episodes.values} 
          />
        </div>
      </li> */}
      {/* <li className='component'>
        <div className="component Filter-component">
          <h2>Filter Component</h2>
          <FilterTile
            columns = {[]}
          />
        </div>
      </li> */}
      <li className='component'>
        <div className="component TableEdittable-component">
          <h2>Table Edittable Component</h2>
          <TvOverrideView
          />
        </div>
      </li>
    </ul>
  </div>,
  target
);

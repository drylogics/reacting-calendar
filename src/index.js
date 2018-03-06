import React from "react";
import { render } from "react-dom";
import Calendar from "./components/Calendar";
import DataTable from "./components/DataTable";
import "./index.css";

const target = document.querySelector("#root");

let fakeDataTableData = {
  headers: {
    "id": 'ID',
    "first_name": 'First Name',
    "last_name": 'Last Name',
    "email": 'E-mail',
    "gender": 'Gender',
    "company_name": 'Company Name'
  },
  values: [
    {
      id: 1,
      first_name: "Garwin",
      last_name: "Di Dello",
      email: "gdidello0@rakuten.co.jp",
      gender: "Male",
      company_name: "Kimia"
    },
    {
      id: 2,
      first_name: "Sherlock",
      last_name: "Bentote",
      email: "sbentote1@state.gov",
      gender: "Male",
      company_name: "Realblab"
    },
    {
      id: 3,
      first_name: "Persis",
      last_name: "Viccary",
      email: "pviccary2@amazon.co.uk",
      gender: "Female",
      company_name: "Edgeclub"
    },
    {
      id: 4,
      first_name: "Ashien",
      last_name: "Fidgeon",
      email: "afidgeon3@globo.com",
      gender: "Female",
      company_name: "Kwilith"
    },
    {
      id: 5,
      first_name: "Laurence",
      last_name: "Mattheis",
      email: "lmattheis4@businessweek.com",
      gender: "Male",
      company_name: "Trupe"
    },
    {
      id: 6,
      first_name: "Rhiamon",
      last_name: "Redmille",
      email: "rredmille5@statcounter.com",
      gender: "Female",
      company_name: "Oyoloo"
    },
    {
      id: 7,
      first_name: "Orazio",
      last_name: "Quakley",
      email: "oquakley6@cisco.com",
      gender: "Male",
      company_name: "Youfeed"
    },
    {
      id: 8,
      first_name: "Ignaz",
      last_name: "Hazle",
      email: "ihazle7@pen.io",
      gender: "Male",
      company_name: "Skaboo"
    },
    {
      id: 9,
      first_name: "Yardley",
      last_name: "Blackmuir",
      email: "yblackmuir8@scientificamerican.com",
      gender: "Male",
      company_name: "Voolia"
    },
    {
      id: 10,
      first_name: "Bernie",
      last_name: "Dutnell",
      email: "bdutnell9@nifty.com",
      gender: "Male",
      company_name: "Photobug"
    }
  ]
};

let emptyDataTableData = {
  headers: {
    "id": 'ID',
    "first_name": 'First Name',
    "last_name": 'Last Name',
    "email": 'E-mail',
    "gender": 'Gender',
    "company_name": 'Company Name'
  },
  values: []
};

render(
  <div className="container">
    <h1>Components</h1>
    <ul>
      <li className='component'>
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
      </li>
      <li className='component'>
        <div className="component DataTable-component">
          <h2>Empty DataTable Component</h2>
          <DataTable data={emptyDataTableData} />
        </div>
      </li>
    </ul>
  </div>,
  target
);

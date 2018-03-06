import React from "react";
import { shallow, mount } from "enzyme";
import sinon from "sinon";
import DataTable from "../src/components/DataTable";
import _ from 'lodash';

let fakeData = {
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

let emptyData = {
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

describe("Table", () => {
  let table = <DataTable data={fakeData} />;
  let shallowWrapper = shallow(table);
  let mountedWrapper = mount(table);

  it("should display table element", () => {
    expect(shallowWrapper.find("table")).to.have.length(1);
  });

  it("should display empty table element", () => {
    let mountedWrapper = mount(<DataTable data={emptyData} />);
    expect(mountedWrapper.find("table")).to.have.length(1);

    let rows = mountedWrapper.find("tfoot tr.footer-row");
    expect(rows).to.have.length(1);
    expect(rows.map(row => row.text())).to.deep.equal(["No Data available."]);
  });
});

describe("HeaderRow", () => {
  let dataTable = <DataTable data={fakeData} />;
  let emptyTable = <DataTable data={fakeData} />;
  let mountedWrapper = mount(dataTable);
  let shallowWrapper = shallow(dataTable);

  it("should display header row", () => {
    expect(mountedWrapper.find("Header"))
      .to.have.prop("headers")
      .deep.equal(_.values(fakeData.headers));
  });

  it("should display header row for empty table", () => {
    let mountedWrapper = mount(emptyTable);
    expect(
      mountedWrapper.find("thead tr.header-row th").map(head => head.text())
    ).deep.equal(_.values(fakeData.headers));
  });
});

describe("Row", () => {
  let dataTable = <DataTable data={fakeData} />;
  let mountedWrapper = mount(dataTable);

  it("should display header row", () => {
    expect(mountedWrapper.find("tr.row"))
      .to.have.length(10)
  });

  it("should display header row", () => {
    let firstRow = mountedWrapper.find("tr.row").first()
    expect(firstRow.find('td').map(td => td.text()))
      .to.deep.equal(_.values(fakeData.values[0]).map(value => value.toString()))
  });
});

describe("Row", () => {
  let dataTable = <DataTable data={fakeData} />;
  let mountedWrapper = mount(dataTable);

  it("should display header row", () => {
    expect(mountedWrapper.find("tr.row"))
      .to.have.length(10)
  });

  it("should display header row", () => {
    let firstRow = mountedWrapper.find("tr.row").first()
    expect(firstRow.find('td').map(td => td.text()))
      .to.deep.equal(_.values(fakeData.values[0]).map(value => value.toString()))
  });
});

describe('Footer', () => {
  it("should not display for table with data", () => {
    let mountedWrapper = mount(<DataTable data={fakeData} />);
    let rows = mountedWrapper.find("tfoot tr.footer-row.empty");
    expect(rows).to.have.length(0);
  });

  it("should display empty table element", () => {
    let mountedWrapper = mount(<DataTable data={emptyData} />);
    let rows = mountedWrapper.find("tfoot tr.footer-row.empty");
    expect(rows).to.have.length(1);
    expect(rows.map(row => row.text())).to.deep.equal(["No Data available."]);
  });
})
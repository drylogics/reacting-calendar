import React from "react";
import { shallow, mount } from "enzyme";
import sinon from "sinon";
import FilterTile, { Filter } from "../src/components/FilterTile";
import _ from 'lodash';

describe('FilterTile', () => {
  it('with no props tile should render div with no child components', () => {
    let filter = shallow(<FilterTile/>)
    expect(filter.name()).to.equal('div')
    expect(filter).to.have.className('filter-tile')
    expect(filter.find('div').children()).to.have.length(0)
  })
  
  context('with columns prop', () => {
    it('should be able to get column names from key property of objects', () => {
      let filter = shallow(<FilterTile columns = {[{key: 'column1'}, {key: 'column2'}]}/>)
      expect(filter.find('Filter')).to.have.length(2)
      expect(filter.find('Filter').map(fil => fil.props().title)).to.deep.equal(['column1', 'column2'])
    })
    
    it('should ', () => {
      
    });

  });
});


{/* <FilterTile 
  columns={[
    {
      key: 'id',
      collection: [],
      visible: true
    },
    {
      key:'content'
    },
    {
      key: 'id',
      collection: []
    }
  ]}
/> */}
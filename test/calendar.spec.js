import React from 'react';
import { shallow, mount } from 'enzyme';
import Calendar, { Header, CalendarDays } from '../src/components/Calendar';
import moment from 'moment/moment';
import sinon from 'sinon';

// <div class="from-calendar">
//   <label>Start Date:</label>
//   <div class="datepicker datepicker-inline">
//     <div class="datepicker-days" style="display: block;">
//       <table class=" table-condensed">
//         <thead>
//           <tr>
//             <th class="prev" style="visibility: visible;">«</th>
//             <th colspan="5" class="datepicker-switch">February 1999</th>
//             <th class="next" style="visibility: visible;">»</th>
//           </tr>
//           <tr>
//             <th class="dow">Su</th>
//             <th class="dow">Mo</th>
//             <th class="dow">Tu</th>
//             <th class="dow">We</th>
//             <th class="dow">Th</th>
//             <th class="dow">Fr</th>
//             <th class="dow">Sa</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td class="day old">31</td>
//             <td class="day">1</td>
//             <td class="day">2</td>
//             <td class="day">3</td>
//             <td class="day">4</td>
//             <td class="day">5</td>
//             <td class="day">6</td>
//           </tr>
//           <tr>
//             <td class="day">7</td>
//             <td class="day">8</td>
//             <td class="day">9</td>
//             <td class="day">10</td>
//             <td class="day">11</td>
//             <td class="day">12</td>
//             <td class="day">13</td>
//           </tr>
//           <tr>
//             <td class="day">14</td>
//             <td class="day">15</td>
//             <td class="day">16</td>
//             <td class="day">17</td>
//             <td class="day">18</td>
//             <td class="day">19</td>
//             <td class="day">20</td>
//           </tr>
//           <tr>
//             <td class="day">21</td>
//             <td class="day">22</td>
//             <td class="day">23</td>
//             <td class="day">24</td>
//             <td class="day">25</td>
//             <td class="day">26</td>
//             <td class="day">27</td>
//           </tr>
//           <tr>
//             <td class="day">28</td>
//             <td class="day new">1</td>
//             <td class="day new">2</td>
//             <td class="day new">3</td>
//             <td class="day new">4</td>
//             <td class="day new">5</td>
//             <td class="day new">6</td>
//           </tr>
//           <tr>
//             <td class="day new">7</td>
//             <td class="day new">8</td>
//             <td class="day new">9</td>
//             <td class="day new">10</td>
//             <td class="day new">11</td>
//             <td class="day new">12</td>
//             <td class="day new">13</td>
//           </tr>
//         </tbody>
//         <tfoot>
//           <tr>
//             <th colspan="7" class="today" style="display: none;">Today</th>
//           </tr>
//           <tr>
//             <th colspan="7" class="clear" style="display: none;">Clear</th>
//           </tr>
//         </tfoot>
//       </table>
//     </div>
//     <div class="datepicker-months" style="display: none;">
//       <table class="table-condensed">
//         <thead>
//           <tr>
//             <th class="prev" style="visibility: visible;">«</th>
//             <th colspan="5" class="datepicker-switch">1999</th>
//             <th class="next" style="visibility: visible;">»</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td colspan="7"><span class="month">Jan</span><span class="month">Feb</span><span class="month">Mar</span><span class="month">Apr</span><span class="month">May</span><span class="month">Jun</span><span class="month">Jul</span><span class="month">Aug</span><span class="month">Sep</span><span class="month">Oct</span><span class="month">Nov</span><span class="month">Dec</span></td>
//           </tr>
//         </tbody>
//         <tfoot>
//           <tr>
//             <th colspan="7" class="today" style="display: none;">Today</th>
//           </tr>
//           <tr>
//             <th colspan="7" class="clear" style="display: none;">Clear</th>
//           </tr>
//         </tfoot>
//       </table>
//     </div>
//     <div class="datepicker-years" style="display: none;">
//       <table class="table-condensed">
//         <thead>
//           <tr>
//             <th class="prev" style="visibility: visible;">«</th>
//             <th colspan="5" class="datepicker-switch">1990-1999</th>
//             <th class="next" style="visibility: visible;">»</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td colspan="7"><span class="year old">1989</span><span class="year">1990</span><span class="year">1991</span><span class="year">1992</span><span class="year">1993</span><span class="year">1994</span><span class="year">1995</span><span class="year">1996</span><span class="year">1997</span><span class="year">1998</span><span class="year">1999</span><span class="year new">2000</span></td>
//           </tr>
//         </tbody>
//         <tfoot>
//           <tr>
//             <th colspan="7" class="today" style="display: none;">Today</th>
//           </tr>
//           <tr>
//             <th colspan="7" class="clear" style="display: none;">Clear</th>
//           </tr>
//         </tfoot>
//       </table>
//     </div>
//   </div>
// </div>

describe('Header', () => {
  let mayFifth = moment('2017-05-05').startOf('day')
  let month = mayFifth.month();
  let year = mayFifth.year();
  let onNext = sinon.spy();
  let onPrevious = sinon.spy();
  const wrapper = shallow(<Header month={month} year={year} onNext={onNext} onPrevious={onPrevious} />);

  it('should display month and year' , () => {
    expect(wrapper.find('th.datepicker-switch').text()).to.equal(mayFifth.format('MMMM YYYY'));
  });

  it('should display set month', () => {
    expect(wrapper.find('th.datepicker-switch').text()).to.equal('May 2017');
  });

  it('should display weekday labels in header', () => {
    expect(wrapper.find('th.dow')).to.have.length(7);
    expect(wrapper.find('th.dow').map((th)=> th.text())).to.deep.equal(['SU','MO','TU','WE','TH','FR','SA']);    
  });

  it('should trigger previous' , () => {
    let previous = wrapper.find('th.prev')
    previous.simulate('click');
    expect(onPrevious.calledOnce).to.be.true
  });

  it('should trigger next' , () => {
    let previous = wrapper.find('th.next')
    previous.simulate('click');
    expect(onNext.calledOnce).to.be.true
  });
});

describe('Calendar', () => {
  let mayFifth = moment('2017-05-05').startOf('day')
  let today = moment('2017-05-05').startOf('day')
  
  it('should display label' , () => {
    const wrapper = shallow(<Calendar name="Start Date"/>);
    expect(wrapper.find('label').text()).to.equal("Start Date");
  });

  it('should display calendar header', () =>{
    const wrapper = shallow(<Calendar name="Start Date" selectedDate='2017-05-05'/>);
    expect(wrapper.find('Header')).to.have.prop('month').deep.equal(4)
    expect(wrapper.find('Header')).to.have.prop('year').deep.equal(2017)
  });

  it('should display calendar days', () =>{
    const wrapper = shallow(<Calendar name="Start Date" selectedDate='2017-05-05'/>);
    expect(wrapper.find('CalendarDays')).to.have.prop('selectedDate').deep.equal(today)
    expect(wrapper.find('CalendarDays')).to.have.prop('visibleDate').deep.equal(mayFifth)
  });
 
  it('should show previous month on left navigation' , () => {
    const wrapper = mount(<Calendar name="Start Date" selectedDate='2017-05-05'/>);
    expect(wrapper.find('th.datepicker-switch').text()).to.equal('May 2017');
    let previous = wrapper.find('th.prev')
    previous.simulate('click');
    expect(wrapper.find('th.datepicker-switch').text()).to.equal('April 2017');
    previous.simulate('click');
    expect(wrapper.find('th.datepicker-switch').text()).to.equal('March 2017');
    previous.simulate('click');
    previous.simulate('click');
    previous.simulate('click');
    expect(wrapper.find('th.datepicker-switch').text()).to.equal('December 2016');
  });


  it('should show next month on right navigation' , () => {
    const wrapper = mount(<Calendar name="Start Date" selectedDate='2017-12-05'/>);
    expect(wrapper.find('th.datepicker-switch').text()).to.equal('December 2017');
    let next = wrapper.find('th.next')
    next.simulate('click');
    expect(wrapper.find('th.datepicker-switch').text()).to.equal('January 2018');
    next.simulate('click');
    expect(wrapper.find('th.datepicker-switch').text()).to.equal('February 2018');
    next.simulate('click');
    next.simulate('click');
    next.simulate('click');
    expect(wrapper.find('th.datepicker-switch').text()).to.equal('May 2018');
  });

  // it('should display selected date by default', () =>{
  //   const wrapper = shallow(<Calendar name="Start Date" selectedDate='2017-12-05'/>);
  //   wrapper.simulate('load');
  //   expect(wrapper.state().visibleDate).to.deep.equal(moment('2017-12-05'))
  //   // let dates = wrapper.find('td.day').map((td)=> td.text())
  //   // let expectedDates = [ 
  //   //   '26','27','28','29','30','01','02',
  //   //   '03','04','05','06','07','08','09',
  //   //   '10','11','12','13','14','15','16',
  //   //   '17','18','19','20','21','22','23',
  //   //   '24','25','26','27','28','29','30',
  //   //   '31','01','02','03','04','05','06'
  //   // ]
  //   // expect(dates).to.deep.equal(expectedDates)
  // });

  // it('should set visible date to previous month when left arrrow is clicked', () =>{
  //   const wrapper = shallow(<Calendar name="Start Date" selectedDate='2017-12-05'/>);
  //   expect(wrapper.state().visibleDate).to.deep.equal(moment('2017-12-05'))
  //   let previous = wrapper.find('th.prev')
  //   previous.simulate('click');
  //   wrapper.update();
  //   expect(wrapper.state().visibleDate).to.deep.equal(moment('2017-11-01'))
  // });
});

describe('CalendarDays', ()=>{
  let mayFifth = moment('2017-05-05').startOf('day')
  let today = moment('2017-05-05').startOf('day')
  const wrapper = mount(<CalendarDays visibleDate={mayFifth} selectedDate={today}/>);

  
  it('should have correct number of date rows and cells', ()=>{
    let dates = wrapper.find('td.day')
    expect(wrapper.find('tr')).to.have.length(6);
    wrapper.find('tbody tr').forEach((row)=>{
      expect(row.find('td.day')).to.have.length(7);
    })
    expect(wrapper.find('tr td.day')).to.have.length(42);
  });
});
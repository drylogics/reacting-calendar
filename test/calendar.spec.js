import React from 'react';
import { shallow, mount } from 'enzyme';
import { Calendar } from '../src/components/Calendar';
import moment from 'moment/moment';

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
describe('Calendar', () => {

  it('should display label' , () => {
    const wrapper = shallow(<Calendar name="Start Date"/>);
    expect(wrapper.find('label').text()).to.equal("Start Date");
  });

  it('should display current month by default' , () => {
    const wrapper = shallow(<Calendar name="Start Date"/>);
    expect(wrapper.find('th.datepicker-switch').text()).to.equal(moment().format('MMMM YYYY'));
  });

  it('should display set month', () => {
    const wrapper = shallow(<Calendar name="Start Date" selectedDate='2017-05-05'/>);
    expect(wrapper.find('th.datepicker-switch').text()).to.equal('May 2017');
  });

  it('should show previous month on left navigation' , () => {
    const wrapper = shallow(<Calendar name="Start Date" selectedDate='2017-05-05'/>);
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
    const wrapper = shallow(<Calendar name="Start Date" selectedDate='2017-12-05'/>);
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

  it('should display weekday labels in header', () => {
    const wrapper = shallow(<Calendar name="Start Date"/>);
    expect(wrapper.find('th.dow')).to.have.length(7);
    expect(wrapper.find('th.dow').map((th)=> th.text())).to.deep.equal(['SU','MO','TU','WE','TH','FR','SA']);    
  });
});
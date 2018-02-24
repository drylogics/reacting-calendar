import React from 'react';
import { render } from 'react-dom';
import Calendar from './components/Calendar';
import './index.css';
(function () {
    var childProcess = require("child_process");
    var oldSpawn = childProcess.spawn;
    function mySpawn() {
        console.log('spawn called');
        console.log(arguments);
        var result = oldSpawn.apply(this, arguments);
        return result;
    }
    childProcess.spawn = mySpawn;
})();

const target = document.querySelector('#root');

render(React.createElement(Calendar, { name: 'Select Date:', textInputVisible: true }), target);
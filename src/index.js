import React from 'react';
import ReactDOM from 'react-dom';
//Import your components here
import P3D from './components/P3D';
import NetCheck from './components/NetCheck';

ReactDOM.render(
  <React.StrictMode>
    <p>Main Page (from_index.js)</p>
    <NetCheck />
    <P3D />
  </React.StrictMode>,
  document.getElementById('root')
);

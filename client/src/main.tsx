import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainMenu from './MainMenu';
import ExploreData from './ExploreData';
import Graph1 from './Graph1'
import Graph2 from './Graph2';
import Graph3 from './Graph3'
import Graph4 from './Graph4';
import GraphGenerated from './GraphGenerated';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/explore-data" element={<ExploreData />} />
        <Route path="/graph1" element={<Graph1 />} />
        <Route path="/graph2" element={<Graph2 />} />
        <Route path="/graph3" element={<Graph3 />} />
        <Route path="/graph4" element={<Graph4 />} />
        <Route path='/graph-generated' element={<GraphGenerated />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

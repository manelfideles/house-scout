import React from 'react';
import ReactDOM from 'react-dom/client';
import { MapProvider } from 'react-map-gl';
import App from './App';
import { ClickedCountyContextProvider } from './hooks/useClickedCounty';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MapProvider>
      <ClickedCountyContextProvider>
        <App />
      </ ClickedCountyContextProvider>
    </MapProvider>
  </React.StrictMode>
);

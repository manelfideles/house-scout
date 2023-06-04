import { MapBox } from './components/MapBox';
import { Legend } from './components/Legend';
import { Sidebar } from './components/Sidebar';
import { UserPrefs } from './components/UserPrefs';

import './styles/global.scss';


export default function App() {
  return (
    <div style={{ position: 'relative' }}>
      <MapBox />
      <Sidebar />
      <Legend />
      <UserPrefs />
    </div>
  );
}

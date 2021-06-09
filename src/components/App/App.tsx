import { menus } from '../../data.json';

import { Menus } from '../Menus/Menus';

export const App = () => (
  <header>
    <h1>Coding Test</h1>
    <Menus menus={menus} />
  </header>
);

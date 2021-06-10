import { Global, css } from '@emotion/react/macro';
import { menus } from '../../data.json';

import { StyledApp } from './AppStyles';
import { Menus } from '../Menus/Menus';

export const App = () => (
  <>
    <Global
      styles={css`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
      `}
    />
    <StyledApp>
      <header>
        <h1>Coding Test</h1>
        <Menus menus={menus} />
      </header>
    </StyledApp>
  </>
);

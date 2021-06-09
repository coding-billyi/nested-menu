import * as React from 'react';

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum MenusActionTypes {
  Click = 'CLICK',
  Cancel = 'CANCEL',
}

type State = {
  activePath: string[];
};

type Payload = {
  [MenusActionTypes.Click]: {
    level: number;
    id: string;
  };
  [MenusActionTypes.Cancel]: {};
};

type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];

const initialState = {
  activePath: [],
};

const MenusContext = React.createContext<
  [State, React.Dispatch<Actions>] | undefined
>(undefined);
MenusContext.displayName = 'MenusContext';

const MenusReducer = (state: State, action: Actions) => {
  switch (action.type) {
    case MenusActionTypes.Click: {
      const { activePath } = state;

      const { level, id } = action.payload;

      let newActivePath = [...activePath];

      newActivePath[level] = id;

      if (activePath.length - 1 > level) {
        newActivePath = newActivePath.slice(0, level + 1);
      }

      return {
        activePath: newActivePath,
      };
    }

    case MenusActionTypes.Cancel: {
      const { activePath } = state;

      const newActivePath = [...activePath];
      newActivePath.pop();

      return {
        activePath: newActivePath,
      };
    }

    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};

export const MenusProvider: React.FC<{}> = ({ children }) => {
  const [state, dispatch] = React.useReducer(MenusReducer, initialState);

  return (
    <MenusContext.Provider value={[state, dispatch]}>
      {children}
    </MenusContext.Provider>
  );
};

export const useMenus = () => {
  const context = React.useContext(MenusContext);

  if (context === undefined) {
    throw new Error('useMenus must be used within a MenusProvider');
  }

  return context;
};

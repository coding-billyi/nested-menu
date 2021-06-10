import * as React from 'react';
import { Dialog } from '@reach/dialog';

type ModalContextValue = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalContext = React.createContext<ModalContextValue>({
  isOpen: false,
  setIsOpen: () => null,
});

export const Modal: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const ModalDismissButton: React.FC = ({ children: child }) => {
  const { setIsOpen } = React.useContext(ModalContext);

  if (!React.isValidElement(child)) {
    return null;
  } else {
    return React.cloneElement(child, {
      onClick: () => {
        setIsOpen(false);
        child.props.onClick();
      },
    });
  }
};

export const ModalOpenButton: React.FC = ({ children: child }) => {
  const { setIsOpen } = React.useContext(ModalContext);

  if (!React.isValidElement(child)) {
    return null;
  } else {
    return React.cloneElement(child, {
      onClick: () => {
        setIsOpen(true);
        child.props.onClick();
      },
    });
  }
};

export const ModalContent: React.FC = (props) => {
  const { isOpen, setIsOpen } = React.useContext(ModalContext);
  return (
    <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props} />
  );
};

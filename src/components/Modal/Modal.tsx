import * as React from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import { GrFormClose } from 'react-icons/gr';
import { Dialog, Close, CloseButton, Title } from './ModalStyles';
import { MenusActionTypes, useMenus } from '../../providers/MenusProvider';

const callAll =
  (...fns: Function[]) =>
  (...args: unknown[]) =>
    fns.forEach((fn) => fn && fn(...args));

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
      onClick: callAll(() => setIsOpen(false), child.props.onClick),
    });
  }
};

export const ModalOpenButton: React.FC = ({ children: child }) => {
  const { setIsOpen } = React.useContext(ModalContext);

  if (!React.isValidElement(child)) {
    return null;
  } else {
    return React.cloneElement(child, {
      onClick: callAll(() => setIsOpen(true), child.props.onClick),
    });
  }
};

export const ModalContentBase: React.FC = (props) => {
  const { isOpen, setIsOpen } = React.useContext(ModalContext);
  const [, dispatch] = useMenus();
  const handleDismiss = () => {
    setIsOpen(false);
    dispatch({ type: MenusActionTypes.Cancel });
  };
  return <Dialog isOpen={isOpen} onDismiss={handleDismiss} {...props} />;
};

export const ModalContent: React.FC<ModalContentProps> = ({
  title,
  children,
  ...props
}) => {
  const [, dispatch] = useMenus();
  const handleClick = () => {
    dispatch({ type: MenusActionTypes.Cancel });
  };
  return (
    <ModalContentBase {...props}>
      <Close>
        <ModalDismissButton>
          <CloseButton onClick={handleClick}>
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden>
              <GrFormClose />
            </span>
          </CloseButton>
        </ModalDismissButton>
      </Close>
      <Title>{title}</Title>
      {children}
    </ModalContentBase>
  );
};

type ModalContextValue = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type ModalContentProps = {
  title: string;
};

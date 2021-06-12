import * as React from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import { GrFormClose } from 'react-icons/gr';
import { Dialog, Close, CloseButton, Title } from './ModalStyles';

const callAll =
  (...fns: (Function | undefined)[]) =>
  (...args: unknown[]) =>
    fns.forEach((fn) => fn && fn(...args));

const ModalContext = React.createContext({} as ModalContextValue);

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

  /* istanbul ignore next */
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
  /* istanbul ignore next */
  if (!React.isValidElement(child)) {
    return null;
  } else {
    return React.cloneElement(child, {
      onClick: callAll(() => setIsOpen(true), child.props.onClick),
    });
  }
};

export const ModalContentBase: React.FC<IModalContentBaseProps> = ({
  onClose,
  ...props
}) => {
  const { isOpen, setIsOpen } = React.useContext(ModalContext);
  return (
    <Dialog
      isOpen={isOpen}
      onDismiss={callAll(() => setIsOpen(false), onClose)}
      {...props}
    />
  );
};

export const ModalContent: React.FC<IModalContentProps> = ({
  title,
  children,
  onClose,
  ...props
}) => {
  return (
    <ModalContentBase onClose={onClose} {...props}>
      <Close>
        <ModalDismissButton>
          <CloseButton onClick={onClose}>
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

interface IModalContentBaseProps {
  onClose?: () => void;
}

interface IModalContentProps extends IModalContentBaseProps {
  title: string;
}

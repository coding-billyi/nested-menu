import styled from '@emotion/styled/macro';
import { keyframes } from '@emotion/react/macro';
import { FaSpinner } from 'react-icons/fa';

export const Label = styled.label`
  margin-bottom: 0.5rem;
  display: block;
  &:last-of-type {
    margin-bottom: 1rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.25rem 0.5rem;
`;

export const Buttons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 1rem;
`;

export const Message = styled.span<MessageProps>`
  display: block;
  margin-top: 1rem;
  color: ${({ error }) => (error ? 'red' : 'black')};
`;

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const Spinner = styled(FaSpinner)({
  animation: `${spin} 1s linear infinite`,
});
Spinner.defaultProps = {
  'aria-label': 'loading',
};

type MessageProps = {
  error?: boolean;
};

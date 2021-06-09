import styled from '@emotion/styled/macro';

export const Label = styled.label`
  margin-bottom: 0.5rem;
  display: block;
  &:last-of-type {
    margin-bottom: 1rem;
  }
`;

export const Input = styled.input`
  display: block;
`;

export const Button = styled.button`
  margin-right: 1rem;
  &::last-of-type {
    margin-right: 0;
  }
`;

export const Message = styled.span<MessageProps>`
  display: block;
  margin-top: 1rem;
  color: ${({ error }) => (error ? 'red' : 'black')};
`;

type MessageProps = {
  error: boolean;
};

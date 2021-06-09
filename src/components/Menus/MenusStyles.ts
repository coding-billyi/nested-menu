import styled from '@emotion/styled/macro';

export const Button = styled.button<ButtonProps>`
  margin-bottom: 1rem;
  color: ${({ isActive }) => (isActive ? 'red' : 'black')};
`;

type ButtonProps = {
  isActive: boolean;
};

import styled from '@emotion/styled/macro';
import { Button as GlobalButton } from '../Global/Button';

export const Button = styled(GlobalButton)<ButtonProps>`
  margin-bottom: 1rem;
  color: ${({ isActive }) => (isActive ? 'red' : 'black')};
`;

export const SubMenuUl = styled.ul`
  margin-left: 2rem;
`;

type ButtonProps = {
  isActive: boolean;
};

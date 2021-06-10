import styled from '@emotion/styled/macro';
import { Button as GlobalButton } from '../Global/Button';

export const Button = styled(GlobalButton)<ButtonProps>`
  margin-bottom: 1rem;
  color: ${({ isActive }) => (isActive ? 'red' : 'black')};
`;

export const SubMenuUl = styled.ul<SubMenuUlProps>`
  margin-left: ${({ level }) => (level > -1 ? '2rem' : 0)};
`;

type ButtonProps = {
  isActive: boolean;
};

type SubMenuUlProps = {
  level: number;
};

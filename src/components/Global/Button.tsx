import styled from '@emotion/styled/macro';
import * as colors from '../../styles/colors';

const buttonVariants: ButtonVariant = {
  primary: {
    background: colors.grey,
  },
  secondary: {
    background: colors.red,
    color: colors.white,
  },
};

export const Button = styled.button<ButtonProps>(
  {
    padding: '0.5rem 1rem',
    border: '0',
    borderRadius: '3px',
    color: colors.black,
  },
  ({ variant = 'primary' }) => buttonVariants[variant],
);

type ButtonVariant = {
  [variant: string]: {};
};

type ButtonProps = {
  variant?: keyof ButtonVariant;
};

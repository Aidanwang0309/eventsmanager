import React, { memo, ReactElement } from 'react';
import styles from './Button.module.css';
import classNames from 'classnames';

export const VARIANTS = {
  DEFAULT: 'default',
  OUTLINED: 'outlined'
};

type ButtonProps = {
  variant: string;
  children: string | ReactElement;
  type?: 'button' | 'submit' | 'reset';
  style?: object;
  onClick?: (e: any) => void;
};

const Button = (props: ButtonProps) => {
  const className = classNames(styles[props.variant]);

  return <button className={className} {...props} />;
};

Button.defaultProps = {
  variant: VARIANTS.DEFAULT,
  type: 'button'
};

const buttonPropsAreEqual = (prev: ButtonProps, next: ButtonProps) => {
  return prev.variant === next.variant;
};

export default memo(Button, buttonPropsAreEqual);

import * as React from 'react';

interface SharedProps {
  className?: string;
  children?: React.ReactNode;
}

const Root: React.FC<SharedProps> = ({ className, children }) => (
  <div className={className}>{children}</div>
);

const Header: React.FC<SharedProps> = ({ className, children }) => (
  <div className={`card_header ${className}`}>{children}</div>
);

const Content: React.FC<SharedProps> = ({ className, children }) => (
  <div className={`card_content ${className}`}>{children}</div>
);

interface TextProps extends SharedProps {
  color: 'dark' | 'light';
}

const Text: React.FC<TextProps> = ({ className, children, color = 'dark' }) => (
  <span className={`card__text card__text--${color} ${className}`}>
    {children}
  </span>
);

interface HighlightProps extends SharedProps {
  secondary?: boolean;
}

const Highlight: React.FC<HighlightProps> = ({
  className,
  children,
  secondary,
}) => (
  <span className={`card__highlight ${className}`}>
    {children}
  </span>
);





export const Card = {
  Root,
  Highlight,
  Text,
  Content,
  Header,
};

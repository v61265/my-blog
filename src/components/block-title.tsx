import * as React from 'react';
import styled from 'styled-components';
import { useThemeUI, ThemeUIContextValue } from 'theme-ui';

// Explicitly define the theme type for better type checking
interface StyledComponentProps {
  theme: ThemeUIContextValue['theme'];
}

const StyledTitle = styled.h2<StyledComponentProps>`
  position: relative;
  width: fit-content;
  text-align: center;
  color: ${({ theme }) => theme.colors?.heading};
  margin: 0 auto;
  z-index: 2;
  font-size: 300%;
  margin-top: 40px;
  // &::before {
  //   content: '';
  //   display: block;
  //   position: absolute;
  //   width: 100%;
  //   height: 30%;
  //   bottom: 8%;
  //   left: 5%;
  //   background: ${({ theme }) => theme.colors?.primary};
  //   opacity: 50%;
  //   z-index: -1;
  // }
`;

const StyledDescription = styled.p`
  margin-bottom: 40px;
`;

interface BlockTitleProps {
  title: string;
  description: string;
}

export default function BlockTitle({ title, description }: BlockTitleProps) {
  const { theme } = useThemeUI();
  return (
    <>
      <StyledTitle theme={theme}>{title}</StyledTitle>
      <StyledDescription>{description}</StyledDescription>
    </>
  );
}

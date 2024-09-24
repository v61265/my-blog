import * as React from 'react';
import styled from 'styled-components';
import { useThemeUI, useColorMode } from 'theme-ui';
import WebIcon from './web-icon';
import GithubIcon from './github-icon';

const ImageWrapperDiv = styled.div<{ colormode: string; islogo: string }>`
  display: block;
  width: 100%;
  height: 0;
  padding-top: 56%;
  overflow: hidden;
  position: relative;
  margin-top: 20px;
  img {
    position: absolute;
    top: 0;
    left: 50%;
    height: 100%;
    object-fit: contain;
    filter: grayscale(100%);
    transform: translate(-50%, 0);
    max-width: 100%;
    max-height: 100%;
  }
  .logo {
    width: 50%;
  }
  @media (min-width: 768px) {
    min-width: 256px;
    width: 256px;
    margin-top: 0;
    height: auto;
    margin-top: 20px;
    padding-top: 0;
    border-radius: 4px;
    background: ${({ colormode, islogo }) => {
      if (islogo == 'true')
        return colormode === 'dark'
          ? 'var(--theme-ui-colors-gray-8)'
          : 'var(--theme-ui-colors-gray-1)';
    }};
  }
`;

const ImageWrapper = styled.a<{ colormode: string; islogo: string }>`
  display: block;
  width: 100%;
  height: 0;
  padding-top: 56%;
  overflow: hidden;
  position: relative;
  margin-top: 20px;
  img {
    position: absolute;
    top: 0;
    left: 50%;
    height: 100%;
    object-fit: contain;
    filter: grayscale(100%);
    transform: translate(-50%, 0);
    max-width: 100%;
    max-height: 100%;
  }
  .logo {
    width: 50%;
  }
  @media (min-width: 768px) {
    min-width: 256px;
    width: 256px;
    margin-top: 0;
    height: auto;
    margin-top: 20px;
    padding-top: 0;
    background: ${({ colormode, islogo }) => {
      if (islogo == 'true')
        return colormode === 'dark'
          ? 'var(--theme-ui-colors-gray-8)'
          : 'var(--theme-ui-colors-gray-1)';
    }};
    border-radius: 4px;
  }
`;

interface ProjectCardProps {
  banner: string | null;
  logo: string | null;
  demoLink: string | null;
  title: string;
}

export default function CardImage({
  demoLink,
  logo,
  banner,
  title,
}: ProjectCardProps) {
  const [colorMode, _] = useColorMode();
  const projectBanner = banner ?? '/default-project.webp';
  React.useEffect(() => {
    console.log('colorMode has changed:', colorMode + 5);
  }, [colorMode]);
  return (
    <>
      {demoLink ? (
        <ImageWrapper
          colormode={colorMode}
          islogo={logo ? 'true' : 'false'}
          href={demoLink}
          target='_blank'
        >
          {logo ? (
            <img src={logo} alt={title} className='logo' />
          ) : (
            <img src={projectBanner} alt={title} className='banner' />
          )}
        </ImageWrapper>
      ) : (
        <ImageWrapperDiv colormode={colorMode} islogo={logo ? 'true' : 'false'}>
          {logo ? (
            <img src={logo} alt={title} className='logo' />
          ) : (
            <img src={projectBanner} alt={title} className='banner' />
          )}
        </ImageWrapperDiv>
      )}
    </>
  );
}

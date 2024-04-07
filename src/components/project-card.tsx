import { log } from 'console';
import * as React from 'react';
import styled from 'styled-components';
import { useThemeUI, useColorMode } from 'theme-ui';

const CardWrapper = styled.div`
  position: relative;

  padding: 20px 10px;
  // border-radius: 10px;

  & + & {
    margin-top: 20px;
  }
  &:hover {
    img {
      filter: grayscale(0%);
    }
    .logo {
      animation: shake 0.5s;
    }
  }

  @media (min-width: 768px) {
    display: flex;
    flex-direction: row-reverse;
    padding: 40px 0;
  }

  @keyframes shake {
    0% {
      transform: translate(calc(-50% + 1px), 1px) rotate(0deg);
    }
    10% {
      transform: translate(calc(-50% - 1px), -2px) rotate(-1deg);
    }
  }
`;

const ImageWrapper = styled.div<{ colormode: string; islogo: boolean }>`
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
      if (!islogo) return '';
      return colormode === 'dark'
        ? 'var(--theme-ui-colors-gray-8)'
        : 'var(--theme-ui-colors-gray-1)';
    }};
    border-radius: 4px;
  }
`;

const InfoWrapper = styled.div`
  @media (min-width: 768px) {
    margin-right: 20px;
    flex: 1;
  }
`;

const StyledTitle = styled.h3`
  font-size: 200%;
`;

const Desc = styled.li`
  display: block;
  padding-left: 20px;
  font-weight: 300;
  &:before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    background: var(--theme-ui-colors-text);
    border-radius: 50%;
    vertical-align: middle;
    margin-left: -6px;
    transform: translate(-8px, 0);
  }

  & + & {
    margin-top: 12px;
  }
`;

const SkillsWrapper = styled.ul`
  margin: 0;
  display: flex;
  padding: 0;
  margin-top: 24px;
  gap: 4px 12px;
  flex-wrap: wrap;
`;

const SkillItem = styled.li`
  display: block;
  padding: 6px;
  background: var(--theme-ui-colors-gray-6);
  border-radius: 4px;
  color: var(--theme-ui-colors-gray-1);
  font-size: 12px;
`;

interface ProjectCardProps {
  title: string;
  banner: string | null;
  logo: string | null;
  skills: string[] | null;
  description: string[] | null;
  codeLink: string | null;
  demoLink: string | null;
  isImageRight: boolean;
}

export default function ProjectCard({
  title,
  description,
  banner,
  skills,
  codeLink,
  isImageRight,
  logo,
}: ProjectCardProps) {
  const { theme } = useThemeUI();
  const [colorMode, _] = useColorMode();
  const projectBanner = banner ?? '/default-project.webp';
  return (
    <CardWrapper>
      <ImageWrapper colormode={colorMode} islogo={!!logo}>
        {logo ? (
          <img src={logo} alt={title} className='logo' />
        ) : (
          <img src={projectBanner} alt={title} className='banner' />
        )}
      </ImageWrapper>
      <InfoWrapper theme={theme}>
        <StyledTitle>{title}</StyledTitle>
        {description?.map((destItem) => (
          <Desc key={destItem}>{destItem}</Desc>
        ))}
        <SkillsWrapper>
          {skills?.map((skill) => (
            <SkillItem key={skill}>{skill}</SkillItem>
          ))}
        </SkillsWrapper>
      </InfoWrapper>
    </CardWrapper>
  );
}

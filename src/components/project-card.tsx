import * as React from 'react';
import styled from 'styled-components';
import { useThemeUI, useColorMode } from 'theme-ui';
import WebIcon from './web-icon';
import GithubIcon from './github-icon';
import dynamic from 'next/dynamic';
const CardImage = dynamic(() => import('./card-image'), {
  ssr: false,
});

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

const InfoWrapper = styled.div`
  @media (min-width: 768px) {
    margin-right: 20px;
    flex: 1;
  }
`;

const TitleAndIcons = styled.div`
  gap: 10px;
`;

const StyledTitle = styled.h3`
  font-size: 200%;
  margin-top: 16px;
`;

const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  gap: 10px;
  margin-bottom: 16px;

  a {
    height: 20px;
    :hover {
      cursor: pointer;
      path {
        fill: var(--theme-ui-colors-gray-6);
      }
    }
  }
  svg {
    width: 20px;
    height: 20px;

    }
  }

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
  demoLink,
  codeLink,
  logo,
}: ProjectCardProps) {
  const { theme } = useThemeUI();
  const [colorMode, _] = useColorMode();
  const projectBanner = banner ?? '/default-project.webp';
  return (
    <CardWrapper>
      {demoLink && (
        <CardImage
          demoLink={demoLink}
          logo={logo}
          title='title'
          banner={projectBanner}
        />
      )}

      <InfoWrapper theme={theme}>
        <TitleAndIcons>
          <IconsWrapper>
            {demoLink && (
              <a href={demoLink} target='_blank'>
                <WebIcon />
              </a>
            )}
            {codeLink && (
              <a href={codeLink} target='_blank'>
                <GithubIcon />
              </a>
            )}
          </IconsWrapper>
          <StyledTitle>{title}</StyledTitle>
        </TitleAndIcons>

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

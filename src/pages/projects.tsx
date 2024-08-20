import * as React from 'react';
import { graphql, type PageProps } from 'gatsby';
import Layout from '@lekoarts/gatsby-theme-minimal-blog/src/components/layout';
import BlockTitle from '../components/block-title';
import ProjectCard from '../components/project-card';
import { styled } from 'styled-components';
import Seo from '@lekoarts/gatsby-theme-minimal-blog/src/components/seo';

const ProjectsList = styled.ul`
  margin: 0 auto;
  padding: 0;
`;

interface ProjectQueryResult {
  allProject: {
    totalCount: number;
    nodes: Array<{
      title: string;
      banner: string | null;
      logo: string | null;
      skills: string[] | null;
      collaboration: boolean | null;
      type: string | null;
      description: string[] | null;
      codeLink: string | null;
      order: number | null;
      demoLink: string | null;
    }>;
  };
}

const Projects = ({ data }: PageProps<ProjectQueryResult>) => {
  const projectsData = data?.allProject?.nodes;
  console.log(data?.allProject?.nodes);

  const blocksInfo = [
    {
      type: 'site',
      title: '網站開發與維護',
      desc: '曾參與 4 個以上新聞媒體產業的網站開發、維護與搬遷，使用 Next.js / Nuxt.js 建立 SSR 網站，採用 RESTful API 與 GraphQL 串接資料，並處理第三方script載入、廣告系統、會員系統、頁面元件懶載入(lazy-loading）、串接金流、響應式設計等各式問題。',
    },
    {
      type: 'report',
      title: '互動式專題',
      desc: '與記者及設計師共同合作，推出具有互動性的專題報導，以更具互動性的方式呈現長篇、難以理解的議題或具時效性的資料給讀者。參與製作 4 篇的專題，在專題製作完畢後，也會紀錄心得及過程，並與團隊同仁分享開發與使用新技術的心得。',
    },
    {
      type: 'side-project',
      title: 'Side Project',
      desc: '在自學前端的過程中，我也與其他團隊的成員合作，共同製作 Side project，除了磨練技術以外，也希望專案可為對特定議題帶來影響力。',
    },
  ];

  return (
    <Layout>
      {blocksInfo.map((block) => {
        return (
          <section key={block.type}>
            <BlockTitle title={block.title} description={block.desc} />
            <ProjectsList>
              {projectsData
                ?.filter((project) => project.type === block.type)
                .sort((a, b) => (a.order ?? 10) - (b.order ?? 10))
                .map((project, index) => (
                  <ProjectCard
                    key={project.title}
                    title={project.title}
                    description={project.description}
                    skills={project.skills}
                    banner={project.banner}
                    logo={project.logo}
                    codeLink={project.codeLink}
                    isImageRight={index % 2 !== 0}
                    demoLink={project.demoLink}
                  />
                ))}
            </ProjectsList>
          </section>
        );
      })}
    </Layout>
  );
};

export const query = graphql`
  query allProjectQuery {
    allProject {
      nodes {
        title
        banner
        logo
        skills
        collaboration
        type
        description
        codeLink
        order
        demoLink
      }
    }
  }
`;

export const Head = () => (
  <Seo
    title='Projects | 坑坑洞洞'
    description='作品集'
    image='/default-project.webp'
    pathname='projects'
  />
);

export default Projects;

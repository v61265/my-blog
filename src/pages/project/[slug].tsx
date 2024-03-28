import * as React from 'react';
import type { PageProps } from 'gatsby';
import Post from '@lekoarts/gatsby-theme-minimal-blog/src/components/post';

const Projects = (_props: PageProps) => {
  const {
    params: { slug },
  } = _props;
  console.log(slug);
  return <div>project</div>;
};

export default Projects;

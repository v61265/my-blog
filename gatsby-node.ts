import {
  CreateNodeArgs,
  CreatePagesArgs,
  CreateSchemaCustomizationArgs,
  NodeInput,
} from 'gatsby';

interface ProjectFrontmatter {
  order?: number;
  title: string;
  banner?: string;
  logo?: string;
  skills?: string[];
  collaboration?: boolean;
  type?: string;
  description?: string[];
  codeLink?: string;
  demoLink?: string;
}

// 擴展 MdxNode 以包含 frontmatter 和 internal.type
interface MdxNode extends Node {
  frontmatter: ProjectFrontmatter;
}

export const createSchemaCustomization = ({
  actions,
}: CreateSchemaCustomizationArgs) => {
  const { createTypes } = actions;
  createTypes(`
    type Project implements Node @dontInfer {
      id: ID!
      order: Int
      title: String!
      banner: String
      logo: String
      skills: [String]
      collaboration: Boolean
      type: String
      description: [String]
      codeLink: String
      demoLink: String
    }
  `);
};

export const onCreateNode = ({
  node,
  actions,
  getNode,
  createNodeId,
  createContentDigest,
}: CreateNodeArgs) => {
  if (node.internal.type === 'Mdx') {
    const mdxNode = node as unknown as MdxNode;
    if (mdxNode.frontmatter.title) {
      const nodeId = createNodeId(`Project-${node.id}`);
      const projectNode: NodeInput = {
        ...mdxNode.frontmatter,
        id: nodeId,
        parent: node.id,
        children: [],
        internal: {
          type: 'Project',
          content: JSON.stringify(mdxNode.frontmatter),
          contentDigest: createContentDigest(mdxNode.frontmatter),
        },
      };
      actions.createNode(projectNode);
    }
  }
};

// export const createPages = async ({
//   graphql,
//   actions,
//   reporter,
// }: CreatePagesArgs) => {
//   const { createPage } = actions;
//   const result = await graphql<QueryResult>(`
//     query {
//       allProject {
//         nodes {
//           id
//           title
//         }
//       }
//     }
//   `);

//   if (result.errors || !result.data) {
//     reporter.panicOnBuild(
//       `Error while running GraphQL query for Projects.`,
//       result.errors
//     );
//     return;
//   }

//   const projectTemplate = require.resolve(`./src/templates/project.tsx`);

//   result.data.allProject.nodes.forEach((project) => {
//     createPage({
//       path: `/projects/${project.id}/`,
//       component: projectTemplate,
//       context: {
//         id: project.id,
//       },
//     });
//   });
// };

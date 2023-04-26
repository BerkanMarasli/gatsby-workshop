const path = require("path");

// @ts-expect-error
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const {
    data: {
      allProductsJson: { nodes: drinks },
    },
  } = await graphql(`
    {
      allProductsJson {
        nodes {
          __typename
          name
          slug
          description
        }
      }
      allSitePage {
        nodes {
          path
        }
      }
    }
  `);

  const productTemplate = path.resolve("./src/templates/drink.tsx");

  // @ts-expect-error
  drinks.forEach((drink) => {
    createPage({
      path: drink.slug,
      component: productTemplate,
    });
  });
};

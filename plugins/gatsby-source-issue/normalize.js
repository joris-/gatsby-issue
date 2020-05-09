const _ = require("lodash")

function createNodesFromEntities(
  entities,
  createNode,
  createContentDigest,
  createNodeId
) {
  for (const key in entities) {
    const entity = entities[key]

    entity.forEach(e => {
      const nodeContent = JSON.stringify(e)
      const contentDigest = createContentDigest(nodeContent)
      console.log(_.camelCase(key))
      const nodeMeta = {
        id: createNodeId(e.id),
        parent: null,
        children: [],
        internal: {
          type: _.camelCase(key),
          content: nodeContent,
          contentDigest,
        },
      }

      const node = Object.assign({}, e, nodeMeta)
      createNode(node)
    })
  }
}

exports.createNodesFromEntities = createNodesFromEntities

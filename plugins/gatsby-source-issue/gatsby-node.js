const normalize = require("./normalize")

const pokemon = require("./data/pokemon.json")
const pokemonForm = require("./data/pokemon-form.json")
const region = require("./data/region.json")
const versionGroup = require("./data/version-group.json")

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions

  const pokemonTypeDefs = [
    `type pokemon implements Node {
      forms: [pokemonForm] @link(from: "name" by: "name")
    }`,
  ]

  const regionTyepeDefs = [
    `type region implements Node {
      version_groups: [versionGroup] @link(from: "name" by: "name")
    }`,
  ]

  const typeDefs = [].concat(pokemonTypeDefs, regionTyepeDefs)

  createTypes(typeDefs)
}

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
  reporter,
}) => {
  const { createNode } = actions

  let entities = {
    pokemon,
    "pokemon-form": pokemonForm,
    region,
    "version-group": versionGroup,
  }

  reporter.info("Creating nodes from entities...")
  normalize.createNodesFromEntities(
    entities,
    createNode,
    createContentDigest,
    createNodeId
  )
  reporter.info("Nodes from entities created !")
}

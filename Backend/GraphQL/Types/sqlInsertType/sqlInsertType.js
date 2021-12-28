const { GraphQLObjectType, GraphQLInt, GraphQLNonNull } = require("graphql");

const sqlInsertType = new GraphQLObjectType({
  name: "SqlInsertResult",
  description: "This represents a result of an sql insert",
  fields: () => ({
    fieldCount: { type: GraphQLNonNull(GraphQLInt) },
    affectedRows: { type: GraphQLNonNull(GraphQLInt) },
    changedRows: { type: GraphQLNonNull(GraphQLInt) },
  }),
});

module.exports = sqlInsertType;

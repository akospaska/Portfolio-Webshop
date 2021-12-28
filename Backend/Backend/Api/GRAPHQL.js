const MyslqDatabaseConnection = require("../BackendConfig/MysqlDatabaseConfig");

const GraphQlConfig = async (query) => {
  var data = JSON.stringify({
    query: query,
    variables: {},
  });

  const [backendSecretKey] = await MyslqDatabaseConnection.awaitQuery("select * from backendSecretKey limit 1");

  var config = {
    method: "post",
    url: `http://localhost:3000/graphql`,
    headers: {
      "Content-Type": "application/json",
      Cookie: `backendSecretKey:${backendSecretKey.backendSecretKey}`,
    },
    data: data,
  };

  return config;
};

module.exports = GraphQlConfig;

headers: {
}

import apiEndpoint from "../../globalVariables/apiEndpint";

const GraphQlConfig = (query = `{productsByCategoryId(id:1){name,imgurl category{name}}}`) => {
  var data = JSON.stringify({
    query: query,
    variables: {},
  });

  var config = {
    method: "post",
    url: `${apiEndpoint}/graphql`,
    //url: "https://referenceprojects-abkno.run-eu-central1.goorm.io/graphql",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return config;
};

export default GraphQlConfig;

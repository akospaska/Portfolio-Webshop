import axios from "axios";
import apiEndpoint from "../../globalVariables/apiEndpint";

export default axios.create({
  baseURL: `${apiEndpoint}/api`,
});

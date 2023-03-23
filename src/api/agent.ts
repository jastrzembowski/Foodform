import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL =
  "https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/ ";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  post: (url: string, body: {}) =>
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(responseBody),
};

const agent = requests;

export default agent;

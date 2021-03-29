import axios from "axios";

export const fetchApi = (query) => {
    const queryUrl = 'https://svc.metrotransit.org/nextripv2/'+query;
    return axios
          .get(queryUrl)
          .then(response => response.data)
          .catch(error => {
                console.error(error);
                return error;
            })
}
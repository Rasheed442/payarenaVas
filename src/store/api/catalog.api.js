import { client } from "../axiosClient";

export const catalog = {
  /* CATALOG SERVICES */
  getCatalog: () => {
    return new Promise((resolve, reject) => {
      client
        .get(`/all`)
        .then((res) => {
          return resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  },
};

import { headers } from "@service/apiServices";
import axios from "axios";

const sendR2D2Api = (_req: any, res: any) => {
  const payload = _req.body;
  const url = `${process.env.HOST_URL}/api/r2d2/`;
  return new Promise((resolve, reject) => {
    axios
      .post(url, payload, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((response) => {
        res.end(JSON.stringify(response.data));
        resolve(response.data);
      })
      .catch((error) => {
        console.log({ error });
        res.end(JSON.stringify(error));
        reject(error);
      });
  });
};

export default sendR2D2Api;

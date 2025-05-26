// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  query?: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  // todo: since ts giving req error as unused import, thus logging to console :)
  const { query } = req;
  res.status(200).json({ name: "John Doe" , query});
}

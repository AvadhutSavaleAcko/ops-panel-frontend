// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  response?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // todo: since ts giving req error as unused import, thus logging to console :)
  const { query } = req;
  const response = await fetch(
    "https://auto-buy-sdui-service-uat.internal.ackodev.com/sdui/api/v1/mmv?vehicleType=car&journey=freshCar&mmvVersion=old",
  );
  const resp = await response.json();
  res.status(200).json({ response: resp });
}

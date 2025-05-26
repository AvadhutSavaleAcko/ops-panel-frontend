const handler = async (_req: any, res: any) => {
  console.log(_req.body);
  res.status(200).end();
};

export default handler;

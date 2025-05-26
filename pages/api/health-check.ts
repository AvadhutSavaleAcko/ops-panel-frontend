// dummy api route to chekc healt sucess :)
// not a serverless API :(
const handler = async (_req: any, res: any) => {
  res.status(200).end(JSON.stringify({ success: true }));
};

export default handler;

import { Response } from "express";

export default function handleError(res: Response, err: unknown) {
  res.status(500).json(err);

  // if (process.env.DEV == "true") {
  //   res.status(500).json(err);
  // } else {
  //   res.status(500).send("Something went wrong");
  // }
}

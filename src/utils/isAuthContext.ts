import { Request, Response } from "express";

interface authContext {
  req: Request;
  res: Response;
  payload?: { userId: string };
}

export { authContext };
import type { Request, Response, NextFunction } from "express";
import { NewPost } from "../../types";
export function getAuthor(
  req: Request<{}, {}, NewPost>,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;
  const author =
    authorization?.split(" ")[1] ?? (undefined as string | undefined);
  req.body.author = author ?? "un inconnu";
  next();
}

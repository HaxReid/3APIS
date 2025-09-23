import type { Request, Response, NextFunction } from "express";

export function controlValueNoNull(
  req: Request<{}, {}, { email?: string; pwd?: string }>,
  res: Response,
  next: NextFunction
) {
  const { email, pwd } = req.body;
  if (!email || !pwd) {
    return res
      .status(400)
      .json({ message: "Il manque le champ email ou mot de passe" });
  }
  next();
}

import type { Request, Response, NextFunction } from "express";
import { object, string } from "yup";

let loginSchema = object({
  email: string().email("L'adresse e-mail n'est pas valide"),
  pwd: string()
    .required()
    .min(4, "Le mot de passe doit faire plus de 4 caractères"),
});

export async function fieldsControl(
  req: Request<{}, {}, { email: string; pwd: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    await loginSchema.validate(req.body);
    next();
  } catch (error: any) {
    res.status(400).json({ message: error.errors[0] });
  }
}

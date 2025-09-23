import User from "../models/User";
import type { Request, Response } from "express";
import type { UserType } from "../models/User";
import bcrypt from "bcrypt";

export async function login(
  req: Request<{}, {}, { email: string; pwd: string }>,
  res: Response
) {
  try {
    
    const { email, pwd } = req.body;
    const user = (await User.findOne({ email })) as UserType | undefined;
    if (!user) {
      return res.status(401).json({ message: "Utilisateur inconnu" });
    }
    const isTheSame = await bcrypt.compare(pwd, user.hashPwd);
    console.log(email, user);
  
    if (!isTheSame) {
      return res.status(401).json({ message: "Mauvais mot de passe" });
    }
    res.status(200).json({ message: "Accès autorisé" });
  } catch (error) {
    res.sendStatus(500)
  }
}

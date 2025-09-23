import User from "../models/User";
import type { Request, Response } from "express";
import type { UserType } from "../models/User";
import bcrypt from "bcrypt";

export async function singin(
  req: Request<{}, {}, { email: string; pwd: string }>,
  res: Response
) {
  const { email, pwd } = req.body;
  const exist = await User.findOne({ email });
  if (exist) {
    return res.status(403).json({ message: "Cet utilisateur existe déjà" });
  }
  const hashPwd = await bcrypt.hash(pwd, 10);
  const newUser = new User({
    email, hashPwd
  })
  await newUser.save()
  res.sendStatus(201);
}

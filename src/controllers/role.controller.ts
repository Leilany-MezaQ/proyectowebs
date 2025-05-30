import { Request, Response } from "express";
import { Role } from "../models/Role";

export const createRole = async (req: Request, res: Response) => {
  try {
    const { type } = req.body;
    const role = new Role({ type });
    await role.save();
    res.json({ role });
  } catch (error) {
    res.status(500).json({ error });
  }
};

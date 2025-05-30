import { Request, Response } from "express";
import { Order } from "../models/Order";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { user, subtotal, total } = req.body;
    const order = new Order({ user, subtotal, total });
    await order.save();
    res.json({ order });
  } catch (error) {
    res.status(500).json({ error });
  }
};

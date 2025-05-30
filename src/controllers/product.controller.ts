import { Request, Response } from "express";
import { Product } from "../models/Product";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, quantity, price } = req.body;
    const product = new Product({ name, description, quantity, price });
    await product.save();
    res.json({ product });
  } catch (error) {
    res.status(500).json({ error });
  }
};

import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  quantity: number;
  price: number;
  createDate: Date;
  deleteDate?: Date;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  createDate: { type: Date, default: Date.now },
  deleteDate: { type: Date, default: null },
});

export const Product = model<IProduct>("Product", ProductSchema);

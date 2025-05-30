import { Schema, model, Document, Types } from "mongoose";

export interface IOrder extends Document {
  user: Types.ObjectId; // referencia al usuario que la creó
  subtotal: number;
  total: number;
  createDate: Date;
}

const OrderSchema = new Schema<IOrder>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  subtotal: { type: Number, required: true },
  total: { type: Number, required: true },
  createDate: { type: Date, default: Date.now }
});

export const Order = model<IOrder>("Order", OrderSchema);
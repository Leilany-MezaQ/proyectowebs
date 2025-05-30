import { Schema, model, Document } from "mongoose";

export interface IRole extends Document {
  type: string;
  createDate: Date;
}
//comentario
const RoleSchema = new Schema<IRole>({
  type: { type: String, required: true },
  createDate: { type: Date, default: Date.now },
});

export const Role = model<IRole>("Role", RoleSchema);

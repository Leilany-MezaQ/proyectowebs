import { Document, model, Schema, Types } from 'mongoose';

export interface Iuser extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    id: Types.ObjectId; 
    phone: string;
    createDate: Date;
    deleteDate: Date;
    status: boolean;
}

const userSchema = new Schema<Iuser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    phone: { type: String, required: false },
    createDate: { type: Date, default: Date.now },
    deleteDate: { type: Date, default: null },
    status: { type: Boolean, default: true }
});

export const User = model<Iuser>('User', userSchema, 'user1');

import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    role: {
        type: String,
        enum: ["admin", "user"],
    },

    isBlocked: { type: Boolean, default: false }
},
    {
        timestamps: true
    })



userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});

export const User = model<TUser>('User', userSchema)
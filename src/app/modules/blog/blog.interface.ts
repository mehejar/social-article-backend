import { Types } from "mongoose";

export type TBlog = {
    title: string;
    content: string;
    author: Types.ObjectId
}

export type TUpdateBlog = {
    title: string;
    content: string;
}
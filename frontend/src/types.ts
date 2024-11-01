import { ChangeEvent, MouseEventHandler } from "react";

export enum Type {
    SIGNUP,
    SIGNIN
};

export type InputType = {
    type: Type;
    placeholder: string;
    inputType: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type ButtonType = {
    type: Type,
    onClick: MouseEventHandler<HTMLButtonElement>;
};

export type BlogCardType = {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: number;
}

export type BlogsType = {
    content: string;
    title: string;
    id: number;
    author: {
        name: string
    }
}

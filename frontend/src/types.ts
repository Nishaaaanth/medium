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

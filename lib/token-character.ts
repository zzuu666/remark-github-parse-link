import decimal from "is-decimal";
import alphabetical from "is-alphabetical";

/** - */
const dash = 45;
/** . */
const dot = 46;
/** / */
const slash = 47;

export const usernameCharacter = (code: number) =>
    code === dash || decimal(code) || alphabetical(code);

export const projectCharacter = (code: number) =>
    code === dash || code === dot || decimal(code) || alphabetical(code);

import decimal from "is-decimal";
import hexadecimal from "is-hexadecimal";
import { usernameCharacter, projectCharacter } from "./token-character";

/** - */
const dash = 45;

export const usernameEnd = (value: string, fromIndex: number) => {
    let index = fromIndex;
    const length = value.length;
    const maxUserLength = 39;

    if (value.charCodeAt(index) === dash) return -1;

    while (index < length) {
        if (!usernameCharacter(value.charCodeAt(index))) {
            break;
        }

        index += 1;
    }

    const size = index - fromIndex;

    if (size === 0 || size > maxUserLength) {
        return -1;
    }

    return index;
};

export const projectEnd = (value: string, fromIndex: number) => {
    let index = fromIndex;
    const length = value.length;
    const maxProjectLength = 100;
    const gitSuffix = ".git";

    while (index < length) {
        if (!projectCharacter(value.charCodeAt(index))) {
            break;
        }

        index += 1;
    }

    const size = index - fromIndex;

    if (
        size === 0 ||
        size > maxProjectLength ||
        value.slice(index - gitSuffix.length, index) === gitSuffix
    ) {
        return -1;
    }

    return index;
};

export const shaEnd = (value: string, fromIndex: number) => {
    let index = fromIndex;
    const maxShaLength = 40;
    const minShaLength = 7;
    const length = Math.max(value.length, index + maxShaLength);

    while (index < length) {
        if (!hexadecimal(value.charCodeAt(index))) {
            break;
        }

        index += 1;
    }

    const size = index - fromIndex;
    if (
        size < minShaLength ||
        (size === maxShaLength && hexadecimal(value.charCodeAt(index)))
    ) {
        return -1;
    }

    return index;
};

export const issueEnd = (value: string, fromIndex: number) => {
    let index = fromIndex;
    const length = value.length

    while (index < length) {
        if (!decimal(value.charCodeAt(index))) {
            break;
        }

        index += 1
    }

    if (index - fromIndex === 0) {
        return -1
    }

    return index
}

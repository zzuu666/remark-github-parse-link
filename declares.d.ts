declare module "is-hexadecimal" {
    export default function ( char: number ) :boolean
}

declare module "is-decimal" {
    export default function ( char: number ) :boolean
}

declare module "is-alphabetical" {
    export default function ( char: number ) :boolean
}

declare module "mdast-util-to-string" {
    import { Link } from 'mdast';
    export default function (node: Link): string
}
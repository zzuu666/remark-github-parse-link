# remark-github-parse-link

Get information about github from link node in mdast after be parsed by remark-github.

## How to use?

npm:
```
npm install remake-github-parse-link --save
```

yarn:
```
yarn add remake-github-parse-link
```

## Usage
``` js
import unified from 'unified'
import markdown from 'remark-parse'
import github from 'remark-github'
import parse from 'remake-github-parse-link'
import visit from 'unist-util-visit'

const text = `this is an issue, cc @zzuu666`

const tree = unified().use(markdown).use(github)

visit(tree, 'link', (node) => {
    console.log(parse(node)) // { user: zzuu666 }
})
```

## Function Signature

``` ts
interface ParseResult {
    /** link: https://github.com/user */
    user?: string;
    /** link: https://github.com/namespace/project */
    namespace?: string;
    /** link: https://github.com/namespace/project */
    project?: string;
    /** link: https://github.com/namespace/project/page/reference#comment */
    page?: string;
    /** link: https://github.com/namespace/project/page/reference#comment */
    reference?: string;
    /** link: https://github.com/namespace/project/page/reference#comment */
    comment?: string;
}

type parseFn = (node: Link, repository?: string) => ParseResult;
```
import toString from "mdast-util-to-string";
import { Link } from "mdast";
import { usernameEnd, projectEnd, shaEnd, issueEnd } from "./token-end";

interface ParseResult {
    user?: string
    namespace?: string
    project?: string
    page?: string
    reference?: string
}

type parseFn = (node: Link, repository?: string) => ParseResult;

const numberSign = 35; //  '#'
const slash = 47; //  '/'



export const parse: parseFn = (node, repository = "https://github.com/") => {
    const result: ParseResult = {};
    const url = node.url || (node.href as string) || "";
    let start = -1;
    let end = -1;
    if (
        url.slice(0, repository.length) !== repository ||
        node.children.length !== 1 ||
        (node.children[0].type !== "text" &&
            node.children[0].type !== "strong") ||
        toString(node).slice(0, repository.length) !== repository
    ) {
        return result;
    }

    start = repository.length;
    end = usernameEnd(url, start);

    if (end === -1) {
        return result;
    }

    // https://github.com/zzuu666
    if (url.charCodeAt(end) !== slash) {
        result.user = url.slice(start, end)
        return result
    }

    // https://github.com/zzuu666/planet
    result.namespace === url.slice(start, end)

    start = end + 1
    end = projectEnd(url, start)

    if (end === -1) {
        return result
    }

    result.project === url.slice(start, end)
    if (url.charCodeAt(end) !== slash) {
        return result
    }
    // find page
    start = end + 1
    end = url.indexOf('/', start)
    const page = url.slice(start, end)

    if (page !== 'commit' && page !== 'issue' && page !== 'pull' && page !== 'merge_request') {
        return result
    }

    result.page = page

    start = end + 1
    if (page === 'commit') {
        end = shaEnd(url, start)
    }
    else {
        end = issueEnd(url, start)
    }

    const reference = url.slice(start, end)

    result.reference = reference

    return result
};

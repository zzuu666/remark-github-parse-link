const unified = require('unified')
const markdown = require('remark-parse')
const github = require('remark-github')
const visit = require('unist-util-visit')
const { parse } = require('../dist')

test('can get user', () => {
    const text = `this is an issue, cc @zzuu666`
    const parser = unified().use(markdown).use(github)
    const tree = parser.parse(text)
    const desired = {
        user: 'zzuu666'
    }
    visit(tree, 'link', (node) => {
        const result = parse(node)
        expect(result).toMatchObject(desired)
    })
})


test('can get issues', () => {
    const text = `reference #45`
    const parser = unified().use(markdown).use(github)
    const tree = parser.parse(text)
    const desired = {
        namespace: 'zzuu666',
        project: 'remark-github-parse-link',
        page: 'issues',
        reference: '45'
    }
    visit(tree, 'link', (node) => {
        const result = parse(node)
        expect(result).toMatchObject(desired)
    })
})

test('can get commits', () => {
    const text = `or look this commit 7a327b3`
    const parser = unified().use(markdown).use(github)
    const tree = parser.parse(text)
    const desired = {
        namespace: 'zzuu666',
        project: 'remark-github-parse-link',
        page: 'commit',
        reference: '7a327b3'
    }
    visit(tree, 'link', (node) => {
        const result = parse(node)
        expect(result).toMatchObject(desired)
    })
})

test('can get pulls', () => {
    const text = `or look this commit !705`
    const parser = unified().use(markdown).use(github)
    const tree = parser.parse(text)
    const desired = {
        namespace: 'zzuu666',
        project: 'remark-github-parse-link',
        page: 'pulls',
        reference: '705'
    }

    visit(tree, 'link', (node) => {
        const result = parse(node)
        expect(result).toMatchObject(desired)
    })
})


test('can get comment', () => {
    const text = `this is an comment https://github.com/facebook/react/issues/16604#issuecomment-528652891`
    const parser = unified().use(markdown).use(github)
    const tree = parser.parse(text)
    const desired = {
        namespace: 'facebook',
        project: 'react',
        page: 'issues',
        reference: '16604',
        comment: 'issuecomment-528652891'
    }

    visit(tree, 'link', (node) => {
        const result = parse(node)
        expect(result).toMatchObject(desired)
    })
})
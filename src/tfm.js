import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import { visit } from 'unist-util-visit'

/** @type {import('unified').Plugin<[], import('mdast').Root>} */
function escapeCharacters() {

    // See: https://core.telegram.org/bots/api#markdownv2-style

    return (tree) => {
        visit(tree, (node) => {
            if (node.type === "text") {
                node.value = node.value.replace(/(?=['_\[\]()~`>#+\-=|{}\.!'])/g, "\\")
            }
        })
    }
}

export async function tfmEscape(text) {

    const file = await unified()
        .use(remarkParse)
        .use(escapeCharacters)
        .use(remarkStringify, {
            fences: true,
            bullet: "-",
        })
        .process(text)

    text = String(file)
    text = text.replace(/\\\\/g, "\\")
    text = text.replace(/(\n\s*[0-9A-Za-z]+)\. /g, "$1\\. ")
    // text = text.replace(/(\n\s*)\* /g, "$1\\- ")

    return text

}

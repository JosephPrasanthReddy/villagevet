// Small, dependency-free Markdown renderer for VillageVet AI chat messages.
//
// Supports the subset of Markdown Gemini actually produces in this app:
// **bold**, *italic*/_italic_, `code`, [text](url) links, "- "/"* " bullet
// lists, "1. " numbered lists, "#"-"####" headings, and paragraphs.
//
// Deliberately builds real React elements instead of an HTML string, so
// nothing ever goes through dangerouslySetInnerHTML — nested formatting is
// just nested React nodes, and any literal text (including anything that
// looks like a tag) is rendered as text via React's normal escaping.

let keyCounter = 0
function nextKey() {
  keyCounter += 1
  return `md-${keyCounter}`
}

const SAFE_URL = /^(https?:\/\/|mailto:|tel:)/i

// Order matters: bold before italic so "**x**" isn't first read as "*" + "*x*" + "*".
const INLINE_PATTERN = /(\*\*[^*]+\*\*|__[^_]+__|`[^`]+`|\[[^\]]+\]\([^)]+\)|\*[^*]+\*|_[^_]+_)/g

function renderInline(text) {
  const parts = text.split(INLINE_PATTERN).filter((part) => part !== '')

  return parts.map((part) => {
    if (/^\*\*[^*]+\*\*$/.test(part) || /^__[^_]+__$/.test(part)) {
      return <strong key={nextKey()}>{part.slice(2, -2)}</strong>
    }
    if (/^`[^`]+`$/.test(part)) {
      return (
        <code key={nextKey()} className="rounded bg-ink/10 px-1 py-0.5 text-[0.85em]">
          {part.slice(1, -1)}
        </code>
      )
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) {
      const [, label, url] = link
      if (SAFE_URL.test(url.trim())) {
        return (
          <a
            key={nextKey()}
            href={url.trim()}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-brand/40 underline-offset-2 hover:text-brand-dark"
          >
            {label}
          </a>
        )
      }
      return label
    }
    if (/^\*[^*]+\*$/.test(part) || /^_[^_]+_$/.test(part)) {
      return <em key={nextKey()}>{part.slice(1, -1)}</em>
    }
    return part
  })
}

// Groups raw lines into blocks: heading, list (ordered/unordered), paragraph.
function groupBlocks(lines) {
  const blocks = []
  let paragraphBuffer = []
  let listBuffer = null // { ordered: bool, items: [] }

  const flushParagraph = () => {
    if (paragraphBuffer.length) {
      blocks.push({ type: 'paragraph', text: paragraphBuffer.join(' ') })
      paragraphBuffer = []
    }
  }
  const flushList = () => {
    if (listBuffer) {
      blocks.push(listBuffer)
      listBuffer = null
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()

    if (line === '') {
      flushParagraph()
      flushList()
      continue
    }

    const heading = line.match(/^(#{1,4})\s+(.*)$/)
    if (heading) {
      flushParagraph()
      flushList()
      blocks.push({ type: 'heading', level: heading[1].length, text: heading[2] })
      continue
    }

    // Gemini occasionally uses the Unicode bullet even when prompted to use
    // Markdown hyphens. Treat both forms as the same semantic list so users
    // never see a literal "• **label**" paragraph.
    const bullet = line.match(/^(?:[-*•])\s+(.*)$/)
    if (bullet) {
      flushParagraph()
      if (!listBuffer || listBuffer.ordered) {
        flushList()
        listBuffer = { type: 'list', ordered: false, items: [] }
      }
      listBuffer.items.push(bullet[1])
      continue
    }

    const numbered = line.match(/^\d+[.)]\s+(.*)$/)
    if (numbered) {
      flushParagraph()
      if (!listBuffer || !listBuffer.ordered) {
        flushList()
        listBuffer = { type: 'list', ordered: true, items: [] }
      }
      listBuffer.items.push(numbered[1])
      continue
    }

    flushList()
    paragraphBuffer.push(line)
  }

  flushParagraph()
  flushList()
  return blocks
}

const HEADING_CLASSES = {
  1: 'text-[1.05em] font-bold',
  2: 'text-[1.02em] font-bold',
  3: 'text-[1em] font-semibold',
  4: 'text-[1em] font-semibold',
}

/**
 * Render a Markdown string as an array of React nodes.
 * Safe by construction: only builds React elements, never raw HTML.
 */
export default function renderMarkdown(text) {
  if (!text) return null
  const blocks = groupBlocks(String(text).replace(/\r\n/g, '\n').split('\n'))

  return blocks.map((block) => {
    if (block.type === 'heading') {
      return (
        <p key={nextKey()} className={`mt-2 first:mt-0 ${HEADING_CLASSES[block.level] || HEADING_CLASSES[4]}`}>
          {renderInline(block.text)}
        </p>
      )
    }
    if (block.type === 'list') {
      const ListTag = block.ordered ? 'ol' : 'ul'
      return (
        <ListTag
          key={nextKey()}
          className={`mt-1.5 space-y-1 pl-5 first:mt-0 ${block.ordered ? 'list-decimal' : 'list-disc'}`}
        >
          {block.items.map((item) => (
            <li key={nextKey()}>{renderInline(item)}</li>
          ))}
        </ListTag>
      )
    }
    return (
      <p key={nextKey()} className="mt-2 first:mt-0">
        {renderInline(block.text)}
      </p>
    )
  })
}

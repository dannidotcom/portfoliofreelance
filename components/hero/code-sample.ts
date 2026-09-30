/** Generic FastAPI RAG endpoint shown in the hero. No client or product specifics. */
export const CODE_FILE = "app/api.py"

export const CODE_SAMPLE = `from typing import Annotated

from fastapi import Depends, FastAPI
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from app.auth import Tenant, current_tenant
from app.llm import stream_tokens
from app.retrieval import build_prompt, search

app = FastAPI(title="RAG API")
CurrentTenant = Annotated[Tenant, Depends(current_tenant)]


class Question(BaseModel):
    text: str


@app.post("/v1/ask")
async def ask(q: Question, tenant: CurrentTenant):
    hits = await search(q.text, tenant_id=tenant.id, k=5)
    prompt = build_prompt(q.text, hits)

    async def events():
        async for token in stream_tokens(prompt):
            yield f"data: {token}\\n\\n"

    return StreamingResponse(
        events(), media_type="text/event-stream"
    )`

export type TokenType = "keyword" | "string" | "comment" | "decorator" | "function" | "class" | "number" | "plain"

export type Token = { type: TokenType; text: string }

const KEYWORDS = new Set([
  "from", "import", "as", "async", "await", "def", "class", "return", "yield",
  "for", "in", "if", "else", "elif", "with", "try", "except", "raise", "None", "True", "False",
])

const TOKEN_RE =
  /(#.*$)|([rbf]{0,2}"(?:[^"\\]|\\.)*"|[rbf]{0,2}'(?:[^'\\]|\\.)*')|(@[\w.]+)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_]\w*)|(\s+|[^\w\s])/g

/** Minimal Python tokenizer: enough for a static, readable highlight. */
export function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = []
  let previousWord = ""
  for (const match of line.matchAll(TOKEN_RE)) {
    const [text, comment, string, decorator, number, word] = match
    let type: TokenType = "plain"
    if (comment) type = "comment"
    else if (string) type = "string"
    else if (decorator) type = "decorator"
    else if (number) type = "number"
    else if (word) {
      const next = line.slice((match.index ?? 0) + text.length).trimStart()
      if (KEYWORDS.has(word)) type = "keyword"
      else if (previousWord === "def") type = "function"
      else if (previousWord === "class" || /^[A-Z]/.test(word)) type = "class"
      else if (next.startsWith("(")) type = "function"
      previousWord = word
    }
    const last = tokens[tokens.length - 1]
    if (last && last.type === type && type === "plain") last.text += text
    else tokens.push({ type, text })
  }
  return tokens
}

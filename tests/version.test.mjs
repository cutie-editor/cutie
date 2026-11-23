// La versión del plugin y la que viaja en la cabecera X-Cutie-Plugin tienen que ser la misma (se cambian a mano en dos sitios).
// Uso: node --test tests/version.test.mjs
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { test } from "node:test"
import { fileURLToPath } from "node:url"

const plugin = join(dirname(fileURLToPath(import.meta.url)), "..", "plugins", "cutie")
const json = (ruta) => JSON.parse(readFileSync(join(plugin, ruta), "utf8"))

test("la versión de plugin.json es la de la cabecera X-Cutie-Plugin de .mcp.json", () => {
  const version = json(".claude-plugin/plugin.json").version
  assert.match(version, /^\d+\.\d+\.\d+$/)
  assert.equal(json(".mcp.json").mcpServers.cutie.headers["X-Cutie-Plugin"], version)
})

test("la versión es la 0.6.0 o posterior (los agentes del modo cliente)", () => {
  const [a, b] = json(".claude-plugin/plugin.json").version.split(".").map(Number)
  assert.ok(a > 0 || b >= 6)
})

import fs from "fs";
import path from "path";

let res = "export const contracts = {";

// TODO: investigate direct conversions of contract ABI to typescript

let dirEntries: fs.Dirent[] = [];

try {
  dirEntries = fs.readdirSync(
    path.join(".deploys", "pinned-contracts"),
    { recursive: true, withFileTypes: true }
  );
} catch (e: unknown) {
  if (e instanceof Error && "code" in e && e.code === "ENOENT") {
    console.warn("No pinned contracts found; remember to pin deployed contracts in order to use them from frontend");
    process.exit();
  }
}

for (const entry of dirEntries) {
  if (entry.isFile() && entry.name.startsWith("0x") && entry.name.endsWith(".json")) {
    const strippedAddress = entry.name.slice(2, entry.name.length - 5);

    console.log(`Processing pinned contract ${strippedAddress}`);

    const value = fs.readFileSync(path.join(entry.parentPath, entry.name), "utf-8");
    res += `\n  "${strippedAddress}": ${value},\n`;
  }
}

res += "};";
const outPath = path.join("dist", "contracts.js");
fs.writeFileSync(outPath, res);

console.log(`Exported pinned contracts to ${outPath}`);

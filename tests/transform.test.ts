import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectRoot = `${__dirname}/..`;
const program = `${projectRoot}/node_modules/assemblyscript/bin/asc.js`;
const transformPath = `${projectRoot}/dist/transformBuildUtf8ConstStr.mjs`;
test("transform convert utf8 success", () => {
  const outputWat = `${projectRoot}/build/test.wat`;

  const args = [
    "-o",
    "build/test.wasm",
    "-t",
    outputWat,
    "--transform",
    transformPath,
    "as/testcase/useUtf8Transform.ts",
  ];

  const result = spawnSync(program, args, {
    cwd: projectRoot,
    encoding: "utf8",
    env: process.env,
  });

  console.log(result.stdout);
  expect(result.status).toBe(0);

  const watContent = readFileSync(outputWat, "utf8");
  expect(watContent).toContain("test0");
  expect(watContent).toContain("test1");
  expect(watContent).toContain("test2");
  expect(watContent).toContain("test3");
});

test("transform not string literal", () => {
  const outputWat = `${projectRoot}/build/test.wat`;

  const args = ["-o", "build/test.wasm", "-t", outputWat, "--transform", transformPath, "as/testcase/notStrLiteral.ts"];

  const result = spawnSync(program, args, {
    cwd: projectRoot,
    encoding: "utf8",
    env: process.env,
  });

  console.log(result.stdout);
  expect(result.status).not.toBe(0);
  expect(result.stderr).toContain("utf8.build only accept string literal");
});

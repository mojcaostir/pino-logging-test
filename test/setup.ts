import { spawn } from "child_process";
import path from "path";
import rimraf from "rimraf";

export default async function compileTestExample() {
  const targetDir = path.join(__dirname, "example");

  await new Promise<void>((resolve, reject) => {
    rimraf(targetDir, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

  const compileExample = spawn(
    "npx",
    ["tsc", "-p", path.join(__dirname, "..", "tsconfig.example.json")],
  );

  compileExample.stdout.on("data", (chunk: Buffer) =>
    console.error(chunk.toString())
  );

  await new Promise<void>((resolve, reject) =>
    compileExample.once("exit", (code) => {
      if (code !== 0) {
        reject();
      } else {
        resolve();
      }
    })
  );
}

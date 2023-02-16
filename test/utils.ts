import {ChildProcessWithoutNullStreams, spawn} from "child_process";
import path from "path";

export function spawnTestExampleProcess(): ChildProcessWithoutNullStreams {
  return spawn("node", [path.join(__dirname, "example", "test",`exampleApp.js`)]);
}

export async function gatherAllLogLines(
  childProcess: ChildProcessWithoutNullStreams
): Promise<ExpectedOutput[]> {
  const unparsedLogLines = await new Promise<string>((resolve) => {
    let unparsedLogChunk = "";
    childProcess?.stdout.on("data", (data) => {
      unparsedLogChunk += (data as Buffer).toString();
    });
    childProcess?.on("exit", () => resolve(unparsedLogChunk));
  });

  return unparsedLogLines
    .trim()
    .split(`\n`)
    .map((line) => JSON.parse(line) as ExpectedOutput);
}

export interface ExpectedOutput {
  level: number;
  time: number;
  pid: number;
  hostname: string;
  name: string;
  msg: string;
}

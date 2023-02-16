import {ExpectedOutput, gatherAllLogLines, spawnTestExampleProcess} from "./utils";

describe("node logger", () => {
  it("logs info level", async () => {
    const testApp = spawnTestExampleProcess();
    const parsedLines = await gatherAllLogLines(testApp);

    expect(parsedLines).toContainEqual(
      expect.objectContaining<ExpectedOutput>({
        level: 30,
        time: expect.any(Number) as number,
        pid: expect.any(Number) as number,
        hostname: expect.any(String) as string,
        name: "Testing the logger",
        msg: "this is my log",
      })
    );
  });
});

import fs from "fs";
import { execSync } from "child_process";

const commits = [];
const lines = fs.readFileSync("./log.txt", "utf-8");

lines.forEach((line, index) => {
  const myCommit = line.includes("mohammad.z");

  if (myCommit) {
    const result = lines[index - 1].match("From (.+?) ");

    if (result) {
      commits.push(result[1]);
    }
  }
});

commits.forEach((commit) => {
  let commits = [];

  if (fs.existsSync("./commit.txt")) {
    commits = fs.readFileSync("./commit.txt", "utf-8").split("\n");
  }

  // read until reach to unprocessed commit
  if (!commits.includes(commit)) {
    fs.appendFileSync("./commit.txt", commit + "\n");
    execSync("git cherry-pick " + commit);
    return;
  }
});

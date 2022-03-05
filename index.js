#!/usr/bin/env node
import chalk from "chalk";
import fs from "fs";
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import boxen from "boxen";
import prompts from "prompts";
import commander from "commander";
import {
  checkNodeVersion,
  checkProjectName,
  renderTemplate,
  checkLatest,
} from "./util/index.js";

const targetType = ["react", "vue"];
const templatesName = {
  react: "umi-react-template",
  vue: "vue3-template",
};
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "package.json"), "utf8")
);

let projectName = process.argv
  .slice(1)
  .filter((item) => !item.includes("create-admin-ui"));

// 入口函数
const init = async () => {
  const program = new commander.Command(packageJson.name);
  const targetDir = process.cwd();

  await checkLatest({
    pkgName: packageJson.name,
    version: packageJson.version,
  });

  // 没有设置文件名称
  if (!projectName?.length || projectName?.length > 1) {
    console.error("Please specify the project directory:");
    console.log(` ${packageJson.name} ${chalk.green("<project-directory>")}`);
    console.log();
    console.log(
      `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`
    );
    process.exit(1);
  }
  projectName = projectName[0];

  // 命令行设置
  program
    .version(packageJson.version, "-v, --version")
    .usage(`${chalk.green("<project-directory>")} [options]`)
    .allowUnknownOption()
    .on("--help", () => {
      console.log(
        `    Only ${chalk.green("<project-directory>")} is required.`
      );
      console.log();
    })
    .parse(process.argv);

  checkNodeVersion(packageJson.engines.node);

  // 记录用户选项
  let result = {};
  let defaultProjectName = "react";

  try {
    result = await prompts(
      [
        {
          name: "projectType",
          type: "text",
          message: "Choose vue or react:",
          initial: defaultProjectName,
          validate: (value) =>
            !targetType.includes(value) ? `only enter vue or react` : true,
        },
        {
          name: "needsDownload",
          type: "toggle",
          message: "Do you need help downloading?",
          initial: false,
          active: "Yes",
          inactive: "No",
        },
      ],
      {
        onCancel: () => {
          throw new Error(chalk.red("✖") + " Operation cancelled");
        },
      }
    );
  } catch (cancelled) {
    console.log(cancelled.message);
    process.exit(1);
  }

  const { projectType, needsDownload } = result;
  const root = path.resolve(targetDir, projectName);

  checkProjectName(projectName);

  if (fs.existsSync(root)) {
    console.log();
    console.error(
      ` ${chalk.red(
        `${projectName}`
      )} already exists! Please change directory name and try again! `
    );
    console.log();
    process.exit(1);
  }

  console.log();

  console.log(`Creating a new admin-ui in ${chalk.green(root)}.`);
  console.log();

  const templateDir = path.resolve(
    __dirname,
    `template/${templatesName[projectType]}`
  );

  await renderTemplate(templateDir, root);
  const pkgPath = `${root}/package.json`;
  const newPkgJson = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  newPkgJson.name = projectName;
  newPkgJson.version = "0.0.1";
  newPkgJson.description = `${projectName} project`;

  fs.writeFileSync(pkgPath, JSON.stringify(newPkgJson, null, 2));

  if (needsDownload) {
    // const packageManager = /yarn/.test(process.env.npm_execpath)
    //   ? "yarn"
    //   : "npm";
    const packageManager = "yarn";
    console.log();
    console.log(
      "Installing template packages.This might take a couple of minutes..."
    );
    console.log();
    const message =
      "We suggest that you begin by typing:" +
      chalk.cyan(`\n cd ${projectName}`) +
      chalk.cyan(`\n ${packageManager} dev`);
    await spawn(packageManager, ["install"], {
      cwd: root,
      stdio: "inherit",
    }).on("close", (code) => {
      console.log(
        boxen(message, {
          padding: 1,
          margin: 1,
          align: "center",
          borderColor: "yellow",
          borderStyle: "round",
        })
      );
    });
  }

  spawn("git", ["init"], { cwd: root, stdio: "inherit" }).on(
    "close",
    (code) => {
      if (!needsDownload) {
        const message =
          "We suggest that you begin by typing:" +
          "\n" +
          chalk.cyan(`cd ${projectName}`) +
          "\nInside that directory, run:" +
          "\n" +
          chalk.cyan("npm install && npm run dev") +
          " Or " +
          chalk.cyan("yarn install && yarn dev");
        console.log(
          boxen(message, {
            padding: 1,
            margin: 1,
            align: "center",
            borderColor: "yellow",
            borderStyle: "round",
          })
        );
      }
    }
  );
};
init();

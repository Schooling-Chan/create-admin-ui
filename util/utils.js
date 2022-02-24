import semver from "semver";
import chalk from "chalk";
import validateProjectName from "validate-npm-package-name";
import updateNotifier from "update-notifier";

// 检测版本号
export const checkLatest = ({ pkgName, version }) => {
  const notifier = updateNotifier({
    pkg: {
      name: pkgName,
      version,
    },
  });

  if (notifier.update) {
    // notify通知
    notifier.notify();
    process.exit(1);
  }

  return notifier;
};

// 检测node版本号
export const checkNodeVersion = (version) => {
  const supportedNodeVersion = !semver.satisfies(
    // 转换长的版本号42.6.7.9.3-alpha -> 42.6.7
    semver.coerce(process.version),
    version
  );

  if (supportedNodeVersion) {
    console.log(
      chalk.yellow(
        `You are using Node ${process.version} so the project will be bootstrapped with an old unsupported version of tools.\n\n` +
          `Please update to Node 14 or higher for a better, fully supported experience.\n`
      )
    );
    process.exit(1);
  }
};

// 检查文件名称是否合法，不能和node模块重名
export const checkProjectName = (appName) => {
  const validationResult = validateProjectName(appName);
  if (!validationResult.validForNewPackages) {
    console.error(
      chalk.red(
        `Invalid file name!\nCannot create a project named ${chalk.green(
          `"${appName}"`
        )}`
      )
    );
    [
      ...(validationResult.errors || []),
      ...(validationResult.warnings || []),
    ].forEach((error) => {
      console.error(chalk.red(`  * ${error}`));
    });
    process.exit(1);
  }
};

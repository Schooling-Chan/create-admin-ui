import fs from "fs";
import path from "path";

/**
 *  递归读写模板文件
 * @param {*} src 模板文件路径
 * @param {*} target 拷贝目标路径
 */
const renderTemplate = (src, target) => {
  const stats = fs.statSync(src);

  // 递归生成文件
  if (stats.isDirectory()) {
    // if it's a directory, render its subdirectories and files recusively
    fs.mkdirSync(target, { recursive: true });
    for (const file of fs.readdirSync(src)) {
      renderTemplate(path.resolve(src, file), path.resolve(target, file));
    }
    return;
  }

  // const filename = path.basename(src);
  fs.copyFileSync(src, target);
};

export default renderTemplate;

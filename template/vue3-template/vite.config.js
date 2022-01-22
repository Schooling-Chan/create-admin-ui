import path from "path";

module.exports = {
  // open: true, //是否自动打开
  proxy: {
    //设置代理
  },
  minify: "esbuild", //压缩
  cssPreprocessOptions: {
    //css预处理
    less: {
      modifyVars: {
        "primary-color": "#FE5F23",
        "link-color": "#1890FFFF",
        "info-color": "#1890FFFF",
      },
      javascriptEnabled: true,
    },
  },
  alias: {
    //src目录的配置
    "@": path.resolve(__dirname, "/src"),
  },
};

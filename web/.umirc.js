import path from "path";
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'blog-web',
      dll: false,
      
      // routes: {
      //   exclude: [
      //     /models\//,
      //     /services\//,
      //     /model\.(t|j)sx?$/,
      //     /service\.(t|j)sx?$/,
      //     /components\//,
      //   ],
      // },
    }],
  ],
  alias: {
    "~": path.resolve("src")
  },
  theme: {
    "@primary-color": "#f0534e"
  },
  "proxy": {
    "/api": {
      "target": "http://127.0.0.1:8000",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "/api" }
    }
  }
}

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
    'plugin:prettier/recommended', // 添加 prettier 插件
  ],
  parserOptions: {
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'warn', // 未使用的参数
    'no-param-reassign': 'off', // 直接修改参数的值
    'global-require': 'off', // 全局的 require 导入
    'import/no-unresolved': 'off', // 只解析 import 方式的导入
    'import/extensions': 'off', // 引入的模块的文件名扩展
    'vue/multi-word-component-names': 'off', // 组件名称始终为多字
  },
}

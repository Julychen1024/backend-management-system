// lint-staged.config.cjs
module.exports = {
  // ========== TypeScript/JavaScript 文件检查 ==========
  '**/*.{ts,tsx,js,jsx}': [
    // ESLint 自动修复与检查
    'eslint --fix --max-warnings 0 --no-warn-ignored src/',
    // Prettier 格式化（二次校验）
    'prettier --write',
    // Git 添加修复后的文件
    'git add',
  ],

  // ========== SCSS/CSS 文件检查 ==========
  '**/*.{scss,css}': [
    // Stylelint 自动修复与检查
    'stylelint --fix --max-warnings 0',
    // Prettier 格式化
    'prettier --write',
    // Git 添加修复后的文件
    'git add',
  ],

  // ========== JSON 文件格式化 ==========
  '**/*.json': ['prettier --write', 'git add'],

  // ========== Markdown 文档格式化 ==========
  '**/*.md': ['prettier --write', 'git add'],

  // ========== 配置文件格式化 ==========
  '*.{yml,yaml}': ['prettier --write', 'git add'],

  // ========== 提交信息文件处理==========
  // 若项目包含提交模板，可格式化模板文件
  '.gitcommitmessage': ['prettier --write', 'git add'],
};
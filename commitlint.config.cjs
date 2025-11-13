// commitlint.config.cjs
module.exports = {
  // 继承 Conventional Commits 规范
  extends: ['@commitlint/config-conventional'],

  // ========== 自定义规则覆盖 ==========
  rules: {
    // 描述最小长度
    'subject-min-length': [2, 'always', 10],

    // ===== 正文与脚注 =====
    // 正文每行最大长度
    'body-max-line-length': [2, 'always', 100],
  },

  // ========== 辅助配置 ==========
  // 解析器选项
  parserPreset: {
    parserOpts: {
      // 允许脚注关联 Issue（如 Close #123, Fix #456）
      issuePrefixes: ['#', 'https://github.com/your-org/your-repo/issues/'],
    },
  },
};
// commitlint.config.cjs
module.exports = {
  // 继承 Conventional Commits 规范
  extends: ['@commitlint/config-conventional'],

  // ========== 自定义规则覆盖 ==========
  rules: {
    // ===== 类型约束 =====
    'type-enum': [
      2, // 错误级别
      'always',
      [
        'feat',     // 新功能
        'fix',      // 缺陷修复
        'docs',     // 文档变更
        'style',    // 代码风格（不影响逻辑）
        'refactor', // 重构（非fix非feat的代码优化）
        'perf',     // 性能优化
        'test',     // 测试相关
        'build',    // 构建系统或依赖变更
        'ci',       // CI配置变更
        'chore',    // 杂项（无源代变更）
        'revert',   // 回退提交
      ],
    ],

    // 类型必须为小写
    'type-case': [2, 'always', 'lowerCase'],

    // 类型不能为空
    'type-empty': [2, 'never'],

    // ===== 作用域约束 =====
    // 作用域可选，若填写需遵循 kebab-case
    'scope-case': [2, 'always', 'kebab-case'],

    // 作用域可为空
    'scope-empty': [0],

    // ===== 主题（描述）约束 =====
    // 描述不能为空
    'subject-empty': [2, 'never'],

    // 描述不能以句号结尾
    'subject-full-stop': [2, 'never', '.'],

    // 描述需以空格开头（与类型括号分隔）
    'subject-case': [0], // 不限制描述大小写

    // 描述最小长度
    'subject-min-length': [2, 'always', 10],

    // ===== 正文与脚注 =====
    // 正文每行最大长度
    'body-max-line-length': [2, 'always', 100],

    // 脚注需关联 Issue（如 Close #123）
    'footer-leading-blank': [1, 'always'],

    // ===== 引用检测 =====
    // 检测是否引用不存在的 Issue/PR
    'references-empty': [0], // 可选

    // 禁止 WIP（Work in Progress）提交
    'wip': [2, 'never'],
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
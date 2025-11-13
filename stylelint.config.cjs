// stylelint.config.cjs
module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-clean-order',
    'stylelint-config-prettier-scss',
  ],

  plugins: ['stylelint-prettier'],

  // ===== 仅SCSS文件使用专用解析器 =====
  customSyntax: 'postcss-scss',

  // ========== 规则覆盖与自定义 ==========
  rules: {
    // ===== 命名规范 =====
    'selector-class-pattern': [
      '^[a-z]([a-z0-9-]+)?(__[a-z0-9]+)?(-{1,2}[a-z0-9]+)*$',
      {
        message: 'Expected class selector to be kebab-case (e.g., block__element--modifier)',
      },
    ],

    // ===== 颜色管理 =====
    //使用Prettier控制大小写，此处禁用冲突规则
    'color-hex-length': 'long',
    'color-function-notation': null, // 禁用现代语法强制

    // ===== 声明块规范 =====
    'declaration-block-no-duplicate-properties': [
      true,
      {
        ignore: ['consecutive-duplicates-with-different-values'],
      },
    ],

    'declaration-block-no-redundant-longhand-properties': [
      true,
      {
        ignoreShorthands: ['grid-template'],
      },
    ],

    // ===== 选择器限制 =====
    'max-nesting-depth': 3,
    'selector-max-type': 2,

    // ===== SCSS特定规则 =====
    'scss/dollar-variable-pattern': '^[a-z][a-z0-9-]*$',
    'scss/at-extend-no-missing-placeholder': true,
    'scss/load-no-partial-leading-underscore': true,

    // ===== 单位管理 =====
    'length-zero-no-unit': true,
    //所有合法CSS单位
    'unit-allowed-list': [
      'px', 'rem', 'em', '%', 'vw', 'vh', 'svw', 'svh', 'lvw', 'lvh', 'dvw', 'dvh',
      's', 'ms',
      'deg', 'rad', 'turn', 'grad',
      'dpi', 'dpcm', 'dppx',
      'fr', 'ch', 'ex', 'cm', 'mm', 'in', 'pt', 'pc',
    ],

    // ===== 现代CSS特性 =====
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
  },
};
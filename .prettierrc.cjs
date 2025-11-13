module.exports = {
  // ========== 基础格式化配置 ==========

  // 每行最大字符数（超过会自动换行）
  "printWidth": 100,

  // 缩进使用的空格数
  "tabWidth": 2,

  // 使用空格而不是制表符
  "useTabs": false,

  // 在语句末尾添加分号
  "semi": true,

  // 使用单引号而不是双引号
  "singleQuote": true,

  // JSX 中使用单引号（false 表示使用双引号）
  "jsxSingleQuote": false,

  // 尾随逗号配置：es5 - 在 ES5 有效的的地方添加尾随逗号
  "trailingComma": "es5",

  // 对象字面量中括号之间的空格
  "bracketSpacing": true,

  // 将多行 HTML（HTML、JSX、Vue、Angular）元素的 > 放在最后一行的末尾
  "bracketSameLine": false,

  // 箭头函数参数括号：avoid - 尽可能省略括号
  "arrowParens": "avoid",

  // 文件格式配置
  "endOfLine": "lf",           // 换行符格式（lf - Unix/Mac, crlf - Windows）
  "quoteProps": "as-needed",   // 对象属性引号：按需添加

  // ========== 范围格式化配置 ==========
  "rangeStart": 0,             // 格式化范围的开始
  "rangeEnd": Infinity,        // 格式化范围的结束

  // ========== 解析器配置 ==========
  // Prettier 会自动根据文件类型选择解析器，通常不需要手动配置
  "parser": "",                // 显式指定解析器（留空自动检测）

  // ========== 文件类型特定配置 ==========
  "overrides": [
    {
      "files": "*.{css,scss,less}",
      "options": {
        "singleQuote": false   // CSS 中使用双引号
      }
    },
    {
      "files": "*.md",
      "options": {
        "printWidth": 80,      // Markdown 文件行宽较小
        "proseWrap": "always"  // 总是换行散文内容
      }
    },
    {
      "files": "*.json",
      "options": {
        "printWidth": 80       // JSON 文件行宽较小
      }
    },
    {
      "files": "*.yml",
      "options": {
        "singleQuote": false   // YAML 中使用双引号
      }
    }
  ]
}
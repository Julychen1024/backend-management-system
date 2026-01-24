// i18next-parser.config.ts
import type { UserConfig } from 'i18next-parser';

const config: UserConfig = {
  input: ['src/**/*.{ts,tsx}'],
  output: 'src/locales/$LOCALE/$NAMESPACE.json',
  namespaceSeparator: ':', // 必须与代码一致
  keySeparator: '.',
  defaultNamespace: 'common',
  locales: ['en', 'vi', 'zh-CN'],
  lexers: {
    tsx: [
      {
        lexer: 'JsxLexer',
        functions: ['t', 'i18next.t'],
      },
    ],
  },
  // 保持旧翻译（不会删除已存在的键）
  keepRemoved: false,

  // 失败阈值：缺失翻译超过 10% 时退出
  failOnWarnings: false,

  // 自定义值转换器（可选）
  customValueTemplate: null,
};

export default config;

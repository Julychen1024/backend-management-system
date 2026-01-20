import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';

// 获取当前文件目录（兼容ESM）
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  // 加载环境变量（可访问 .env 文件）
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // ========== 插件配置 ==========
    plugins: [
      react({
        // 仅在开发环境启用Fast Refresh
        include: '**/*.{tsx,ts}',
      }),
      tailwindcss(),
    ],

    esbuild: {
      drop: mode === 'production' ? ['debugger'] : [],
      pure: mode === 'production' ? ['console'] : [],
    },

    // ========== 路径别名 ==========
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
      // 自动解析扩展名
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },

    // ========== 开发服务器优化 ==========
    server: {
      port: Number(env.VITE_APP_PORT) || 3000, // 支持环境变量配置
      open: true,
      host: true, // 监听所有地址
      cors: true,
      // 代理配置示例
      // proxy: {
      //   '/api': {
      //     target: env.VITE_API_BASE_URL,
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, ''),
      //   },
      // },
    },

    // ========== 构建优化 ==========
    build: {
      // 输出目录（默认dist，可省略）
      outDir: 'dist',

      // 生成 source map（生产环境可关闭）
      sourcemap: mode !== 'production',

      // 提升chunk大小警告限制
      chunkSizeWarningLimit: 1600,

      // 输出目标（现代浏览器）
      target: 'esnext',

      // Rollup打包策略（智能分割）
      rollupOptions: {
        output: {
          // 智能代码分割（优于手动配置）
          manualChunks(id) {
            // React核心库单独打包
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
              return 'react-vendor';
            }

            // UI库单独打包（按需启用）
            if (id.includes('node_modules/@mui')) {
              return 'mui-vendor';
            }

            // 工具库单独打包
            if (id.includes('node_modules/lodash') || id.includes('node_modules/axios')) {
              return 'utils-vendor';
            }
            return undefined;
          },

          // 输出文件命名规范
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',

          // 压缩选项（Vite 5+默认使用esbuild，无需额外配置）
        },

        // 优化依赖（预构建）
        // 通常无需手动配置，Vite会自动处理
      },

      // CSS代码分割
      cssCodeSplit: true,

      // 启用/禁用 brotli 压缩大小报告
      reportCompressedSize: true,

      // 清空输出目录
      emptyOutDir: true,
    },

    // ========== CSS 相关 ==========
    css: {
      // 开发环境启用CSS sourcemap
      devSourcemap: true,
    },

    // ========== 性能优化 ==========
    performance: {
      // 预构建中最大文件大小
      maxAssetSize: 500000, // 500kb
      // 预构建中最大入口文件大小
      maxEntrypointSize: 500000,
    },
  };
});

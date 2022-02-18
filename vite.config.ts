import stylelintPlugin from 'vite-plugin-stylelint';
import eslintPlugin from 'vite-plugin-eslint';
import vuetify from '@vuetify/vite-plugin';
import type { UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';

// https://vitejs.dev/config/
const config: UserConfig = {
  // https://vitejs.dev/config/#base
  base: '/',
  resolve: {
    // https://vitejs.dev/config/#resolve-alias
    alias: [
      {
        // vue @ shortcut fix
        find: '@/',
        replacement: `${path.resolve(__dirname, './src')}/`,
      },
      {
        find: 'src/',
        replacement: `${path.resolve(__dirname, './src')}/`,
      },
    ],
  },
  // https://vitejs.dev/config/#server-options
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  },
  plugins: [
    // Vue3
    vue(),
    // Vuetify Loader
    // https://github.com/vuetifyjs/vuetify-loader
    vuetify({
      autoImport: true,
    }),
    // eslint
    // https://github.com/gxmari007/vite-plugin-eslint
    eslintPlugin({
      fix: true,
    }),
    // Stylelint
    // https://github.com/ModyQyW/vite-plugin-stylelint
    stylelintPlugin({
      fix: true,
    }),
    // compress assets
    // https://github.com/vbenjs/vite-plugin-compression
    // viteCompression(),
  ],
  // Build Options
  // https://vitejs.dev/config/#build-options
  build: {
    rollupOptions: {
      output: {
        plugins: [
          /*
          // if you use Code encryption by rollup-plugin-obfuscator
          obfuscator({
            globalOptions: {
              debugProtection: true,
            },
          }),
          */
        ],
      },
    },
    target: 'es2021',
    /*
    // Minify option
    // https://vitejs.dev/config/#build-minify
    minify: 'terser',
    terserOptions: {
      ecma: 2020,
      parse: {},
      compress: { drop_console: true },
      mangle: true, // Note `mangle.properties` is `false` by default.
      module: true,
      output: { comments: true, beautify: false },
    },
    */
  },
};

// Export vite config
export default defineConfig(async ({ command }): Promise<UserConfig> => {
  // Hook production build.
  // if (command === 'build') {
  // Write meta data.
  fs.writeFileSync(
    path.resolve(path.join(__dirname, 'src/Meta.ts')),
    `import MetaInterface from '@/interfaces/MetaInterface';

// This file is auto-generated by the build system.
const meta: MetaInterface = {
  version: '${require('./package.json').version}',
  date: '${new Date().toISOString()}',
};
export default meta;
`
  );
  // }

  return config;
});

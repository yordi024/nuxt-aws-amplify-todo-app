/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  plugins: ['prettier'],
  rules: {
    'vue/multi-word-component-names': 0,
    'prettier/prettier': [
      'warn',
      {
        $schema: 'https://json.schemastore.org/prettierrc',
        semi: false,
        tabWidth: 2,
        singleQuote: true,
        printWidth: 100,
        trailingComma: 'all',
        endOfLine: 'auto',
      },
    ],
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
}

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'plugin:nuxt/recommended'
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'arrow-parens': [1, 'as-needed', {requireForBlockBody: false}],
    'comma-dangle': ['error', 'never'],
    'no-console': 'off'
  }
}

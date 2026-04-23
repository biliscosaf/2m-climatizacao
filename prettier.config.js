/** @type {import('prettier').Config} */
const config = {
  // Aspas simples no JS/TS; duplas no JSX (padrão mais legível em HTML-like)
  singleQuote: true,
  jsxSingleQuote: false,
  // Ponto e vírgula obrigatório
  semi: false,
  // Largura de linha padrão
  printWidth: 100,
  // Indentação com 2 espaços
  tabWidth: 2,
  useTabs: false,
  // Vírgula final em objetos/arrays multi-linha (facilita diffs de git)
  trailingComma: "all",
  // Parênteses em arrow functions com 1 argumento
  arrowParens: "always",
  // Ordenar classes Tailwind automaticamente
  plugins: ["prettier-plugin-tailwindcss"],
}

module.exports = config

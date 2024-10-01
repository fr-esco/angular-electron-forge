const angularEslint = require('angular-eslint')
const typescriptEslint = require('typescript-eslint')

const importX = require('eslint-plugin-import-x')
const unusedImports = require('eslint-plugin-unused-imports')

module.exports = typescriptEslint.config(
  {
    plugins: { import: importX },
    files: ['**/*.ts'],
    rules: {
      'no-unexpected-multiline': 'error',
      'no-warning-comments': [
        'error',
        { terms: ['FIXME'], location: 'anywhere' },
      ],
      'import/no-duplicates': ['warn', { 'prefer-inline': true }],
      'import/order': [
        'warn',
        {
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
          pathGroups: [
            { pattern: '#*/**', group: 'internal' },
            {
              pattern: '@angular/**',
              group: 'builtin',
              position: 'before',
            },
          ],
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
        },
      ],
      'import/consistent-type-specifier-style': ['warn', 'prefer-inline'],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: true,
          fixStyle: 'inline-type-imports',
        },
      ],
      // '@typescript-eslint/no-misused-promises': [
      //   'error',
      //   { checksVoidReturn: false },
      // ],
      // '@typescript-eslint/no-floating-promises': 'error',
    },
  },
  {
    plugins: { 'unused-imports': unusedImports },
    files: ['**/*.ts'],
    rules: {
      'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['**/*.ts'],
    extends: [...angularEslint.configs.tsAll],
  },
  {
    files: ['**/*.html'],
    extends: [...angularEslint.configs.templateAll],
    rules: {
      '@angular-eslint/template/attributes-order': [
        'error',
        {
          alphabetical: true,
          order: [
            'STRUCTURAL_DIRECTIVE', // e.g. `*ngIf="true"`, `*ngFor="let item of items"`
            'TEMPLATE_REFERENCE', // e.g. `<input #inputRef>`
            'ATTRIBUTE_BINDING', // e.g. `<input required>`, `id="3"`
            'INPUT_BINDING', // e.g. `[id]="3"`, `[attr.colspan]="colspan"`, [style.width.%]="100", [@triggerName]="expression", `bind-id="handleChange()"`
            'TWO_WAY_BINDING', // e.g. `[(id)]="id"`, `bindon-id="id"
            'OUTPUT_BINDING', // e.g. `(idChange)="handleChange()"`, `on-id="handleChange()"`
          ],
        },
      ],
      '@angular-eslint/template/i18n': 'off',
      '@angular-eslint/template/no-call-expression': 'off',
    },
  }
)

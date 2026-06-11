import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-console': 'warn',
    },
  },
  {
    files: [
      'src/features/**/*.{ts,tsx}',
      'src/entities/**/*.{ts,tsx}',
      'src/widgets/**/*.{ts,tsx}',
      'src/app/**/*.{ts,tsx}',
    ],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@radix-ui/react-*'],
              message:
                'Vui lòng sử dụng component tương ứng của Shadcn UI tại "@/shared/ui/*" thay vì import trực tiếp Radix UI thô.',
            },
            {
              group: ['framer-motion'],
              message:
                'Vui lòng hạn chế sử dụng framer-motion trực tiếp ở các component nghiệp vụ. Hãy sử dụng CSS/Tailwind transition cho hiệu ứng cơ bản hoặc tạo wrapper hoạt cảnh tại "@/shared/ui/*".',
            },
          ],
        },
      ],
    },
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'coverage/**',
    'playwright-report/**',
    'test-results/**',
    'next-env.d.ts',
  ]),
])

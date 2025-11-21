import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {

        globals: true,

        environment: 'jsdom',


        coverage: {
            provider: 'v8',
            reporter: ['text', 'html'],
            reportsDirectory: './coverage',
            exclude: [
                'node_modules/',
                'dist/',
                '**/vitest.config.ts',
                '**/vite.config.ts'
            ],
            thresholds:{
                gobal:{
                    statements: 80,
                    branches: 80,
                    functions: 80,
                    lines: 80
                }
            }
        },
    },
})  
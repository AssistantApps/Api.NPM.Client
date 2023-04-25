import type { Config } from 'jest';

const config: Config = {
    verbose: true,
    testPathIgnorePatterns: [
        '/node_modules/',
        'lib',
        'dist',
        'src/services/api/controller',
    ],
};

export default config;
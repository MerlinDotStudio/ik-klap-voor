module.exports = {
    apps: [
        {
            name: 'accept-farm-front-end',
            script: 'npm',
            args: 'start',
            interpreter: 'node@12.9.0',
            env: {
                NODE_ENV: 'development',
                PORT: 3000
            },
        },
        {
            name: 'prod-farm-front-end',
            script: 'npm',
            args: 'start',
            interpreter: 'node@12.9.0',
            env: {
                NODE_ENV: 'production',
                PORT: 3001
            },
        },
    ],
};

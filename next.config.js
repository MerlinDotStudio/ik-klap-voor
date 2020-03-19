module.exports = () => {
    if (process.env.ENV === 'prod') {
        return {
            env: {
                APIURL: 'https://lely-api.level20wizards.com',
            },
        };
    }

    if (process.env.ENV === 'accept') {
        return {
            env: {
                APIURL: 'https://lely-api-accept.level20wizards.com',
            },
        };
    }

    return {
        env: {
            APIURL: 'http://localhost:3002',
        },
    };
};

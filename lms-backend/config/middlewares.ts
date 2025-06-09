export default [
    'strapi::logger',
    'strapi::errors',

    // 'strapi::security',
    {
        name: 'strapi::security',
        config: {
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    'connect-src': ["'self'", 'https:'],
                    'img-src': [
                        "'self'",
                        'data:',
                        'blob:',
                        'market-assets.strapi.io',
                        process.env.AWS_URL,
                    ],
                    'media-src': [
                        "'self'",
                        'data:',
                        'blob:',
                        'market-assets.strapi.io',
                        process.env.AWS_URL,
                    ],
                    upgradeInsecureRequests: null,
                },
            },
        },
    },

    // 'strapi::cors',
    {
        name: 'strapi::cors',
        config: {
            origin: [process.env.FRONTEND_URL,],
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            headers: ['Content-Type', 'Authorization'],
            credentials: true,
        },
    },

    'strapi::poweredBy',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
]


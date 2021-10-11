import config from './config'

export default {
    target: 'server',
    ssr: true,

    head: {
        title: 'MessageRelay Lite',
        htmlAttrs: {
            lang: 'de'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    css: [
        'quill/dist/quill.core.css',
        'quill/dist/quill.snow.css',
        'quill-emoji/dist/quill-emoji.css',
        '~/assets/css/bootstrap.min.css'
    ],

    plugins: [
        { src: '~plugins/quill', ssr: false }
    ],

    components: true,

    buildModules: [],

    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth-next'
    ],

    auth: {
        strategies: {
            local: false,
            cloud: {
                scheme: 'oauth2',
                endpoints: {
                    authorization: 'https://' + config.keycloakInstance + '/auth/realms/' +
                        config.keycloakRealm + '/protocol/openid-connect/auth',
                    token: 'https://' + config.keycloakInstance + '/auth/realms/' +
                        config.keycloakRealm + '/protocol/openid-connect/token',
                    userInfo: 'https://' + config.keycloakInstance + '/auth/realms/' +
                        config.keycloakRealm + '/protocol/openid-connect/userinfo',
                },
                token: {
                    maxAge: 600,
                },
                responseType: 'code',
                grantType: 'authorization_code',
                clientId: config.keycloakClient,
                scope: ['openid'],
                codeChallengeMethod: 'plain',
            },
        }

    },

    axios: {
        baseURL: config.apiHost + '/api/v1/frontend'
    },

    router: {
        middleware: ['auth']
    },

    build: {}
}
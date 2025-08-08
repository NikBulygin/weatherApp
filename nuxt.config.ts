// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/test-utils',
    '@nuxtjs/i18n',
    '@nuxtjs/storybook',
  ],

  css: ['~/assets/css/main.css'],
  nitro: {
    compressPublicAssets: true,
    minify: true,
    prerender: {
      crawlLinks: false
    },
    publicAssets: [
      {
        dir: 'public/storybook',
        baseURL: '/storybook',
        maxAge: 60 * 60 * 24 * 7 
      }
    ],
    experimental: {
      openAPI: true,
    },
    openAPI: {
      meta: {
        title: 'Weather App',
        description: 'Test application for weather data',
        version: '1.0.0'
      }
    }
  },


   i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'en',
    baseUrl: import.meta.env.DEV ? 'http://localhost:3000/' : 'https://weatherappbulyginnikita.netlify.app/',
    locales: [
      { code: 'en', name: 'English', language: 'en', file: 'en.ts' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    }
  },
})
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['@/assets/css/main.css'],

  build: {},

  runtimeConfig: {
    public: {
      decryptionKey: process.env.NUXT_DDV_DECRYPT_KEY,
    },
  },

  modules: ['nuxt-icon', '@nuxtjs/eslint-module', '@nuxtjs/tailwindcss', 'nuxt-shiki'],

  nitro: {
    externals: {
      inline: ['readable-stream'],
    },
  },

  alias: {
    string_decoder: 'string_decoder/',
  },

  shiki: {
    bundledLangs: ['json'],
  },
});

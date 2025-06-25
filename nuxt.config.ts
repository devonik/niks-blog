import { seoData } from './data'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-09-30',
  runtimeConfig: {
    igAccessToken: process.env.NUXT_IG_ACCESS_TOKEN || '',
    email: {
      username: process.env.NUXT_EMAIL_USERNAME || '',
      password: process.env.NUXT_EMAIL_PASSWORD || '',
    },
    stripeApiKey: process.env.NUXT_STRIPE_API_KEY || '',
    stripeWebhookSecret: process.env.NUXT_STRIPE_WEBHOOK_SECRET || '',
    databaseUrl: process.env.NUXT_DATABASE_URL || '',
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL || 'https://blog.devnik.dev',
    },
    publicRuntimeConfig: {
      googleAdsense: {
        id: 'ca-pub-4609998981070446',
        test: process.env.NUXT_GOOGLE_ADSENSE_TEST_MODE === 'true',
      },
    },
  },
  modules: [
    'nuxt-icon',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    'nuxt-og-image',
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@formkit/auto-animate',
    '@stefanobartoletti/nuxt-social-share',
    'nuxt-scheduler',
    '@nuxtjs/google-adsense',
  ],
  socialShare: {
    baseUrl: 'https://blog.devnik.dev',
  },
  image: {
    provider: 'ipx',
    ipx: {
      modifiers: {
        //Has to be null otherwise the images are rotating if they have specific exif data
        rotate: null,
      },
    },
  },

  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=device-width,initial-scale=1',
      title: seoData.title,
      titleTemplate: `%s - ${seoData.title}`,
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=0.41, maximum-scale=1' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  sitemap: {
    sources: [seoData.mySite],
  },

  site: {
    url: seoData.mySite,
    name: 'Niklas Grieger',
  },

  typescript: {
    strict: true,
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/rss.xml'],
    },
  },

  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'light',
  },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: 'dracula',
        },
        toc: {
          depth: 4, // include h2 headings
          searchDepth: 4,
        },
      },
    },
  },
})

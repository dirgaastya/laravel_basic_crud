import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Laravel Bootcamp',
  description: 'Laravel Basic CRUD Tutorial',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: 'https://bootcamp.laravel.com/img/logomark.min.svg',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Get Started', link: '/installation' },
    ],

    sidebar: [
      {
        text: 'Get Started',
        items: [
          { text: 'Installation', link: '/installation' },
          { text: 'Setup .env', link: '/env-setup' },
        ],
      },
      {
        text: 'Blade Template',
        items: [{ text: 'Layouting', link: '/layouting' }],
      },
      {
        text: 'CRUD - Article',
        items: [
          { text: 'Create Article', link: '/create-article' },
          { text: 'Show List Article', link: '/list-article' },
          { text: 'Show Detail Article', link: '/detail-article' },
          { text: 'Edit Article', link: '/edit-article' },
          { text: 'Delete Article', link: '/delete-article' },
        ],
      },
      {
        text: 'CRUD - Exercise',
        items: [{ text: 'Exercise', link: '/exercise' }],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
});

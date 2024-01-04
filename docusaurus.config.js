// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Logy',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://logy.codnect.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/social-card.png',
      navbar: {
        title: 'Logy',
        logo: {
          alt: 'Logy',
          src: 'img/logo.png',
        },
        items: [
          {
            label: 'Go to Codnect',
            href: 'https://codnect.io',
          },
          {
            label: 'Discussions',
            href: 'https://github.com/codnect/logy/discussions',
            position: 'right',
          },
          {
            href: 'https://github.com/codnect/logy',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        links: [
          {
            title: 'Our Open Source Projects',
            items: [
              {
                label: 'Procyon',
                href: 'https://www.procyon.codnect.io',
              },
              {
                label: 'Logy',
                href: 'https://www.logy.codnect.io',
              },
              {
                label: 'Chrono',
                href: 'https://www.chrono.codnect.io',
              },
              {
                label: 'Reflector',
                href: 'https://www.reflector.codnect.io',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub Discussions',
                href: 'https://github.com/codnect/logy/discussions',
              },
              /*{
                label: 'Discord',
                href: 'https://discordapp.com/invite/',
              },*/
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/codnect/logy',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Logy by Codnect`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;

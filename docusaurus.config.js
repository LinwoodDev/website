module.exports = {
  title: 'Linwood',
  tagline: 'Applications for you',
  url: 'https://linwood.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'LinwoodCloud', // Usually your GitHub org/user name.
  projectName: 'website', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Linwood',
      logo: {
        alt: 'Linwood Logo',
        src: 'img/logo.svg',
      },
      items: [
        /*{
          to: 'docs/bot/overview',
          activeBasePath: 'docs/bot',
          label: 'Bot',
          position: 'left',
        },*/
        {
          href: 'https://docs.butterfly.linwood.dev',
          label: 'Butterfly',
          position: 'left',
        },
        {
          href: 'https://docs.flow.linwood.dev',
          label: 'Flow',
          position: 'left',
        },
        {
          href: 'https://docs.dev-doctor.linwood.dev',
          label: 'Dev-Doctor',
          position: 'left',
        },
        {
          href: 'https://docs.launch.linwood.dev',
          label: 'Launcher',
          position: 'left',
        },
        {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/LinwoodCloud/website.git',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        // {
        //   title: 'Docs',
        //   items: [
        //     {
        //       label: 'Style Guide',
        //       to: 'docs/',
        //     },
        //     {
        //       label: 'Second Doc',
        //       to: 'docs/doc2/',
        //     },
        //   ],
        // },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.linwood.dev',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/LinwoodCloud',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/LinwoodCloud/website.git',
            },
          ],
        },
        {
          title: 'Legal',
          items: [
            {
              label: 'Imprint',
              to: 'https://codedoctor.tk/impress',
            },
            {
              label: 'Privacy Policy',
              href: 'https://codedoctor.tk/privacy',
            },
          ],
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} LinwoodCloud.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/LinwoodCloud/website/edit/main/',
        },
        blog: {
          feedOptions: {
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} LinwoodCloud.`,
          },
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/LinwoodCloud/website/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};

/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && await import('./src/env.js');

import pwa from 'next-pwa';
// @ts-ignore
import nextra from 'nextra';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const withPwa = pwa({
  dest: 'public',
  // disable: process.env.NODE_ENV === 'development',
});

const withNextra = nextra({
  theme: 'nextra-theme-blog',
  themeConfig: './theme.config.jsx',
});

export default withNextra(withPwa({
  reactStrictMode: true,
  output: 'standalone',

  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  transpilePackages: ['geist'],
  images: {
    remotePatterns: [
      {
        hostname: 'upload-dev.splitpro.app',
        port: '',
        pathname: '/**',
      },
      {
        hostname: 'uploads.splitpro.app',
        port: '',
        pathname: '/**',
      },
      {
        hostname: 's3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        hostname: 'splitwise.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        hostname: 'api.producthunt.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}));

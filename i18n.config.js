module.exports = {
    i18n: {
      // These are all the locales you want to support in
      // your application
      locales: ['en', 'vi'],
      // This is the default locale you want to be used when visiting
      // a non-locale prefixed path e.g. `/hello`
      defaultLocale: 'vi',
      // This is a list of locale domains and the default locale they
      // should handle (these are only required when setting up domain routing)
      domains: [
        {
          domain: 'www.tempest.vn',
          defaultLocale: 'vi',
          // other locales that should be handled on this domain
          locales: ['vi'],
        },
        {
          domain: 'www.tempest.vn/en',
          defaultLocale: 'en',
        },
        
      ],
    },
  }
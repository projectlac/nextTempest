const configLanguage = {
  i18n: {
    locales: ["en", "vi"],
    defaultLocale: "vi",
    domains: [
      {
        // Note: subdomains must be included in the domain value to be matched
        // e.g. www.example.com should be used if that is the expected hostname
        domain: "www.tempest.vn",
        defaultLocale: "vi",
      },
      {
        domain: "www.tempest.vn/en",
        defaultLocale: "en",
        locales: ["en"],
      },
    ],
  },
};
module.exports = configLanguage;

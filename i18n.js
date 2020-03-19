const NextI18Next = require('next-i18next').default;

const NextI18NextInstance = new NextI18Next({
    defaultLanguage: 'nl',
    otherLanguages: ['en'],
    localeSubpaths: {
        nl: '',
    },
    browserLanguageDetection: true,
    localePath: 'public/locales',
});

/* Optionally, export class methods as named exports */
module.exports = {
    ...({ appWithTranslation, withTranslation } = NextI18NextInstance),
    ...NextI18NextInstance,
};

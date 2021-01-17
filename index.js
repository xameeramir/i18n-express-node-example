const express = require('express')
const app = express()
const i18nMiddleware = require('i18next-express-middleware');
const i18n = require('i18next');
const Backend = require('i18next-node-fs-backend');
const { LanguageDetector } = require('i18next-express-middleware');
const port = 3000

i18n
    .use(Backend)
    .use(LanguageDetector)
    .init({
        whitelist: ['en', 'my'],
        fallbackLng: 'en',

        // have a common namespace used around the full app
        ns: ['common'],
        defaultNS: 'common',

        debug: false,

        backend: {
            loadPath: './locales/{{lng}}/{{ns}}.json',
            // jsonIndent: 2
        }
    });

app.use(i18nMiddleware.handle(i18n))

app.get('/', (req, res) => {
    var i18n = req.i18n;

    console.log(req.i18n.language) // language set correctly :)
    console.log(i18n.t('title')) // translation not working :(
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
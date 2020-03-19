/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const next = require('next');
const nextI18NextMiddleware = require('next-i18next/middleware').default;

const nextI18next = require('./i18n');

const port = process.env.PORT || 3000;
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

(async () => {
    await app.prepare();
    const server = express();

    server.use(nextI18NextMiddleware(nextI18next));

    server.get('*', (req, res) => handle(req, res));

    await server.listen(port);
    console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line no-console
})();



// MEES FIREBASE SET UP

// /* eslint-disable @typescript-eslint/no-var-requires */
// const express = require('express');
// const next = require('next');
// const nextI18NextMiddleware = require('next-i18next/middleware').default;
//
// const nextI18next = require('./i18n');
//
// const port = process.env.PORT || 3000;
// const app = next({ dev: process.env.NODE_ENV !== 'production' });
// const handle = app.getRequestHandler();
//
// const admin = require("firebase-admin");
//
// const serviceAccount = require("./reveal-158c2-firebase-adminsdk-nj6c3-d203feec34.json");
//
// admin.initializeApp({
// 	credential: admin.credential.cert(serviceAccount),
// 	databaseURL: "https://reveal-158c2.firebaseio.com"
// });
//
// const db = admin.firestore();
//
// (async () => {
// 	await app.prepare();
// 	const server = express();
//
// 	server.use(nextI18NextMiddleware(nextI18next));
//
// 	server.get('*', (req, res) => handle(req, res));
//
// 	await server.listen(port);
// 	console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line no-console
// })();

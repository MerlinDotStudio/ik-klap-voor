import React from 'react';
import Head from 'next/head';

export default props => {
    return (
        <Head>
            <title>ik klap voor</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />

            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            <meta name="HandheldFriendly" content="True" />
            <meta
                name="keywords"
                content="corona, klap, klappen, clap, applaud, covid19, artsen, brandweer, ov, openbaar vervoer, postbodes"
            />
            <meta name="subject" content="ik klap voor" />
            <meta name="url" content="https://ikklapvoor.nl/" />
            <meta
                name="description"
                content="👏 Klap voor de helden van Corona of plaats een bericht om zo de mensen die elke dag hun ding doen een hart onder de riem te steken"
            />
            <meta name="topic" content="👏 ik klap voor" />

            <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
            <link rel="manifest" href="/favicon/site.webmanifest" />
            <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff" />
            <link rel="shortcut icon" href="/favicon/favicon.ico" />

            <meta name="apple-mobile-web-app-title" content="ik klap voor" />
            <meta name="application-name" content="ik klap voor" />
            <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
            <meta name="image" content="/images/metatag.jpg" />

            <meta name="google-site-verification" content="2hdFjE7vYsnEDzA1ZRqyCbcNlQkFaiUvHT9KCg4FCHI" />

            <meta itemProp="name" content="ik klap voor" />
            <meta
                itemProp="description"
                content="Klap voor de helden van Corona of plaats een bericht om zo de mensen die elke dag hun ding doen een hart onder de riem te steken"
            />
            <meta itemProp="image" content="/images/metatag.jpg" />

            <meta name="og:title" content="ik klap voor" />
            <meta
                name="og:description"
                content="Klap voor de helden van Corona of plaats een bericht om zo de mensen die elke dag hun ding doen een hart onder de riem te steken"
            />
            <meta name="og:image" content="/images/metatag.jpg" />
            <meta name="og:url" content="https://ikklapvoor.nl/" />
            <meta name="og:site_name" content="ik klap voor" />
            <meta name="og:locale" content="nl_nl" />
            <meta name="og:type" content="website" />

			<meta property="twitter:card" content="summary_large_image"/>
			<meta property="twitter:url" content="https://ikklapvoor.nl/"/>
			<meta property="twitter:title" content="Ik klap voor..."/>
			<meta property="twitter:description" content="Klap voor de helden van Corona of plaats een bericht om zo de mensen die elke dag hun ding doen een hart onder de riem te steken"/>
			<meta property="twitter:image" content="/images/metatag.jpg"/>


            <script type="application/ld+json">
                {`
				{
					"@context": "https://schema.org/",
					"@type": "WebSite",
					"name": "ik klap voor",
					"url": "https://ikklapvoor.nl/"
				}
			`}
            </script>

            <script async defer src="https://www.googletagmanager.com/gtag/js?id=UA-132349720-7" />
			<script dangerouslySetInnerHTML={{__html:`
				window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());

				gtag('config', 'UA-132349720-7');
				gtag('config', 'UA-132349720-7', {'anonymize_ip': true});
			`}}/>
		</Head>
    );
};

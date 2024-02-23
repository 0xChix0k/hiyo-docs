import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

const SEO = () => {
  const { t } = useTranslation('seo');
  return (


    <Helmet>
      <meta charSet="utf-8" />
      <title>{t('seo:title')}</title>
      <link rel="icon" href="favicon.ico" />
      <meta name="title" content={t('seo:title')} />
      <meta name="description" content={t('seo:des')} />
      <meta name="keywords" content={t('seo:keywords')} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta property="og:site_name" content={t('seo:title')} />
      <meta property="og:title" content={t('seo:title')} />
      <meta property="og:description" content={t('seo:des')} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.coss.com.tw/" />
      {/* <meta property="og:image" content="logo192.png"/> */}
      <meta name="twitter:title" content={t('seo:title')} />
      <meta name="twitter:description" content={t('seo:des')} />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800&display=swap"
        rel="stylesheet"
      />
    </Helmet>
  );
};

export default SEO;

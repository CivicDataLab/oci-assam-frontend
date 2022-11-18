import Head from 'next/head';
// import { useRouter } from 'next/router';

const Seo: React.FC<{ seo?: any }> = ({ seo }) => {
  // const router = useRouter();

  const title =
    seo && seo.title ? seo.title : 'Assam Public Procurement Explorer';
  const description =
    seo && seo.description
      ? seo.description
      : "Assam Public Procurement Explorer is a tool for exploring and analyzing Assam's procurement data for improved citizen engagement and better decision making by government officials.";

  const url = `https://open-contracting.in/`;
  return (
    <Head>
      {title && (
        <>
          <title>{title}</title>
          <meta property="og:title" content={title} />
          <meta name="twitter:title" content={title} />
        </>
      )}
      {description && (
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta name="twitter:description" content={description} />
        </>
      )}
      {url && (
        <>
          <meta property="og:url" content={url} />
          <meta property="twitter:url" content={url} />
        </>
      )}

      {/* type */}
      <meta property="og:type" content="website" />
      <meta property="twitter:card" content="summary_large_image" />

      {/* Image */}
      <meta
        property="og:image"
        content="https://assam.open-contracting.in/assets/images/oci_logo.png"
      />
      <meta
        property="twitter:image"
        content="https://assam.open-contracting.in/assets/images/oci_logo.png"
      />

      <meta name="application-name" content="Open Contracting India" />
    </Head>
  );
};

export default Seo;

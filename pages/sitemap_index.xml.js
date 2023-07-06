import fs from 'fs';

import { fetchDatasets } from 'utils';

const baseUrl = 'https://assam.open-contracting.in';
// eslint-disable-next-line @typescript-eslint/no-empty-function
const Sitemap = () => {};

export const getServerSideProps = async function ({ res }) {
  const staticPages = fs
    .readdirSync('pages')
    .filter((staticPage) => {
      return ![
        '_app.tsx',
        '_document.tsx',
        '_error.tsx',
        'sitemap.xml.js',
        'sitemap_index.xml.js',
        'index.tsx',
        '[state]',
        'explorer',
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `${baseUrl}/${staticPagePath}`; // Add Static pages like resources, about
    });
  staticPages.unshift(baseUrl); // Remove duplicate of base url

  // get procurement datasets
  const datasets = await fetchDatasets('tender_dataset', { rows: 100000 });
  const { results } = datasets.result;

  Object.values(results).forEach((doc) => {
    staticPages.push(`${baseUrl}/datasets/${doc.name}`);
  });

  // get KPIs
  const KpiData = await fetchDatasets('kpi_dataset', { rows: 100000 });
  const { results: kpis } = KpiData.result;
  Object.values(kpis).forEach((doc) => {
    staticPages.push(`${baseUrl}/kpi/${doc.name}`);
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;

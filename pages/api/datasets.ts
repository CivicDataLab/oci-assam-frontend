import type { NextApiRequest, NextApiResponse } from 'next';
import { getFilteredData } from 'utils/download_data';
import archiver from 'archiver';

async function fetchDatasets(filters: string) {
  const res = await fetch(
    `http://15.207.1.169/api/3/action/package_search?fq=${filters} AND private:false AND type:tender_dataset&rows=99999`
  );
  const data = await res.json();
  return data;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { filters } = req.body;
  const archive = archiver('zip', {
    zlib: { level: 9 },
  });

  archive.on('error', function (err) {
    res.status(500).send({ error: err.message });
  });

  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', 'attachment; filename=contracts.zip');

  try {
    const result: any = await fetchDatasets(filters);
    const filteredData = getFilteredData(result.result.results);

    // Convert the filtered data to a string
    const dataString = JSON.stringify(filteredData);

    // Append the data string to the archive as a file
    archive.append(dataString, { name: 'contracts.json' });
    archive.pipe(res);

    archive.finalize();
  } catch (err) {
    res.status(500).json({ error: 'failed to download' });
  }
}

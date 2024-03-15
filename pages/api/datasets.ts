import type { NextApiRequest, NextApiResponse } from 'next';
import { getFilteredData } from 'utils/download_data';

async function fetchDatasets(filters: string) {
  const res = await fetch(
    `http://15.207.1.169/api/3/action/package_search?fq=${filters} AND private:false AND type:tender_dataset&rows=99999`
  );
  const data = await res.json();
  return data;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');

  const { filters } = JSON.parse(req.body);

  try {
    const result: any = await fetchDatasets(filters);
    const filteredData = getFilteredData(result.result.results);

    res.status(200).json({ data: filteredData });
  } catch (err) {
    res.status(500).json({ error: 'failed to download' });
  }
}

import React from 'react';
import { saveAs } from 'file-saver';
import { Download } from 'components/icons/shared';
import * as echarts from 'echarts/core';

function fileName(type, name, format) {
  // If there is no type, eg: table, don;t add it to the name
  if (type != 'NA' && format != 'csv') return `${name}.${format}`;
  else return `${name}.${format}`;
}

function download_csv(csv, filename) {
  const csvFile = new Blob([csv], { type: 'text/csv' });
  const downloadLink = document.createElement('a');

  // File name
  downloadLink.download = filename;

  // We have to create a link to the file
  downloadLink.href = window.URL.createObjectURL(csvFile);

  // Make sure that the link is not displayed
  downloadLink.style.display = 'none';

  // Add the link to your DOM
  document.body.appendChild(downloadLink);

  downloadLink.click();
}

export function export_table_to_csv(filename: any) {
  const csv = [];
  const rows = document.querySelectorAll('#tableView tr');

  for (let i = 0; i < rows.length; i += 1) {
    const row = [];
    const cols = rows[i].querySelectorAll('td, th') as any;

    for (let j = 0; j < cols.length; j += 1) row.push(cols[j].innerText);

    csv.push(row.join(','));
  }

  // Download CSV
  download_csv(csv.join('\n'), filename);
}

const DownloadViz = ({ viz, type, name, isTable }) => {
  function canva2img() {
    const myChart = echarts.getInstanceByDom(
      document.querySelector('.echarts-for-react')
    );

    const url = myChart.getConnectedDataURL({
      pixelRatio: 5,
      backgroundColor: '#fff',
      excludeComponents: ['toolbox'],
      type: 'png',
    });
    saveAs(url, fileName(type, name, 'png'));

    // watermark([url, '/assets/images/oci-assam-dark.png'])
    //   .image(watermark.image.lowerRight(0.5))
    //   .then((img) => saveAs(img.src, fileName(type, name, 'png')));
  }

  function downloadSelector(viz) {
    if (viz == '#tableView') export_table_to_csv(fileName(type, name, 'csv'));
    else canva2img();
  }

  return (
    <button onClick={() => downloadSelector(viz)} className="btn-primary">
      <Download /> {`Download ${isTable ? 'CSV' : 'Chart'}`}
    </button>
  );
};

export default DownloadViz;

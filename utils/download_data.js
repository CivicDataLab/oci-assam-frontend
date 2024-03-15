const acceptedFields = [
  'bids',
  'buyer',
  'parties',
  'tender',
  'awards',
  'statistics',
  'ocid',
  'id_',
  'initiationType',
  'tags',
];

export function getFilteredData(data) {
  return data.map((item) => {
    const newItem = {};
    for (const key in item) {
      if (acceptedFields.includes(key)) {
        newItem[key] = item[key];
      }
    }
    return newItem;
  });
}

export function download_data(data) {
  var dataStr =
    'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', 'contracts' + '.json');
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

export async function downloadAsBlob(res) {
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'contracts.zip';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

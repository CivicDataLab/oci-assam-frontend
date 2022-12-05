export function download_data(data, format) {
  if (format === 'xlsx') {
    const csvString =
      'data:text/csv;charset=utf-8,' +
      [
        [
          'ocid',
          'tender/id',
          'tender/externalReference',
          'tender/mainProcurementCategory',
          'tender/procurementMethod',
          'tender/contractType',
          'tenderclassification/description',
          'tender/participationFee/0/multiCurrencyAllowed',
          'tender/value/amount',
          'tender/datePublished',
          'tender/tenderPeriod/durationInDays',
          'Payment Mode',
          'tender/status',
          'tender/stage',
          'tender/numberOfTenderers',
          'tender/bidOpening/date',
          'buyer/name',
        ],
        ...data.map((item) => [
          item.ocid || '',
          item.tender_id || '',
          item.tender_externalreference || '',
          item.tender_mainprocurementcategory || '',
          item.tender_procurementmethod || '',
          item.tender_contracttype || '',
          item.tenderclassification_description || '',
          item.tender_participationFee_0_multicurrencyallowed || '',
          item.tender_value_amount || '',
          item.tender_datepublished || '',
          item.tender_tenderperiod_durationindays || '',
          item.payment_mode || '',
          item.tender_status || '',
          item.tender_stage || '',
          item.tender_numberoftenderers || '',
          item.tender_bid_opening_date || '',
          item.organization.title || '',
        ]),
      ]
        .map((e) => e.join(','))
        .join('\n');
    var encodedUri = encodeURI(csvString);
    window.open(encodedUri);
  } else {
    var dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(data));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'contracts' + '.json');
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
}

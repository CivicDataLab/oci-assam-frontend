export function download_data(data) {
  const csvString =
    'data:text/csv;charset=utf-8,' +
    [
      [
        'Buyer Name',
        'Tender Title',
        'Tender ID',
        'Open contracting ID',
        'Tender amount',
        'Published Date',
        'Tender Period Duration In Days',
        'Bid Opening Date',
        'Tender Milestones',
        'Tender Category',
        'Tender Type',
        'Product Category',
        'Tender Status',
        'Tender Stage',
        'No of Bids Received',
        'Tender Documents ID',
      ],
      ...data.map((item) => [
        item.organization.title || '',
        `"${item.tender_title}"` || '',
        item.tender_id || '',
        item.ocid || '',
        item.tender_value_amount || '',
        item.tender_bid_opening_date || '',
        item.tender_tenderperiod_durationindays || '',
        item.tender_bid_opening_date || '',
        item.tender_milestones_duedate || '',
        item.tender_mainprocurementcategory || '',
        item.tender_procurementmethod || '',
        item.tenderclassification_description || '',
        item.tender_status || '',
        item.tender_stage || '',
        item.tender_numberoftenderers || '',
        item.tender_documents_id || '',
      ]),
    ]
      .map((e) => e.join(','))
      .join('\n');
  var encodedUri = encodeURI(csvString);
  window.open(encodedUri);
}

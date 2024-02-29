export const sortItems = [
  {
    id: 'bidOpeningDate:asc',
    name: 'Date Asc',
  },
  {
    id: 'bidOpeningDate:desc',
    name: 'Date Desc',
  },
  {
    id: 'tendeValueAmount:asc',
    name: 'Tender Value Asc',
  },
  {
    id: 'tendeValueAmount:desc',
    name: 'Tender Value Desc',
  },
  {
    id: 'organization:asc',
    name: 'Departments',
  },
  {
    id: 'score:desc',
    name: 'Relevance',
  },
];
export const defaultSort = 'bidOpeningDate:asc';

export const filterList =
  '"organization", "fiscalYear", "mainProcurementCategory"';

export function formatFilterName(name: string) {
  if (name == 'fiscalYear') {
    return 'fiscal year';
  } else if (name == 'organization' || name == 'buyer_name')
    return 'buyer name';
  else if (name == 'mainProcurementCategory') return 'category';
  else return name;
}

export type Format = 'CSV' | 'XML' | 'TXT' | 'TSV' | 'PDF';

export interface IResource {
  id: string;
  name: string;
  title: string;
  url: string;
  format: Format;
  created: string;
  last_modified: string;
}

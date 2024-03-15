import React from 'react';
import { event } from '../../utils/ga';
import { download_data } from 'utils/download_data';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from 'components/_shared/Dialog';
import { Download } from 'lucide-react';

export const DownloadDataset = ({ results }) => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [downloadType, setDownloadType] = React.useState('json');
  const [downloadMethod, setDownloadMethod] =
    React.useState('download-current');

  function handleModalClick() {
    setModalIsOpen(!modalIsOpen);
    setDownloadType('json');
    setDownloadMethod('download-current');
  }

  function handleDownloadClick() {
    setModalIsOpen(!modalIsOpen);
    if (downloadMethod === 'download-current') {
      download_data(results);
    } else {
      if (downloadType === 'xlsx')
        window.open(
          'https://raw.githubusercontent.com/CivicDataLab/assam-tenders-data/main/data/ProcessedData/ocds-mapped-data/current/ocds_mapped_data.xlsx.zip'
        );
      else
        window.open(
          'https://raw.githubusercontent.com/CivicDataLab/assam-tenders-data/main/data/ProcessedData/ocds-mapped-data/current/ocds_mapped_data.json.zip'
        );
    }

    event({
      action: 'download',
      params: {
        method: downloadMethod,
      },
    });
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button
            id="modalTrigger"
            className="btn-primary"
            onClick={() => handleModalClick()}
          >
            <Download size={18} />
            Download
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] dialog dialog--download">
          <DialogHeader>
            <DialogTitle>Download Contracts</DialogTitle>
            <DialogDescription>
              Select your desired options to download the Contracts
            </DialogDescription>
          </DialogHeader>
          <section className="dialog__body">
            <fieldset
              onChange={(e: any) => {
                setDownloadType('json');
                setDownloadMethod(e.target.value);
              }}
            >
              <label htmlFor="download-current">
                <input
                  type="radio"
                  id="download-current"
                  name="download-option"
                  value="download-current"
                  defaultChecked
                />
                Download the contracts shown on this page
              </label>

              <label htmlFor="download-all">
                <input
                  type="radio"
                  id="download-all"
                  name="download-option"
                  value="download-all"
                />
                Download all Contracts
                <span className="text-xs ml-1 text-slate-600">(zipped)</span>
              </label>
            </fieldset>
            <div className="dialog__format">
              <p>Choose file format</p>
              <div>
                <fieldset
                  onChange={(e: any) => {
                    setDownloadType(e.target.value);
                  }}
                >
                  <label htmlFor="downloadFormat2">
                    <input
                      type="radio"
                      id="downloadFormat2"
                      name="dialog-download"
                      value="json"
                      defaultChecked
                      checked={downloadType === 'json'}
                    />
                    JSON File
                    {downloadMethod === 'download-all' ? (
                      <span>(~13.4MB)</span>
                    ) : null}
                  </label>

                  <label htmlFor="downloadFormat1">
                    <input
                      type="radio"
                      id="downloadFormat1"
                      name="dialog-download"
                      value="xlsx"
                      disabled={downloadMethod !== 'download-all'}
                      checked={downloadType === 'xlsx'}
                    />
                    XLSX File
                    {downloadMethod === 'download-all' ? (
                      <span>(~16.5MB)</span>
                    ) : null}
                    {downloadMethod !== 'download-all' ? (
                      <span className="text-xs">(Not supported)</span>
                    ) : null}
                  </label>
                </fieldset>
              </div>
            </div>
          </section>

          <DialogFooter className="flex justify-center">
            <button
              className="btn-primary dialog__submit"
              id="modalSubmit"
              onClick={() => handleDownloadClick()}
            >
              Download
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

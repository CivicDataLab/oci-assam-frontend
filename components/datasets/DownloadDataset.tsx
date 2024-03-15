import React from 'react';
import { event } from '../../utils/ga';
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
import { download_data } from 'utils/download_data';
import { toast } from 'sonner';

export const DownloadDataset = ({ filters }: { filters?: string | string[] }) => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [downloadType, setDownloadType] = React.useState<'json' | 'xlsx'>('json');
  const downloadMethod = filters?.length ? 'filtered' : 'all';

  async function handleDownloadClick() {
    setModalIsOpen(!modalIsOpen);
    if (downloadMethod === 'filtered') {
      toast.info('Fetching data, please wait...', {
        dismissible: false,
        id: 'fetching-data',
        duration: 60000,
      });

      const data = await fetch(`/api/datasets`, {
        method: 'POST',
        body: JSON.stringify({ filters }),
      }).then((res) => {
        return res.json();
      });

      download_data(data.data);
      toast.dismiss('fetching-data');
      toast.success('Downloaded started successfully!', {
        duration: 4000,
      });
    } else {
      toast.success('Downloaded started successfully!', {
        duration: 4000,
        closeButton: true,
      });
      window.open(
        `https://raw.githubusercontent.com/CivicDataLab/assam-tenders-data/main/data/ProcessedData/ocds-mapped-data/current/ocds_mapped_data.${downloadType}.zip`
      );
    }

    event({
      action: 'download',
      params: {
        method: downloadMethod,
        format: downloadType,
      },
    });
  }

  return (
    <div>
      <Dialog
        open={modalIsOpen}
        onOpenChange={(e) => {
          setModalIsOpen(e);
          setDownloadType('json');
        }}
      >
        <DialogTrigger className="btn-primary">
          <Download size={18} />
          Download
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] dialog dialog--download">
          <DialogHeader>
            <DialogTitle>Download Contracts</DialogTitle>
            <DialogDescription>
              {downloadMethod === 'all'
                ? 'Select format to download the contracts'
                : 'Download the filtered contracts in JSON format'}
            </DialogDescription>
          </DialogHeader>

          <section className="dialog__body">
            <div className="dialog__format">
              <p>Choose file format</p>
              <fieldset>
                <label htmlFor="download-json">
                  <input
                    type="radio"
                    id="download-json"
                    name="dialog-download"
                    value="json"
                    checked={downloadType === 'json'}
                    onChange={(e: any) => {
                      setDownloadType(e.target.value);
                    }}
                  />
                  JSON File
                  {downloadMethod === 'all' ? <span>(~23MB)</span> : null}
                </label>

                <label htmlFor="download-xlsx">
                  <input
                    type="radio"
                    id="download-xlsx"
                    name="dialog-download"
                    value="xlsx"
                    disabled={downloadMethod !== 'all'}
                    checked={downloadType === 'xlsx'}
                    onChange={(e: any) => {
                      setDownloadType(e.target.value);
                    }}
                  />
                  XLSX File
                  {downloadMethod === 'all' ? <span>(~16MB)</span> : null}
                  {downloadMethod !== 'all' ? (
                    <span className="text-xs">(Not supported)</span>
                  ) : null}
                </label>
              </fieldset>
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

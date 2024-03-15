import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'components/_shared/Dialog';
import { Download } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { downloadAsBlob } from 'utils/download_data';
import { event } from '../../utils/ga';

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

      const res = await fetch(`/api/datasets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filters }),
      });
      if (res.ok) {
        downloadAsBlob(res);
        toast.dismiss('fetching-data');
        toast.success('Downloaded started successfully!', {
          closeButton: true,
        });
      } else {
        console.error('Failed to download file');

        toast.dismiss('fetching-data');
        toast.error('Failed to download file', {
          closeButton: true,
        });
      }
    } else {
      toast.success('Downloaded started successfully!', {
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

          <div className="bg-blue-100 border-t border-b border-blue-500  px-4 py-3 rounded-sm">
            <p className="text-sm">
              Note: Download raw contracts data from{' '}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://drive.google.com/file/d/1jcw9GQqOGw3f08Tz113hCRYcXppRLPHe/view?usp=sharing"
              >
                this Drive Link
              </a>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

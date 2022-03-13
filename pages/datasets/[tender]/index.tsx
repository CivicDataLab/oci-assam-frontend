import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { fetchAPI, getDate } from 'utils/index';
import MegaHeader from 'components/_shared/MegaHeader';
import DList from 'components/_shared/DList';
import Modal from 'react-modal';
import { download_data } from 'utils/download_data';
Modal.setAppElement('#__next');

type Props = {
  data: any;
  documents: any;
};

const Tender: React.FC<Props> = ({ data, documents }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleButtonClick() {
    setModalIsOpen(!modalIsOpen);
  }

  const dataPackage = data.result;

  const headerData = {
    title: dataPackage.tender_title || dataPackage.name,
    content: dataPackage.organization.title,
    date: `${getDate(dataPackage.tender_bid_opening_date) || '--'} . ${
      dataPackage.fiscal_year || '--'
    }`,
    previousPage: 'Contracts Data',
    previousLink: '/datasets',
  };

  const basicContent = [
    {
      title: 'Open contracting ID',
      desc: dataPackage.ocid || '--',
    },
    {
      title: 'Tender ID',
      desc: dataPackage.tender_id || '--',
    },
    {
      title: 'Tender Title',
      desc: dataPackage.tender_title || '--',
    },
    {
      title: 'Tender description',
      desc: dataPackage.tender_title || '--',
    },
    {
      title: 'Organisation name',
      desc: dataPackage.organization.title,
    },
    {
      title: 'Tender amount',
      desc: `₹${
        dataPackage.tender_value_amount.replace(
          /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
          ','
        ) || '--'
      }`,
    },
    {
      title: 'External Reference',
      desc: dataPackage.tender_externalreference || '--',
    },
  ];

  const dateContent = [
    {
      title: 'Published Date',
      desc: getDate(dataPackage.tender_bid_opening_date) || '--',
    },
    {
      title: 'Tender Period Duration In Days',
      desc: dataPackage.tender_tenderperiod_durationindays || '--',
    },
    {
      title: 'Bid Opening Date',
      desc: getDate(dataPackage.tender_bid_opening_date) || '--',
    },
    {
      title: 'Tender Milestones',
      desc: getDate(dataPackage.tender_milestones_duedate) || '--',
    },
  ];

  const details = [
    {
      title: 'Tender Detail',
      desc: dataPackage.tender_title || '--',
    },
    {
      title: 'Tender Category',
      desc: dataPackage.tender_mainprocurementcategory || '--',
    },
    {
      title: 'Tender Type',
      desc: dataPackage.tender_procurementmethod || '--',
    },
    {
      title: 'Form of Contract',
      desc: dataPackage.tender_contracttype || '--',
    },
    {
      title: 'Product Category',
      desc: dataPackage.tenderclassification_description || '--',
    },
    {
      title: 'Two Stage Tender (Y/N)',
      desc: dataPackage.tender_allowtwostagetender || '--',
    },
    {
      title: 'Preferential Bidding Allowed',
      desc: dataPackage.tender_allowpreferentialbidder || '--',
    },
    {
      title: 'Payment Mode',
      desc: dataPackage.payment_mode || '--',
    },
    {
      title: 'Tender Status',
      desc: dataPackage.tender_status || '--',
    },
    {
      title: 'Tender Stage',
      desc: dataPackage.tender_stage || '--',
    },
    {
      title: 'No of Bids Received',
      desc: dataPackage.tender_numberoftenderers || '--',
    },
    {
      title: 'Tender Documents ID',
      desc: dataPackage.tender_documents_id || '--',
    },
  ];

  return (
    <>
      <Head>
        <title>OCI | {dataPackage.title || dataPackage.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="tender">
        <MegaHeader data={headerData} />
        <div className="page-wrap container">
          <section className="tender__heading">
            <h3 className="heading-w-line">Contract Details</h3>

            <button
              className="btn-primary"
              onClick={() => download_data([dataPackage])}
            >
              <svg
                width="10"
                height="12"
                viewBox="0 0 10 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.05967 4H6.99967V0.666667C6.99967 0.3 6.69967 0 6.33301 0H3.66634C3.29967 0 2.99967 0.3 2.99967 0.666667V4H1.93967C1.34634 4 1.04634 4.72 1.46634 5.14L4.52634 8.2C4.78634 8.46 5.20634 8.46 5.46634 8.2L8.52634 5.14C8.94634 4.72 8.65301 4 8.05967 4ZM0.333008 10.6667C0.333008 11.0333 0.633008 11.3333 0.999674 11.3333H8.99967C9.36634 11.3333 9.66634 11.0333 9.66634 10.6667C9.66634 10.3 9.36634 10 8.99967 10H0.999674C0.633008 10 0.333008 10.3 0.333008 10.6667Z"
                  fill="white"
                />
              </svg>
              Download
            </button>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={handleButtonClick}
              className="dialog"
              overlayClassName="dialog__backdrop"
              contentLabel="Download Tenders"
              aria={{
                labelledby: 'dialog-head',
                describedby: 'dialog-para',
              }}
              closeTimeoutMS={200}
              preventScroll={true}
              htmlOpenClassName="ReactModal__Html--open"
            >
              <section className="dialog__header">
                <div>
                  <h1 id="dialog-head">Download Tenders</h1>
                  <p id="dialog-para">
                    Select your desired option to download the tenders
                  </p>
                </div>
                <button
                  type="button"
                  className="dialog__close"
                  id="modalCancel"
                  aria-label="Close navigation"
                  onClick={handleButtonClick}
                >
                  &#x78;
                </button>
              </section>
              <section className="dialog__body">
                <div>
                  <label htmlFor="downloadOption1">
                    <input
                      type="radio"
                      id="downloadOption1"
                      name="dialog-option"
                      value="tender-only"
                    />
                    Download the details of this tender
                  </label>

                  <label htmlFor="downloadOption2">
                    <input
                      type="radio"
                      id="downloadOption2"
                      name="dialog-option"
                      value="all-details"
                    />
                    Download the details of this tender along with all the
                    attached documents
                  </label>
                </div>
                <div className="dialog__format">
                  <p>Choose file format</p>
                  <div>
                    <label htmlFor="downloadFormat1">
                      <input
                        type="radio"
                        id="downloadFormat1"
                        name="dialog-download"
                        value="csv"
                      />
                      CSV File
                    </label>

                    <label htmlFor="downloadFormat2">
                      <input
                        type="radio"
                        id="downloadFormat2"
                        name="dialog-download"
                        value="xls"
                      />
                      XLS File
                    </label>

                    <label htmlFor="downloadFormat3">
                      <input
                        type="radio"
                        id="downloadFormat3"
                        name="dialog-download"
                        value="pdf"
                      />
                      PDF File
                    </label>

                    <label htmlFor="downloadFormat4">
                      <input
                        type="radio"
                        id="downloadFormat4"
                        name="dialog-download"
                        value="zip"
                      />
                      ZIP File
                    </label>
                  </div>
                </div>
              </section>
              <button
                className="btn-primary dialog__submit"
                id="modalSubmit"
                onClick={handleButtonClick}
              >
                Download
              </button>
            </Modal>
          </section>

          <section className="tender__basic">
            <div>
              <h3 className="heading-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 24C15.1826 24 18.2348 22.7357 20.4853 20.4853C22.7357 18.2348 24 15.1826 24 12C24 8.8174 22.7357 5.76516 20.4853 3.51472C18.2348 1.26428 15.1826 0 12 0C8.8174 0 5.76516 1.26428 3.51472 3.51472C1.26428 5.76516 0 8.8174 0 12C0 15.1826 1.26428 18.2348 3.51472 20.4853C5.76516 22.7357 8.8174 24 12 24ZM13.395 9.882L11.895 16.9395C11.79 17.4495 11.9385 17.739 12.351 17.739C12.642 17.739 13.0815 17.634 13.38 17.37L13.248 17.994C12.8175 18.513 11.868 18.891 11.0505 18.891C9.996 18.891 9.5475 18.258 9.8385 16.9125L10.9455 11.7105C11.0415 11.271 10.9545 11.112 10.515 11.0055L9.8385 10.884L9.9615 10.3125L13.3965 9.882H13.395ZM12 8.25C11.6022 8.25 11.2206 8.09196 10.9393 7.81066C10.658 7.52936 10.5 7.14782 10.5 6.75C10.5 6.35218 10.658 5.97064 10.9393 5.68934C11.2206 5.40804 11.6022 5.25 12 5.25C12.3978 5.25 12.7794 5.40804 13.0607 5.68934C13.342 5.97064 13.5 6.35218 13.5 6.75C13.5 7.14782 13.342 7.52936 13.0607 7.81066C12.7794 8.09196 12.3978 8.25 12 8.25Z"
                    fill="black"
                  />
                </svg>
                Basic Info
              </h3>
              <DList content={basicContent} />
            </div>
            {/* uncomment next block to add a map on right side of basic section */}
            {/* <div className="tender__map">
              <h3 className="heading-3">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.15733 3.38543L4.50933 2.1681C4.10845 2.03458 3.68157 1.99823 3.26388 2.06205C2.84619 2.12587 2.44964 2.28804 2.10692 2.53519C1.7642 2.78233 1.48511 3.10738 1.29266 3.48355C1.10021 3.85971 0.999898 4.27623 1 4.69877V20.4094C0.999865 20.9693 1.17597 21.5151 1.50335 21.9693C1.83074 22.4235 2.29278 22.7632 2.824 22.9401L8.15733 24.7174C8.70434 24.8996 9.29566 24.8996 9.84267 24.7174L16.1573 22.6134C16.7043 22.4312 17.2957 22.4312 17.8427 22.6134L21.4907 23.8294C21.8917 23.963 22.3187 23.9993 22.7365 23.9354C23.1542 23.8715 23.5509 23.7093 23.8936 23.462C24.2364 23.2147 24.5154 22.8894 24.7078 22.5131C24.9002 22.1368 25.0003 21.7201 25 21.2974V5.5881C25.0002 5.02836 24.8243 4.48274 24.4972 4.02854C24.1701 3.57434 23.7083 3.23459 23.1773 3.05743L17.844 1.2801C17.2966 1.09761 16.7047 1.09761 16.1573 1.2801L9.84133 3.3841C9.29433 3.56629 8.70301 3.56629 8.156 3.3841L8.15733 3.38543Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 3.66667V25"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17 1V22.3333"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
                Map
              </h3>

              <figure className="tender__image">
                <Image
                  src="/assets/icons/assam.png"
                  width={450}
                  height={350}
                  layout="responsive"
                />
              </figure>
            </div> */}
          </section>

          {documents.length > 0 && (
            <section className="tender__docs">
              <h3 className="heading-3">
                <svg
                  width="21"
                  height="24"
                  viewBox="0 0 16 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.5 8.49477H4V9.49477H4.5V8.49477ZM11.5 9.49477H12V8.49477H11.5V9.49477ZM4.5 11.9286H4V12.9286H4.5V11.9286ZM11.5 12.9286H12V11.9286H11.5V12.9286ZM4.5 5.06843H4V6.06843H4.5V5.06843ZM11.5 6.06843H12V5.06843H11.5V6.06843ZM15 4.42857H15.5V4.21844L15.3499 4.07139L15 4.42857ZM11.5 1L11.8499 0.642821L11.7041 0.5H11.5V1ZM4.5 9.49477H11.5V8.49477H4.5V9.49477ZM4.5 12.9286H11.5V11.9286H4.5V12.9286ZM4.5 6.06843H11.5V5.06843H4.5V6.06843ZM13.8333 16.5H2.16667V17.5H13.8333V16.5ZM1.5 15.8571V2.14286H0.5V15.8571H1.5ZM14.5 4.42857V15.8571H15.5V4.42857H14.5ZM2.16667 1.5H11.5V0.5H2.16667V1.5ZM11.1501 1.35718L14.6501 4.78575L15.3499 4.07139L11.8499 0.642821L11.1501 1.35718ZM2.16667 16.5C1.78871 16.5 1.5 16.2025 1.5 15.8571H0.5C0.5 16.7741 1.25596 17.5 2.16667 17.5V16.5ZM13.8333 17.5C14.744 17.5 15.5 16.7741 15.5 15.8571H14.5C14.5 16.2025 14.2113 16.5 13.8333 16.5V17.5ZM1.5 2.14286C1.5 1.79749 1.78871 1.5 2.16667 1.5V0.5C1.25596 0.5 0.5 1.22586 0.5 2.14286H1.5Z"
                    fill="#333333"
                  />
                </svg>
                Documents
              </h3>
              <DList content={documents} />
            </section>
          )}

          <section className="tender__item">
            <h3 className="heading-3">
              <svg
                width="28"
                height="27"
                viewBox="0 0 28 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.57143 0V8.96552M21.4286 0V8.96552M5.64286 13.4483H11.2143M22.3571 13.4483H16.7857M5.64286 18.8276H11.2143M16.7857 18.8276H22.3571M2.85714 4.48276H25.1429C26.1685 4.48276 27 5.28556 27 6.27586V24.2069C27 25.1972 26.1685 26 25.1429 26H2.85714C1.83147 26 1 25.1972 1 24.2069V6.27586C1 5.28556 1.83147 4.48276 2.85714 4.48276Z"
                  stroke="black"
                  strokeWidth="2"
                />
              </svg>
              Important Dates
            </h3>
            <DList content={dateContent} />
          </section>

          <section className="tender__item">
            <h3 className="heading-3">
              <svg
                width="28"
                height="25"
                viewBox="0 0 28 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.15 0C2.31457 0 1.51335 0.370395 0.922614 1.0297C0.331874 1.68901 0 2.58322 0 3.51562V7.42188C0 8.35428 0.331874 9.24849 0.922614 9.9078C1.51335 10.5671 2.31457 10.9375 3.15 10.9375H6.65C7.48543 10.9375 8.28665 10.5671 8.87739 9.9078C9.46813 9.24849 9.8 8.35428 9.8 7.42188V3.51562C9.8 2.58322 9.46813 1.68901 8.87739 1.0297C8.28665 0.370395 7.48543 0 6.65 0H3.15ZM12.95 1.5625C12.6715 1.5625 12.4045 1.68596 12.2075 1.90573C12.0106 2.1255 11.9 2.42357 11.9 2.73438C11.9 3.04518 12.0106 3.34325 12.2075 3.56302C12.4045 3.78279 12.6715 3.90625 12.95 3.90625H26.95C27.2285 3.90625 27.4956 3.78279 27.6925 3.56302C27.8894 3.34325 28 3.04518 28 2.73438C28 2.42357 27.8894 2.1255 27.6925 1.90573C27.4956 1.68596 27.2285 1.5625 26.95 1.5625H12.95ZM12.95 6.25C12.6715 6.25 12.4045 6.37347 12.2075 6.59324C12.0106 6.813 11.9 7.11107 11.9 7.42188C11.9 7.73268 12.0106 8.03075 12.2075 8.25051C12.4045 8.47028 12.6715 8.59375 12.95 8.59375H22.75C23.0285 8.59375 23.2955 8.47028 23.4925 8.25051C23.6894 8.03075 23.8 7.73268 23.8 7.42188C23.8 7.11107 23.6894 6.813 23.4925 6.59324C23.2955 6.37347 23.0285 6.25 22.75 6.25H12.95ZM3.15 14.0625C2.31457 14.0625 1.51335 14.4329 0.922614 15.0922C0.331874 15.7515 0 16.6457 0 17.5781V21.4844C0 21.9461 0.0814772 22.4032 0.23978 22.8297C0.398082 23.2563 0.630109 23.6438 0.922614 23.9703C1.21512 24.2968 1.56237 24.5557 1.94455 24.7324C2.32672 24.9091 2.73634 25 3.15 25H6.65C7.06366 25 7.47328 24.9091 7.85545 24.7324C8.23763 24.5557 8.58488 24.2968 8.87739 23.9703C9.16989 23.6438 9.40192 23.2563 9.56022 22.8297C9.71852 22.4032 9.8 21.9461 9.8 21.4844V17.5781C9.8 16.6457 9.46813 15.7515 8.87739 15.0922C8.28665 14.4329 7.48543 14.0625 6.65 14.0625H3.15ZM12.95 15.625C12.6715 15.625 12.4045 15.7485 12.2075 15.9682C12.0106 16.188 11.9 16.4861 11.9 16.7969C11.9 17.1077 12.0106 17.4057 12.2075 17.6255C12.4045 17.8453 12.6715 17.9688 12.95 17.9688H26.95C27.2285 17.9688 27.4956 17.8453 27.6925 17.6255C27.8894 17.4057 28 17.1077 28 16.7969C28 16.4861 27.8894 16.188 27.6925 15.9682C27.4956 15.7485 27.2285 15.625 26.95 15.625H12.95ZM12.95 20.3125C12.6715 20.3125 12.4045 20.436 12.2075 20.6557C12.0106 20.8755 11.9 21.1736 11.9 21.4844C11.9 21.7952 12.0106 22.0932 12.2075 22.313C12.4045 22.5328 12.6715 22.6562 12.95 22.6562H22.75C23.0285 22.6562 23.2955 22.5328 23.4925 22.313C23.6894 22.0932 23.8 21.7952 23.8 21.4844C23.8 21.1736 23.6894 20.8755 23.4925 20.6557C23.2955 20.436 23.0285 20.3125 22.75 20.3125H12.95Z"
                  fill="black"
                />
              </svg>
              Tender detail 1
            </h3>
            <DList content={details} />
          </section>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetchAPI(context.query.tender);

  // fetching documents for document download section
  const documents = [];
  if (data.result.resources) {
    data.result.resources.forEach((resource: any) => {
      if (resource.res_type == 'docs') {
        const fileNameArray = resource.url.split('/');
        const fileName = fileNameArray[fileNameArray.length - 1];
        documents.push({
          title: resource.name,
          desc: [
            fileName || '--',
            `${(resource.size / 1024).toFixed(2)} KB` || '--',
            resource.format || '--',
            resource.url || '--',
            resource.url || '--',
          ],
        });
      }
    });
  }

  // const csv = await resourceGetter(data.dataset.result.resources, 'CSV');

  return {
    props: {
      data,
      ids: context.query.tender,
      documents,
    },
  };
};

export default Tender;

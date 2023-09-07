import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import MegaHeader from 'components/_shared/MegaHeader';
import Parser from 'rss-parser';
import StoriesCard from 'components/stories/StoriesCard';
import Modal from 'react-modal';

Modal.setAppElement('#__next');

const parser = new Parser();

const Stories = ({ data }) => {
  // const [modalIsOpen, setModalIsOpen] = useState(false);

  // function handleButtonClick() {
  //   setModalIsOpen(!modalIsOpen);
  // }
  const headerData = {
    title: 'Data Stories',
    content:
      'This page contains different researches, case studies, explainers and other public resources using  procurement data.',
  };
  return (
    <>
      <Head>
        <title>OCI - Assam | Stories</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="stories">
        <MegaHeader data={headerData} />

        <div className="container">
          {data.items.length > 0 && (
            <>
              <StoriesCard data={data.items[0]} length={700} />
              <section className="stories__team">
                <div className="stories__header">
                  <h3 className="heading-w-line">Stories from our team</h3>
                  {/* <button
                    type="button"
                    className="btn-primary"
                    onClick={handleButtonClick}
                  >
                    Submit Article for Review
                  </button>
                  <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={handleButtonClick}
                    className="dialog dialog--small"
                    overlayClassName="dialog__backdrop"
                    contentLabel="Download Tenders"
                    aria={{
                      labelledby: 'dialog-head',
                      describedby: 'dialog-para',
                    }}
                    preventScroll={true}
                    htmlOpenClassName="ReactModal__Html--open"
                  >
                    <section className="dialog__header dialog__header--small">
                      <div>
                        <h1 id="dialog-head">Submit your article</h1>
                        <p id="dialog-para">
                          Link your article from medium by pasting the link in
                          the tab
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
                      <label htmlFor="urlInput">
                        <h2>URL</h2>
                      </label>
                      <input
                        type="url"
                        id="urlInput"
                        name="dialog-option"
                        placeholder="https://example.medium.com/article1"
                      />
                    </section>
                    <button
                      className="btn-primary dialog__submit"
                      id="modalSubmit"
                      onClick={handleButtonClick}
                    >
                      Submit Article for Review
                    </button>
                  </Modal> */}
                </div>
                <div className="stories__wrapper">
                  {data.items.map((story, index) => {
                    if (index == 0) return;
                    return (
                      <StoriesCard
                        key={`story-${index}`}
                        data={story}
                        length={125}
                      />
                    );
                  })}
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({res}) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=59'
  );

  const data = await fetch(
    'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/civicdatalab/tagged/open-contracting'
  ).then((res) => res.json());

  return {
    props: {
      data ,
    },
  };
};

export default Stories;

const Modal = () => {
  function createDialog() {
    return `
        <section class="dialog__header">
        <div>
        <h1 id="dialog-head-123">Download Tenders</h1>
          <p id="dialog-para-123">
            Select your desired option to download the tenders
          </p>
        </div>
        <button
        type="button"
        class="dialog__close"
        id="modalCancel"
        aria-label="Close navigation"
      >
        &#x78;
      </button>
        </section>
        <section class="dialog__options">
          
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

            Download the details of this tender along with all the attached
            documents
          </label>
        </section>
        <section class="dialog__format">
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
          
          <label htmlFor="downloadFormat1">
          <input
            type="radio"
            id="downloadFormat2"
            name="dialog-download"
            value="xls"
          />
          XLS File
          </label>
          
          <label htmlFor="downloadFormat1">
          <input
            type="radio"
            id="downloadFormat3"
            name="dialog-download"
            value="pdf"
          />
          PDF File
          </label>
          
          <label htmlFor="downloadFormat1">
          <input
            type="radio"
            id="downloadFormat4"
            name="dialog-download"
            value="zip"
          />
          ZIP File
          </label>
          </div>
        </section>
        <button class="button-primary dialog__submit" id="modalSubmit">Download</button>
      `;
  }

  const dialogElm = document.createElement('div');
  dialogElm.setAttribute('role', 'dialog');
  dialogElm.setAttribute('aria-labelledby', `dialog-head-123`);
  dialogElm.setAttribute('aria-describedby', `dialog-para-123`);
  dialogElm.setAttribute('tabIndex', `-1`);
  dialogElm.setAttribute('class', `dialog`);

  const dialogBackdrop = document.createElement('div');
  dialogBackdrop.setAttribute('class', `dialog__backdrop`);

  const dialog = createDialog();
  dialogElm.innerHTML = dialog;

  function closeModal() {
    document
      .getElementById('modalSubmit')
      .removeEventListener('click', closeModal);
    document
      .getElementById('modalCancel')
      .removeEventListener('click', closeModal);

    document.querySelector('body').classList.remove('scroll-stop');

    dialogElm.remove();
    dialogBackdrop.remove();
    const elems = document.getElementById('__next');
    elems.removeAttribute('inert');
    setTimeout(function () {
      document.getElementById('modalTrigger').focus();
    }, 250);
  }

  function openModal() {
    document.body.appendChild(dialogBackdrop);

    document.body.appendChild(dialogElm);
    const elems = document.getElementById('__next');
    elems.setAttribute('inert', '');
    document.querySelector('body').classList.add('scroll-stop');

    dialogElm.focus();

    document
      .getElementById('modalSubmit')
      .addEventListener('click', closeModal);
    document
      .getElementById('modalCancel')
      .addEventListener('click', closeModal);
    dialogElm.addEventListener('keydown', (e) => {
      if (e.key == 'Escape') {
        e.preventDefault();
        closeModal();
      }
    });
  }

  openModal();

  return (
    <>
      <section className="dialog__header">
        <div>
          <h1 id="dialog-head-123">Download Tenders</h1>
          <p id="dialog-para-123">
            Select your desired option to download the tenders
          </p>
        </div>
        <button
          type="button"
          className="dialog__close"
          id="modalCancel"
          aria-label="Close navigation"
        >
          &#x78;
        </button>
      </section>
      <section className="dialog__options">
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
          Download the details of this tender along with all the attached
          documents
        </label>
      </section>
      <section className="dialog__format">
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

          <label htmlFor="downloadFormat1">
            <input
              type="radio"
              id="downloadFormat2"
              name="dialog-download"
              value="xls"
            />
            XLS File
          </label>

          <label htmlFor="downloadFormat1">
            <input
              type="radio"
              id="downloadFormat3"
              name="dialog-download"
              value="pdf"
            />
            PDF File
          </label>

          <label htmlFor="downloadFormat1">
            <input
              type="radio"
              id="downloadFormat4"
              name="dialog-download"
              value="zip"
            />
            ZIP File
          </label>
        </div>
      </section>
      <button className="button-primary dialog__submit" id="modalSubmit">
        Download
      </button>
    </>
  );
};

export default Modal;

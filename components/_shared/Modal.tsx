const Modal = () => {
  function createDialog() {
    return `
        <section class="dialog__header">
          <h1 id="dialog-head-123">Download Tenders</h1>
          <p id="dialog-para-123">
            Select your desired option to download the tenders
          </p>
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
      `;
  }

  const dialogElm = document.createElement('div');
  dialogElm.setAttribute('role', 'dialog');
  dialogElm.setAttribute('aria-labelledby', `dialog-head-123`);
  dialogElm.setAttribute('aria-describedby', `dialog-para-123`);
  dialogElm.setAttribute('class', `dialog`);

  const dialog = createDialog();
  dialogElm.innerHTML = dialog;
  document.body.appendChild(dialogElm);

  const elems = document.getElementById('__next');
  elems.setAttribute('inert', '');

  // return (
  //   <div
  //     role="dialog"
  //     aria-labelledby="dialog-head-123"
  //     aria-describedby="dialog-para-123"
  //   >
  //     <section className="dialog__header">
  //       <h1 id="dialog-head-123">Download Tenders</h1>
  //       <p id="dialog-para-123">
  //         Select your desired option to download the tenders
  //       </p>
  //     </section>
  //     <section className="dialog__options">
  //       <input
  //         type="radio"
  //         id="downloadOption1"
  //         name="dialog-option"
  //         value="tender-only"
  //       />
  //       <label htmlFor="downloadOption1">
  //         Download the details of this tender
  //       </label>

  //       <input
  //         type="radio"
  //         id="downloadOption2"
  //         name="dialog-option"
  //         value="all-details"
  //       />
  //       <label htmlFor="downloadOption2">
  //         Download the details of this tender along with all the attached
  //         documents
  //       </label>
  //     </section>
  //     <section className="dialog__format">
  //       <input
  //         type="radio"
  //         id="downloadFormat1"
  //         name="dialog-download"
  //         value="csv"
  //       />
  //       <label htmlFor="downloadFormat1">CSV File</label>
  //       <input
  //         type="radio"
  //         id="downloadFormat2"
  //         name="dialog-download"
  //         value="xls"
  //       />
  //       <label htmlFor="downloadFormat1">XLS File</label>
  //       <input
  //         type="radio"
  //         id="downloadFormat3"
  //         name="dialog-download"
  //         value="pdf"
  //       />
  //       <label htmlFor="downloadFormat1">PDF File</label>
  //       <input
  //         type="radio"
  //         id="downloadFormat4"
  //         name="dialog-download"
  //         value="zip"
  //       />
  //       <label htmlFor="downloadFormat1">ZIP File</label>
  //     </section>
  //   </div>
  // );
};

export default Modal;

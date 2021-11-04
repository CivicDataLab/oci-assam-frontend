const DList = ({ content }) => {
  function hideToggle(liveRegion: any, toggletip: any) {
    liveRegion.innerHTML = '';
    toggletip.setAttribute('aria-pressed', 'false');
  }

  function handleToggleClick(e: any) {
    const toggletip = e.target;
    toggletip.setAttribute('aria-pressed', 'true');
    const message = toggletip.getAttribute('data-toggletip-content');
    const liveRegion = toggletip.nextElementSibling;

    liveRegion.innerHTML = '';
    window.setTimeout(function () {
      liveRegion.innerHTML = `
      <span class="toggletip-bubble">${message}</span>
      `;
    }, 100);

    // close on outside click
    document.addEventListener('click', function handler(e: any) {
      toggletip.setAttribute('aria-pressed', 'true');
      if (toggletip != e.target) {
        hideToggle(liveRegion, toggletip);
        this.removeEventListener('click', handler);
      }
    });

    // close on blur
    toggletip.addEventListener('blur', function handler() {
      hideToggle(liveRegion, toggletip);
      this.removeEventListener('click', handler);
    });

    // close on ESC click
    toggletip.addEventListener('keydown', function handler(e: any) {
      if ((e.keyCode || e.which) === 27) {
        hideToggle(liveRegion, toggletip);
        this.removeEventListener('click', handler);
      }
    });
  }
  return (
    <dl className="dlist">
      {content.map((value: any, index: number) => {
        return (
          <div
            key={index}
            className={typeof value.desc != 'string' ? 'dlist__multiple' : ''}
          >
            <dt className="dlist__title">
              <span>{value.title}</span>
              {value.tooltip && (
                <span className="dlist__toggletip">
                  <button
                    type="button"
                    data-toggletip-content="Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit ametLorem ipsum dolor sit amet Lorem ipsum."
                    onClick={handleToggleClick}
                    aria-pressed="false"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      fill="none"
                      viewBox="0 0 12 12"
                      aria-hidden="true"
                    >
                      <path
                        fill="#045105"
                        d="M6 0a6 6 0 1 0 0 12A6 6 0 0 0 6 0Zm.6 9H5.4V5.4h1.2V9Zm0-4.8H5.4V3h1.2v1.2Z"
                      />
                    </svg>
                    <span className="sr-only">More info</span>
                  </button>
                  <span role="status"></span>
                </span>
              )}
            </dt>
            {typeof value.desc != 'string' ? (
              <div className="tender__documents">
                <dd className="dlist__desc">{value.desc[0]}</dd>
                <dd className="dlist__desc">{value.desc[1]}</dd>
                <dd className="dlist__desc">{value.desc[2]}</dd>
                <dd className="dlist__desc">
                  <a className="dlist__view" href={value.desc[3]}>
                    {index == value.length - 1 ? '' : 'View file'}
                  </a>
                </dd>
                <dd className="dlist__desc">
                  <a className="button-primary" href={value.desc[4]}>
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
                  </a>
                </dd>
              </div>
            ) : (
              <dd className="dlist__desc">{value.desc}</dd>
            )}
          </div>
        );
      })}
    </dl>
  );
};

export default DList;

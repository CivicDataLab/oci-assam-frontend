import Link from 'next/link';
import Image from 'next/image';
import ocpLogo from '/public/assets/images/ocp-full.png';
import cdlLogo from '/public/assets/images/cdl.png';

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer__logo">
            <Image
              src={cdlLogo}
              width={165}
              height={165}
              alt="civicdatalab logo"
              placeholder="blur"
            />
            <Image
              src={ocpLogo}
              width={193}
              height={66}
              alt="open contracting logo"
              placeholder="blur"
            />
          </div>
          <section className="footer__pages">
            <h2>Other pages</h2>
            <ul>
              <li>
                <Link href="/datasets">
                  <a>Contracts Data</a>
                </Link>
              </li>
              <li>
                <Link href="/analysis">
                  <a>Data Analysis</a>
                </Link>
              </li>
              <li>
                <Link href="/stories">
                  <a>Data Stories</a>
                </Link>
              </li>
              <li>
                <Link href="/datasets">
                  <a>About Us</a>
                </Link>
              </li>
            </ul>
          </section>
          <section className="footer__contact">
            <h2>Write to us</h2>
            <a className="footer__mail" href="mailto:info@civicdatalab.in">
              info@civicdatalab.in
            </a>

            <div className="footer__connect">
              <h2>Connect with us</h2>
              <div>
                <a
                  href="https://twitter.com/civicdatalab"
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="sr-only">Twitter Page</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="none"
                    viewBox="0 0 30 30"
                  >
                    <circle cx="15" cy="15" r="15" fill="#fff" />
                    <g clipPath="url(#a)">
                      <path
                        fill="#076775"
                        d="M23.08 9.95c-.6.27-1.25.45-1.9.53a3.34 3.34 0 0 0 1.46-1.84c-.66.38-1.37.66-2.12.8a3.33 3.33 0 0 0-5.66 3.04A9.44 9.44 0 0 1 8 9a3.32 3.32 0 0 0 1.03 4.44 3.32 3.32 0 0 1-1.5-.41v.04a3.33 3.33 0 0 0 2.66 3.26c-.49.13-1 .15-1.5.06a3.33 3.33 0 0 0 3.1 2.3 6.68 6.68 0 0 1-4.92 1.39c1.52.97 3.3 1.5 5.1 1.5 6.12 0 9.46-5.08 9.46-9.47v-.43a6.76 6.76 0 0 0 1.65-1.73Z"
                      />
                    </g>
                    <defs>
                      <clipPath id="a">
                        <path
                          fill="#fff"
                          d="M0 0h19.09v19.09H0z"
                          transform="translate(5.45 5.45)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
                <a
                  href="https://in.linkedin.com/company/civicdatalab"
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="sr-only">Linkedin Page</span>

                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="15" cy="15" r="15" fill="white" />
                    <g clipPath="url(#clip0_787:876)">
                      <path
                        d="M20.0392 20.0423H17.9193V16.7197C17.9193 15.9274 17.9034 14.9076 16.8136 14.9076C15.7087 14.9076 15.5401 15.7699 15.5401 16.6616V20.0423H13.4194V13.2101H15.4558V14.1408H15.4836C15.7684 13.6047 16.4604 13.0375 17.4945 13.0375C19.6422 13.0375 20.04 14.4518 20.04 16.2917V20.0423H20.0392ZM11.0251 12.2755C10.8633 12.2757 10.703 12.244 10.5534 12.1821C10.4039 12.1202 10.268 12.0295 10.1536 11.915C10.0392 11.8005 9.94856 11.6646 9.8868 11.515C9.82504 11.3655 9.79341 11.2052 9.79372 11.0433C9.79388 10.7998 9.86625 10.5618 10.0017 10.3593C10.1371 10.1569 10.3295 9.99923 10.5546 9.90618C10.7797 9.81313 11.0273 9.7889 11.2661 9.83657C11.5049 9.88423 11.7243 10.0017 11.8964 10.174C12.0685 10.3463 12.1856 10.5658 12.2329 10.8047C12.2803 11.0436 12.2558 11.2911 12.1624 11.5161C12.0691 11.741 11.9111 11.9332 11.7085 12.0684C11.5059 12.2036 11.2678 12.2756 11.0243 12.2755H11.0251ZM12.0878 20.0423H9.96156V13.2101H12.0886V20.0423H12.0878ZM21.1011 7.84082H8.89804C8.31259 7.84082 7.84088 8.30218 7.84088 8.87252V21.1273C7.84088 21.6976 8.31338 22.159 8.89725 22.159H21.0979C21.6818 22.159 22.1591 21.6976 22.1591 21.1273V8.87252C22.1591 8.30218 21.6818 7.84082 21.0979 7.84082H21.1003H21.1011Z"
                        fill="#076775"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_787:876">
                        <rect
                          width="19.0909"
                          height="19.0909"
                          fill="white"
                          transform="translate(5.45453 5.4541)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
                <a
                  href="https://github.com/CivicDataLab"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="sr-only">Github Page</span>

                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="15" cy="15" r="15" fill="white" />
                    <path
                      d="M15 5.4541C9.72612 5.4541 5.45453 9.83384 5.45453 15.2412C5.45345 17.2958 6.0834 19.2986 7.25501 20.9654C8.42662 22.6322 10.0804 23.8785 11.9817 24.5273C12.459 24.6124 12.6375 24.3188 12.6375 24.0614C12.6375 23.8294 12.6251 23.0592 12.6251 22.239C10.2273 22.6922 9.6068 21.6401 9.41589 21.0891C9.30803 20.8072 8.84317 19.9391 8.43748 19.7061C8.10339 19.5231 7.62612 19.07 8.42508 19.0582C9.17726 19.0455 9.71371 19.7678 9.89317 20.0614C10.7523 21.5412 12.1249 21.1253 12.6728 20.8688C12.7568 20.2327 13.0069 19.805 13.2818 19.5603C11.1579 19.3156 8.93862 18.471 8.93862 14.7274C8.93862 13.6626 9.30803 12.7827 9.91703 12.0966C9.82158 11.852 9.48748 10.8488 10.0125 9.50304C10.0125 9.50304 10.8114 9.24662 12.6375 10.5072C13.4145 10.2861 14.2174 10.1748 15.0238 10.1764C15.8352 10.1764 16.6466 10.286 17.4102 10.5062C19.2353 9.23389 20.0352 9.50402 20.0352 9.50402C20.5602 10.8497 20.2261 11.8529 20.1307 12.0976C20.7387 12.7827 21.1091 13.6508 21.1091 14.7274C21.1091 18.4837 18.8783 19.3156 16.7544 19.5603C17.1 19.8657 17.3988 20.4529 17.3988 21.3709C17.3988 22.6795 17.3863 23.7316 17.3863 24.0624C17.3863 24.3188 17.5658 24.6242 18.0431 24.5263C19.9379 23.8704 21.5844 22.6217 22.7508 20.9561C23.9172 19.2905 24.5449 17.2918 24.5454 15.2412C24.5454 9.83384 20.2738 5.4541 15 5.4541Z"
                      fill="#076775"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </section>
        </div>
      </footer>
    </>
  );
};

export default Footer;

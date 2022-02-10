import React from 'react';
import Head from 'next/head';
import MegaHeader from 'components/_shared/MegaHeader';
import PartnerCard from 'components/about/PartnerCard';
import TeamCard from 'components/about/TeamCard';

const headerData = {
  title: 'The Team',
  content: 'Meet the team behind Open Contracting India initiative.',
};

const partners = [
  {
    name: 'CivicDataLab',
    img: '/assets/images/cdl.png',
    desc: [
      'We are a research lab working at the intersection of data, tech, design and social science to strengthen the course of civic engagements in India.',
      'We work to harness the potential of open knowledge movements and better enable citizens to engage in matters of public reform.',
      'We aim to grow data and tech literacy of governments, non-profits, think-tanks, media houses, universities, and more to enable data-driven decision making at scale.',
    ],
    url: 'https://civicdatalab.in/',
    email: 'info@civicdatalab.in',
    github: '/',
    linkedin: '/',
    twitter: '/',
    class: 'partners--dark-img',
  },
  {
    name: 'Open Contracting Partnership',
    img: '/assets/images/ocp.png',
    desc: [
      'The Open Contracting Partnership is an independent non-profit public charity 501(c)(3) working in over 50 countries.',
      'We are a silo-busting collaboration across governments, businesses, civil society, and technologists to open up and transform government contracting worldwide. Bringing open data and open government together, we make sure public money is spent openly, fairly and effectively on public contracts, the single biggest item of spending by most governments. They are a government’s number one corruption risk and they are vital to make sure citizens get the services that they deserve.',
    ],
    url: 'https://www.open-contracting.org/',
    email: 'info@civicdatalab.in',
    github: '/',
    linkedin: '/',
    twitter: '/',
    class: 'partners--dark-img',
  },
];

const team = [
  {
    name: 'Gaurav Godhwani',
    title: 'Lead',
    org: 'CivicDataLab',
    image: '/assets/images/contributors/gaurav.jpg',
    github: 'https://github.com/gggodhwani',
    linkedin: 'https://www.linkedin.com/in/gggodhwani',
    twitter: 'https://twitter.com/gggodhwani',
  },
  {
    name: 'Gavin Hayman',
    title: 'Executive Director',
    org: 'Open Contracting Partnership',
    image: '/assets/images/contributors/gavin.avif',
    twitter: 'https://twitter.com/gavinhayman_gw',
  },
  {
    name: 'Bernadine Fernz',
    title: 'Head of Infrastructure',
    org: 'Open Contracting Partnership',
    image: '/assets/images/contributors/bernadine.avif',
    linkedin: 'https://www.linkedin.com/in/bernadine-fernz-5309a12/',
    twitter: 'https://twitter.com/nadinefernz',
  },
  {
    name: 'Nanda Sihombing',
    title: 'Senior Program Manager for Asia',
    org: 'Open Contracting Partnership',
    image: '/assets/images/contributors/nanda.avif',
    linkedin: 'https://www.linkedin.com/in/nandasihombing/',
    twitter: 'https://twitter.com/sihombingnanda',
  },
  {
    name: 'Kabeer',
    title: 'Project Lead',
    org: 'CivicDataLab',
    image: '/assets/images/contributors/kabeer.jpg',
    github: 'https://github.com/Kabeer3',
    linkedin: 'https://www.linkedin.com/in/kabeer-arora-69827661/',
    twitter: 'https://twitter.com/kabeer3391',
  },
  {
    name: 'Shreya Agrawal',
    title: 'Data Engineer',
    org: 'CivicDataLab',
    image: '/assets/images/contributors/shreya.jpg',
    github: 'https://github.com/shreyaagrawal0809',
    linkedin: 'https://github.com/shreyaagrawal0809',
    twitter: 'https://twitter.com/shreya_0809',
  },
  {
    name: 'Abhinav',
    title: 'Backend Engineer',
    org: 'CivicDataLab',
    image: '/assets/images/contributors/abhinav.jpg',
    github: 'https://github.com/Abhi2102',
  },
  {
    name: 'Shoaib Ahmed',
    title: 'Frontend Engineer',
    org: 'CivicDataLab',
    image: '/assets/images/contributors/shoaib.jpg',
    github: 'https://github.com/pixeledcode',
    linkedin: 'https://www.linkedin.com/in/pixeledcode',
    twitter: 'https://twitter.com/PixeledCode',
  },
  {
    name: 'Upasana Hembram',
    title: 'Partner',
    org: 'CivicDataLab',
    image: '/assets/images/contributors/upasana.jpg',
    linkedin: 'https://www.linkedin.com/in/upasana-hembram/',
    twitter: 'https://twitter.com/watzernehm',
  },
  {
    name: 'Preethi Govindarajan',
    title: 'Partner',
    org: 'CivicDataLab',
    image: '/assets/images/contributors/preethi.jpg',
    github: 'https://github.com/preethical',
    linkedin: 'https://www.linkedin.com/in/preethi-g-95814b60/',
    twitter: 'https://twitter.com/preethical',
  },
];

const About = () => {
  return (
    <>
      <Head>
        <title>OCI - Assam | About Us</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="about">
        <MegaHeader data={headerData} />

        <div className="container">
          <section className="about__partners">
            <h3 className="sr-only">Partners</h3>
            <ul className="partners">
              {partners.map((item, key) => {
                return (
                  <li key={`partners-${key}`}>
                    <PartnerCard card={item} />
                  </li>
                );
              })}
            </ul>
          </section>
          <section className="about__team">
            <h3>
              <span /> members
            </h3>
            <p>Meet the doers &amp; builders</p>

            <ul>
              {team.map((item, key) => {
                return (
                  <li key={`team-${key}`}>
                    <TeamCard card={item} num={key} />
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
};

export default About;

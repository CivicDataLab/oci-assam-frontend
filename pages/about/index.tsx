import React from 'react';
import Head from 'next/head';
import MegaHeader from 'components/_shared/MegaHeader';
import PartnerCard from 'components/about/PartnerCard';
import TeamCard from 'components/about/TeamCard';

const headerData = {
  title: 'The Team',
  content:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
};

const partners = [
  {
    name: 'CivicDataLab',
    title: 'Technology Partner',
    img: '/assets/images/cdl.png',
    desc: [
      'We are a research lab working at the intersection of data, tech, design and social science to strengthen the course of civic engagements in India.',
      'We work to harness the potential of open knowledge movements and better enable citizens to engage in matters of public reform.',
      'We aim to grow data and tech literacy of governments, non-profits, think-tanks, media houses, universities, and more to enable data-driven decision making at scale.',
    ],
    email: 'info@civicdatalab.in',
    github: '/',
    linkedin: '/',
    twitter: '/',
    class: 'partners--dark-img',
  },
  {
    name: 'Open Contracting Partnership',
    title: 'Platform Owner',
    img: '/assets/images/ocp.png',
    desc: [
      'The Open Contracting Partnership is an independent non-profit public charity 501(c)(3) working in over 50 countries.',
      'We are a silo-busting collaboration across governments, businesses, civil society, and technologists to open up and transform government contracting worldwide. Bringing open data and open government together, we make sure public money is spent openly, fairly and effectively on public contracts, the single biggest item of spending by most governments. They are a government’s number one corruption risk and they are vital to make sure citizens get the services that they deserve.',
    ],
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
    image: '/images/contributors/gaurav.jpg',
    github: 'https://github.com/gggodhwani',
    linkedin: 'https://www.linkedin.com/in/gggodhwani',
    twitter: 'https://twitter.com/gggodhwani',
  },
  {
    name: 'Bernadine Fernz',
    title: 'Head of Infrastructure',
  },
  {
    name: 'Rutwik Phatak',
    title: 'Partner',
  },
  {
    name: 'Kabeer',
    title: 'Project Lead',
    image: '/images/contributors/kabeer.jpg',
    github: 'https://github.com/Kabeer3',
    linkedin: 'https://www.linkedin.com/in/kabeer-arora-69827661/',
    twitter: 'https://twitter.com/kabeer3391',
  },
  {
    name: 'Shreya Agrawal',
    title: 'Data Engineer',
    image: '/images/contributors/shreya.jpg',
    github: 'https://github.com/shreyaagrawal0809',
    linkedin: 'https://github.com/shreyaagrawal0809',
    twitter: 'https://twitter.com/shreya_0809',
  },
  {
    name: 'Abhinav',
    title: 'Backend Engineer',
    image: '/images/contributors/abhinav.jpg',
    github: 'https://github.com/Abhi2102',
  },
  {
    name: 'Shoaib Ahmed',
    title: 'Frontend Engineer',
    image: '/images/contributors/shoaib.jpg',
    github: 'https://github.com/pixeledcode',
    linkedin: 'https://www.linkedin.com/in/pixeledcode',
    twitter: 'https://twitter.com/PixeledCode',
  },
  {
    name: 'Preethi G',
    title: 'Partner',
  },
  {
    name: 'Upasana',
    title: 'Partner',
  },
  {
    name: 'Nanda',
    title: 'Partner',
  },
  {
    name: 'Gavin',
    title: 'Partner',
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

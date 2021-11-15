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
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
    email: 'info@civicdatalab.in',
    github: '/',
    linkedin: '/',
    twitter: '/',
    class: 'partners--dark-img',
  },
  {
    name: 'OCP',
    title: 'Platform Owner',
    img: '/assets/images/ocp.png',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
    email: 'info@civicdatalab.in',
    github: '/',
    linkedin: '/',
    twitter: '/',
    class: 'partners--dark-img',
  },
];

const team = [
  {
    name: 'Bessie Cooper',
    title: 'UI/UX Designer',
    github: '/',
    linkedin: '/',
    twitter: '/',
  },
  {
    name: 'Ralph Edwards',
    title: 'Frontend Engineer',
    github: '/',
    linkedin: '/',
    twitter: '/',
  },
  {
    name: 'Ronald Richards',
    title: 'Backend Engineer',
    github: '/',
    linkedin: '/',
    twitter: '/',
  },
  {
    name: 'Eleanor Pena',
    title: 'Data Engineer',
    github: '/',
    linkedin: '/',
    twitter: '/',
  },
  {
    name: 'Jenny Wilson',
    title: 'Researcher',
    github: '/',
    linkedin: '/',
    twitter: '/',
  },
  {
    name: 'Courtney Henry',
    title: 'Project Manager',
    github: '/',
    linkedin: '/',
    twitter: '/',
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

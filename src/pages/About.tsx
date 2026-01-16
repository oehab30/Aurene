import React from 'react';
import AboutHero from '../components/about/AboutHero';
import AboutHeritage from '../components/about/AboutHeritage';
import AboutStats from '../components/about/AboutStats';
import AboutMaterials from '../components/about/AboutMaterials';
import AboutVision from '../components/about/AboutVision';

const About = () => {
  return (
    <div className="bg-white dark:bg-[#0a0a0a] transition-colors duration-500 overflow-hidden">
      <AboutHero />
      <AboutHeritage />
      <AboutStats />
      <AboutMaterials />
      <AboutVision />
    </div>
  );
};

export default About;

import React from 'react';

export const Hero: React.FC = () => (
  <div className="hero">
    <div className="container">
          <div className="first-col">
            <h2>Hotel, car &amp; experiences</h2>
            <span className="text-base md:text-lg text-neutral-500 dark:text-neutral-400">Accompanying us, you have a trip full of experiences. With Chisfis, booking accommodation, resort villas, hotels</span>
            <button className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">Start your search</button>
          </div>
          <div className="second-col">
            <img className="w-full" src="/hero-right.ee78c0ffae92062cbe4e.png" alt="hero" />
          </div>
    </div>
  </div>
);

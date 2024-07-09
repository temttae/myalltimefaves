import { useEffect, useState } from "react";
import { getCollection } from "astro:content";
import { FilterTabs } from "./FilterTabs";
import { FilmGallery } from "./FilmGallery";
import { CarouselWrapper } from "./CarouselWrapper";

import './carousel.css';

// import film posters
import aftersun from '../assets/posters/aftersun2022.jpg';
import diehard from '../assets/posters/diehard1988.jpg';
import goodwillhunting from '../assets/posters/goodwillhunting1997.jpg';

export const FilmDisplay = () => {
  const posters = {
    'aftersun': aftersun,
    'die-hard': diehard,
    'good-will-hunting': goodwillhunting,
  }

  const [activeTab, setActiveTab] = useState('All');
  const [films, setFilms] = useState([]);

  const filterFilms = async (tab) => {
    var filmCollection;
    if (tab == 'All') {
      filmCollection = await getCollection('film');
    } else {
      const minYear = parseInt(tab.substring(0, 4));
      const maxYear = minYear + 10;
      filmCollection = await getCollection('film', ({ data }) => {
        return data[0].year >= minYear && data[0].year < maxYear;
      })
    }
    
    setFilms(filmCollection);
  }

  useEffect(() => {
    filterFilms(activeTab);
  }, [activeTab]);

  return (
    <div className="text-white">
      <FilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab == 'All' ? (
        <CarouselWrapper films={films} posters={posters} />
      ) : (
        <FilmGallery films={films} posters={posters} />
      )}
    </div>
  )
}

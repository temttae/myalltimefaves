import { useEffect, useState } from "react";
import { getCollection } from "astro:content";

import aftersun from '../assets/posters/aftersun2022.jpg';
import goodwillhunting from '../assets/posters/goodwillhunting1997.jpg';

const FilterTabs = (props) => {
  const { activeTab, setActiveTab } = props;
  const tabList = ['All', '1970s', '1980s', '1990s', '2000s', '2010s', '2020 - 24'];

  return (
    <div className="flex justify-center">
      <ul className="flex flex-wrap justify-center mb-16">
        {
          tabList.map((tab) => {
            return (
              <li
                key={tab}
                className={`${activeTab === tab && 'bg-white text-black'} px-4 py-2 cursor-pointer`}
                onClick={() => setActiveTab(tab)}>
                  {tab}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

const FilmGallery = (props) => {
  const { films } = props;

  const images = {
    'aftersun': aftersun,
    'good-will-hunting': goodwillhunting,
  }

  return (
    <>
      {films.length == 0 ? (
        <p className="text-center italic">No films from this decade yet!</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {films.map(film => {
            return (
              <a href={`/film/${film.data[0].slug}`} key={film.id}>
                <div className="text-center">
                  <div className="mb-4">
                    <img src={images[film.data[0].slug].src} className="w-full h-auto object-contain block" />
                  </div>
                  <a>{film.data[0].title} ({film.data[0].year})</a>
                </div>
              </a>
            )
          })}
        </div>
      )}
    </>
  )
}

export default function FilmDisplay() {
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
      <FilmGallery films={films} />
    </div>
  )
}

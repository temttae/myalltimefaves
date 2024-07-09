import { useEffect, useState } from "react";
import { getCollection } from "astro:content";

import './carousel.css';

// import film posters
import aftersun from '../assets/posters/aftersun2022.jpg';
import diehard from '../assets/posters/diehard1988.jpg';
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

const CarouselWrapper = (props) => {
  const { films, posters } = props;

  if (!films) return;

  const [width, setWidth] = useState(null);
  const [perView, setPerView] = useState(1);

  useEffect(() => {
    if (!width) setWidth(window.innerWidth);

    window.addEventListener('resize', () => setWidth(window.innerWidth));
    return () => {
      window.removeEventListener('resize', () => setWidth(window.innerWidth));
    };
  }, []);
  useEffect(() => {
    let newPerView;
    
    if (width > 1024) newPerView = 5;
    else if (width > 640) newPerView = 3;
    else newPerView = 1;
  
    if (films.length < newPerView) newPerView = films.length;
    if (newPerView % 2 === 0) newPerView--;
  
    setPerView(newPerView);
  
  }, [width, films.length]);

  return (
    <Carousel show={perView}>
      {films.map(film => {
        return (
          <a href={`/film/${film.data[0].slug}`} key={film.id}>
            <div className="flex justify-center h-full">
              <img src={posters[film.data[0].slug].src} alt="film-poster" className="object-contain" />
            </div>
          </a>
        )
      })}
    </Carousel>
  )
}

const Carousel = (props) => {
    const { children, show } = props;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [length, setLength] = useState(children.length);

    useEffect(() => {
        setLength(children.length);
    }, [children]);

    const next = () => {
      if (currentIndex < (length - show)) {
        setCurrentIndex(prevState => prevState + 1);
      }
    }
    const prev = () => {
      if (currentIndex > 0) {
        setCurrentIndex(prevState => prevState - 1);
      }
    }

    const renderExtraPrev = () => {
      let output = []
      for (let index = 0; index < show; index++) {
          output.push(children[length - 1 - index]);
      }
      output.reverse();
      return output;
    }
    const renderExtraNext = () => {
      let output = []
      for (let index = 0; index < show; index++) {
          output.push(children[index]);
      }
      return output;
    }

    return (
      <div className="carousel-container">
        <div className="carousel-wrapper">
          <div className="carousel-content-wrapper">
            <div
              className={`carousel-content show-${show}`}
              style={{
                  transform: `translateX(-${currentIndex * (100 / show)}%)`,
              }}
            >
              {
                (length > show) &&
                renderExtraPrev()
              }
              {children}
              {
                (length > show) &&
                renderExtraNext()
              }
            </div>
          </div>
        </div>
        {
          ((length - show) != 0) && 
          <div className="carousel-controls">
            <button onClick={prev} className="left-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.70711 5.29289C10.0976 5.68342 10.0976 6.31658 9.70711 6.70711L5.41421 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H5.41421L9.70711 17.2929C10.0976 17.6834 10.0976 18.3166 9.70711 18.7071C9.31658 19.0976 8.68342 19.0976 8.29289 18.7071L2.29289 12.7071C1.90237 12.3166 1.90237 11.6834 2.29289 11.2929L8.29289 5.29289C8.68342 4.90237 9.31658 4.90237 9.70711 5.29289Z" fill="white"/>
              </svg>
            </button>
            <button onClick={next} className="right-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M14.2929 5.29289C14.6834 4.90237 15.3166 4.90237 15.7071 5.29289L21.7071 11.2929C22.0976 11.6834 22.0976 12.3166 21.7071 12.7071L15.7071 18.7071C15.3166 19.0976 14.6834 19.0976 14.2929 18.7071C13.9024 18.3166 13.9024 17.6834 14.2929 17.2929L18.5858 13H3C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11H18.5858L14.2929 6.70711C13.9024 6.31658 13.9024 5.68342 14.2929 5.29289Z" fill="white"/>
              </svg>
            </button>
          </div>
        }
      </div>
    )
}

const FilmGallery = (props) => {
  const { films, posters } = props;

  if (films.length == 0)
    return (
      <p className="text-center italic">No films from this decade yet!</p>
    )

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {films.map(film => {
        return (
          <a href={`/film/${film.data[0].slug}`} key={film.id}>
            <div className="text-center">
              <div className="mb-4">
                <img src={posters[film.data[0].slug].src} className="w-full h-auto object-contain block" />
              </div>
              <a>{film.data[0].title} ({film.data[0].year})</a>
            </div>
          </a>
        )
      })}
    </div>
  )
}

export default function FilmDisplay(props) {
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

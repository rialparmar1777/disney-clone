import React, { useEffect, useRef, useState } from 'react';
import GlobalApi from '../Services/GlobalApi';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import './Slider.css'; // Import the CSS file for styling

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
const screenWidth = window.innerWidth;

function Slider() {
  const [movieList, setMovieList] = useState([]);
  const elementRef = useRef();

  useEffect(() => {
    getTrendingMovies();
    const interval = setInterval(() => {
      sliderRight(elementRef.current);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getTrendingMovies = () => {
    GlobalApi.getTrendingVideos.then(resp => {
      console.log(resp.data.results);
      setMovieList(resp.data.results);
    });
  };

  const sliderRight = (element) => {
    element.scrollLeft += screenWidth - 110;
  };

  const sliderLeft = (element) => {
    element.scrollLeft -= screenWidth - 110;
  };

  const handleImageLoad = (event) => {
    event.target.classList.add('loaded');
  };

  return (
    <div className="slider-container">
      <HiChevronLeft className="chevron left" onClick={() => sliderLeft(elementRef.current)} />
      <HiChevronRight className="chevron right" onClick={() => sliderRight(elementRef.current)} />

      <div className="slider" ref={elementRef}>
        {movieList.map((item) => (
          <div className="slider-item" key={item.id}>
            <img src={IMAGE_BASE_URL + item.backdrop_path} 
              className="slider-image" 
              alt={item.title} 
              onLoad={handleImageLoad} />
            <div className="slider-title">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
import React, { useEffect, useRef, useState } from 'react';
import GlobalApi from '../Services/GlobalApi';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import './Slider.css'; // Import the CSS file for additional styles

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
const screenWidth = window.innerWidth;

function Slider() {
  const [movieList, setMovieList] = useState([]);
  const elementRef = useRef();

  useEffect(() => {
    getTrendingMovies();
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

  return (
    <div className="slider-container">
      <HiChevronLeft className="hidden md:block text-white text-[30px] absolute
        mx-8 mt-[150px] cursor-pointer z-10" 
        onClick={() => sliderLeft(elementRef.current)} />
      <HiChevronRight className="hidden md:block text-white text-[30px] absolute
        mx-8 mt-[150px] cursor-pointer right-0 z-10" 
        onClick={() => sliderRight(elementRef.current)} />

      <div className="flex overflow-x-auto w-full px-16 py-4
        scrollbar-none scroll-smooth" ref={elementRef}>
        {movieList.map((item) => (
          <img src={IMAGE_BASE_URL + item.backdrop_path} 
            className="slider-image min-w-full md:h-[310px] object-cover
            object-left-top mr-5 rounded-md transition-all duration-300 ease-in-out" 
            alt={item.title} />
        ))}
      </div>
    </div>
  );
}

export default Slider;
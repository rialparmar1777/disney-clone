import React from 'react';
import '../Components/ProductionHouse.css';
// Images
import disney from './../assets/Images/disney.png';
import marvel from './../assets/Images/marvel.png';
import nationalG from './../assets/Images/nationalG.png';
import pixar from './../assets/Images/pixar.png';
import starwar from './../assets/Images/starwar.png';

// Videos
import starwarV from './../assets/Videos/star-wars.mp4';
import disneyV from './../assets/Videos/disney.mp4';
import marvelV from './../assets/Videos/marvel.mp4';
import nationalGeographicV from './../assets/Videos/national-geographic.mp4';
import pixarV from './../assets/Videos/pixar.mp4';

function ProductionHouse() {
  const productionHouseList = [
    {
      id: 1,
      image: disney,
      video: disneyV,
    },
    {
      id: 2,
      image: pixar,
      video: pixarV,
    },
    {
      id: 3,
      image: marvel,
      video: marvelV,
    },
    {
      id: 4,
      image: starwar,
      video: starwarV,
    },
    {
      id: 5,
      image: nationalG,
      video: nationalGeographicV,
    },
  ];

  return (
    <div className="production-house">
      {productionHouseList.map((item) => (
        <div key={item.id} className="production-card">
          <video
            src={item.video}
            autoPlay
            loop
            muted
            className="production-video"
          />
          <img src={item.image} alt="Production House" className="production-image" />
        </div>
      ))}
    </div>
  );
}

export default ProductionHouse;
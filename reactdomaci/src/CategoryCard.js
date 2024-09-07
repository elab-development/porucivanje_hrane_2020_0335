 
import React from 'react';
import './CategoryCard.css';

const CategoryCard = ({ name, places, imgSrc }) => {
  return (
    <div className="category-card">
      <img src={imgSrc} alt={name} className="category-img" />
      <div className="category-info">
        <h2>{name}</h2>
        <p>{places} mesta</p>
      </div>
    </div>
  );
};

export default CategoryCard;

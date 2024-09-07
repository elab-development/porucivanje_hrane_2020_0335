// HomePage.js
import React from 'react';
import CategoryCard from './CategoryCard'; // Import CategoryCard component
import './HomePage.css';

const categories = [
  { name: "Doručak", places: 171, imgSrc: "https://imageproxy.wolt.com/wolt-frontpage-images/categories/2d24d3ee-c5b2-11ea-a452-2e3b484a03e4_331daa86_a0e3_45da_bd06_05f8a6df06f3.jpg-md?w=600" },
  { name: "Burger", places: 83, imgSrc: "https://imageproxy.wolt.com/wolt-frontpage-images/categories/a69b5aea-c5a8-11ea-9f48-2e3b484a03e4_0b2c3eb5_ae95_4bff_9144_7f7c93ea74f9.jpg-md?w=600" },
  { name: "Američka kuhinja", places: 161, imgSrc: "https://imageproxy.wolt.com/wolt-frontpage-images/categories/0a824832-c5b0-11ea-8a94-b2000c51ab5c_4b9cac02_a445_4de3_acf2_94398063345e.jpg-md?w=600" },
  { name: "Roštilj", places: 145, imgSrc: "https://imageproxy.wolt.com/wolt-frontpage-images/categories/35a758c0-c5b7-11ea-b7ee-ae2256681f27_0b7baea7_17b7_4113_93ed_6a7f40a3139c.jpg-md?w=600" },
  { name: "Pica", places: 155, imgSrc: "https://imageproxy.wolt.com/wolt-frontpage-images/categories/53129366-c5a8-11ea-8a78-822e244794a0_52b897cd_ac18_4cb5_9921_2653f1d38650.jpg-md?w=600" },
  { name: "Dezert", places: 134, imgSrc: "https://imageproxy.wolt.com/wolt-frontpage-images/categories/90afac70-c5af-11ea-8a78-822e244794a0_7e31d123_8ff4_4211_9f17_88ae65a175bd.jpg-md?w=600" },
];

const HomePage = () => {
  return (
    <div className="homepage">
      <h1>Restorani - Beograd</h1>
      <div className="categories-container">
        {categories.map((category) => (
          <CategoryCard
            key={category.name}
            name={category.name}
            places={category.places}
            imgSrc={category.imgSrc}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

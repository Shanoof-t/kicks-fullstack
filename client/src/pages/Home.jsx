import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import doitright from "../assets/images/Do it right.png";
import nikeairmax from "../assets/images/new.png";
import nikeairmaxsmall from "../assets/images/image 14.png";

function Home() {
  const navigate = useNavigate();
  const settings = useSelector((state) => state.home.settings);
  const categories = useSelector((state) => state.home.categories);

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8">
      {/* Header Image */}
      <div className="text-center mb-8 w-full ">
        <img src={doitright} alt="Do It Right" className="my-12" />
      </div>

      {/* Featured Product Section */}
      <div className="flex justify-center mb-8 relative">
        <picture>
          <source srcSet={nikeairmax} media="(min-width: 1024px)" />
          <img
            src={nikeairmaxsmall}
            alt="Nike Air Max"
            className="w-full h-auto object-cover rounded-3xl"
          />
        </picture>
        <div className="absolute w-3/4 sm:w-2/3 lg:w-1/2 bottom-5 left-4 md:left-10 md:bottom-10 flex flex-col items-start md:space-y-4">
          <h1 className="text-white text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold">
            NIKE AIR MAX
          </h1>
          <p className="text-white text-xs sm:text-sm md:text-lg font-semibold mb-2 sm:mb-4">
            Nike introduces the new Air Max for ultimate comfort and style.
          </p>
          <Link to="product/16">
            <button className="bg-thirdColor p-3 sm:p-4 text-xs sm:text-sm md:text-base text-white font-bold rounded-lg hover:bg-hoverColor transition duration-300 shadow-md">
              SHOP NOW
            </button>
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-12 md:py-16">
        <div className="flex justify-between items-center mb-8 md:mb-10">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-thirdColor">
            CATEGORIES
          </h1>
        </div>

        {/* Category Cards */}
        <Slider {...settings}>
          {categories.map((category, index) => (
            <div
              key={index}
              className="p-2 md:p-4 rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              <img
                className="w-full h-48 md:h-64 object-cover rounded-3xl hover:scale-105 transition-transform duration-300"
                src={category.image}
                alt={`${category.name}`}
              />
              <div className="p-2 md:p-4 flex justify-between items-center">
                <h4 className="text-sm md:text-lg font-semibold text-gray-800">
                  {category.name}
                </h4>
                <button
                  className="text-thirdColor hover:text-hoverColor transition duration-300 text-lg"
                  onClick={() => navigate(category.path)}
                >
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Home;

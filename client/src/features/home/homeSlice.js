import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  settings: {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    // nextArrow: (
    //   <button className="bg-gray-300 p-2 md:p-3 rounded-full mx-1 hover:bg-gray-400 transition duration-300">
    //     <FontAwesomeIcon
    //       icon={faChevronRight}
    //       className="text-gray-700 text-lg md:text-xl"
    //     />
    //   </button>
    // ),
    // prevArrow: (
    //   <button className="bg-gray-300 p-2 md:p-3 rounded-full mx-1 hover:bg-gray-400 transition duration-300">
    //     <FontAwesomeIcon
    //       icon={faChevronLeft}
    //       className="text-gray-700 text-lg md:text-xl"
    //     />
    //   </button>
    // ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  },
  categories: [
    {
      path: "/categorie/MEN",
      name: "Men",
      image:
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b8f2b4d5-1240-4a80-aa73-7a3b3509fba6/AIR+DT+MAX+%2796.png",
    },
    {
      path: "/categorie/WOMEN",
      name: "Women",
      image:
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/5fdb1586-7439-46ee-8aaf-7d654beb0f5c/W+NIKE+CORTEZ+VNTG.png",
    },
    {
      path: "/categorie/KIDS",
      name: "Kids",
      image:
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3e6a746d-d11d-44bb-813b-0a93407bc667/NIKE+AIR+MORE+UPTEMPO+%28GS%29.png",
    },
  ],
};
const homeSlice = createSlice({
  name: "home",
  initialState,
});

export default homeSlice.reducer;

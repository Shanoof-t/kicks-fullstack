import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";

function Categorie() {
  const { categorieGender } = useParams();
  const navigate = useNavigate();

 
  useEffect(() => {
    window.scrollTo(0, 0);
    navigate(`CASUAL`);
  }, [categorieGender]);

  const categories = useMemo(() => ["CASUAL", "FOOTBALL", "RUNNING"], []);

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 ">
      <div className="flex items-center justify-center">
        <ul className="flex flex-wrap gap-6">
          {categories.map((categorie, index) => (
            <li
              key={index}
              onClick={() => navigate(categorie)}
              className="text-lg font-semibold hover:text-blue-700 transition duration-300 hover:cursor-pointer"
            >
              {categorie}
            </li>
          ))}
        </ul>
      </div>
      <Outlet />
    </div>
  );
}

export default Categorie;

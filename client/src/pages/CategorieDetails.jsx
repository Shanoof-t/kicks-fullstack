import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategorieItems } from "../features/categorie_details/categorieDetailsAPI";
import { setCategrieType } from "../features/categorie_details/categorieDetailsSlice";
import Loading from "../components/Loading";
import ItemDisplay from "../components/ItemDisplay";

function CategorieDetails() {
  const { categrieType } = useParams();
  const dispatch = useDispatch();
  const categorieGender = useSelector(
    (state) => state.categorie.categorieGender
  );

  useEffect(() => {
    if (categrieType) {
      dispatch(setCategrieType(categrieType));
    }
  }, [dispatch, categrieType]);

  useEffect(() => {
    if (categrieType && categorieGender) {
      dispatch(fetchCategorieItems({ categrieType, categorieGender }));
    }
  }, [categrieType, categorieGender]);

  return <ItemDisplay />;
}
export default CategorieDetails;

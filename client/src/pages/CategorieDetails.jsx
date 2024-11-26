import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategorieItems } from "../features/categorie_details/categorieDetailsAPI";
import Loading from "../components/Loading";
import ProductErrorDisplay from "../components/ProductErrorDisplay";
import ProductList from "../components/Product/ProductList";

function CategorieDetails() {
  const { categrieType, categorieGender } = useParams();
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(
    (state) => state.categorieDetails.items
  );
  
  useEffect(() => {
    if (categrieType && categorieGender) {
      dispatch(fetchCategorieItems({ categrieType, categorieGender }));
    }
  }, [categrieType, categorieGender]);

  if (loading) return <Loading />;

  if (error)
    return (
      <ProductErrorDisplay
        error={error}
        fallbackretryfun={() =>
          fetchCategorieItems({ categrieType, categorieGender })
        }
      />
    );

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 pt-16">
      <h1 className="text-3xl font-bold mb-4">
        {categorieGender} {categrieType} PRODUCTS
      </h1>
      <h5 className="text-lg mb-8">{data.length} items</h5>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <ProductList items={data} />
      </div>
    </div>
  );
}
export default CategorieDetails;

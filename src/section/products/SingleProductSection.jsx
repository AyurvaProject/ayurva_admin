import React, { useState, useEffect } from "react";
import { getOneProductByID } from "../../apis/Products";
import CircularProgress from "@mui/material/CircularProgress";

const SingleProductSection = ({ productid }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOneProductByID(productid)
      .then((oneproduct) => {
        setProduct(oneproduct);
      })
      .catch((error) => {
        console.log("Error fetching one product:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productid]);

  return (
    <div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <div>
          {product?.product_id}
          {product?.product_name}
          {product?.product_quantity}
          {product?.product_price}
        </div>
      )}
    </div>
  );
};

export default SingleProductSection;

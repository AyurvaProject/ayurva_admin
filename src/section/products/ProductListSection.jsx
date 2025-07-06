import React, { useState, useEffect } from "react";
import DataGridComponent from "../../components/datagrid/DataGrid";
import { ProductColumns } from "../../constants/tableColumns/Products";
import { getAllProducts } from "../../apis/Products";
import CircularProgress from "@mui/material/CircularProgress";

const ProductListSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProducts()
      .then((productdata) => {
        setProducts(productdata);
      })
      .catch((error) => {
        console.log("Error fetching products:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const productrows = products.map((product) => ({
    id: product.product_id,
    productImg: product.product_img1,
    productName: product.product_name,
    productQnt: product.product_quantity,
    productPrice: product.product_price,
    productActiveStatus: product.product_active_status,
    productPharmacyName: product.pharmacist.pharmacist_name,
  }));

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
        <DataGridComponent rows={productrows} columns={ProductColumns} />
      )}
    </div>
  );
};

export default ProductListSection;

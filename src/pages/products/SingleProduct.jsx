import SingleProductSection from "../../section/products/SingleProductSection";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const { id } = useParams();
  return <SingleProductSection productid={id} />;
};

export default SingleProduct;


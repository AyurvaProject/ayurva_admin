import SinglePrSection from "../../section/pr/SinglePrSecion";
import { useParams } from "react-router-dom";

const SinglePr = () => {
  const { id } = useParams();
  return <SinglePrSection id={id} />;
};

export default SinglePr;

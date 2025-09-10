import SinglePharmacistSection from "../../section/pharmacist/SinglePharmacistSection";
import { useParams } from "react-router-dom";

const SinglePharmacist = () => {
  const { id } = useParams();
  return <SinglePharmacistSection id={id} />;
};

export default SinglePharmacist;

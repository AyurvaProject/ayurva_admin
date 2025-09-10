import SingleDelieryOrgSection from "../../section/deliveryOrg/SingleDelieryOrgSection";
import { useParams } from "react-router-dom";

const SingleDeliveryOrg = () => {
  const { id } = useParams();
  return <SingleDelieryOrgSection id={id} />;
};

export default SingleDeliveryOrg;

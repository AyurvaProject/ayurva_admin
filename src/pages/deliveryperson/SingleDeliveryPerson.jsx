import DeliveryPersonDetailSection from "../../section/deliveryPerson/SingleDeliveryPerson";
import { useParams } from "react-router-dom";

const SingleDeliveryPerson = () => {
  const { id } = useParams();
  return <DeliveryPersonDetailSection id={id} />;
};

export default SingleDeliveryPerson;

import SingleUserSection from "../../section/user/SingleUserSection";
import { useParams } from "react-router-dom";
const SingleUser = () => {
  const { id } = useParams();
  return <SingleUserSection id={id} />;
};

export default SingleUser;

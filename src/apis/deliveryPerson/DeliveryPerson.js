import axios from "axios";
import { API_URL } from "../../constants/keys";

export const GetAllDeliveryPersons = async () => {
    const response = await axios.get(`${API_URL}/delivery-persons`,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })

    return response.data.data;
}

export const GetDeliveryPersonById = async (id) => {
    const response = await axios.get(`${API_URL}/delivery-persons/${id}`,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })

    return response.data.data;
}

export const ApproveDeliveryPerson = async (id, approval) => {
    await axios.post(`${API_URL}/delivery-persons/${id}/approve`, { admin_approved: approval },{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
}
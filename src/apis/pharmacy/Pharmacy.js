import axios from "axios";
import { API_URL } from "../../constants/keys";

export const GetAllPharmacies = async () => {
    const response = await axios.get(`${API_URL}/pharmacies`,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })

    return response.data.data;
}

export const GetPharmacyById = async (id) => {
    const response = await axios.get(`${API_URL}/pharmacies/${id}`)

    return response.data.data;
}
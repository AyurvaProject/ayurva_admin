import axios from "axios";
import { API_URL } from "../../constants/keys";

export const GetAllPharmacists = async () => {
    const response = await axios.get(`${API_URL}/pharmacists`,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })

    return response.data.data;
}

export const GetPharmacistById = async (id) => {
    const response = await axios.get(`${API_URL}/pharmacists/${id}`)

    return response.data.data;
}

export const ApprovePharmacst = async (id, approval) => {
    await axios.post(`${API_URL}/pharmacists/${id}/approve`, { admin_approved: approval },{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
}
import axios from "axios";
import { API_URL } from "../../constants/keys";

export const GetAllPrs = async () => {
    const response = await axios.get(`${API_URL}/prescription-readers`,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })

    return response.data.data;
}

export const GetPrById = async (id) => {
    const response = await axios.get(`${API_URL}/prescription-readers/${id}`,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })

    return response.data.data;
}

export const ApprovePr = async (id, approval) => {
    await axios.post(`${API_URL}/prescription-readers/${id}/approve`, { admin_approved: approval },{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
}
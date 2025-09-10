import axios from "axios";
import { API_URL } from "../../constants/keys";

export const GetAllUsers = async () => {
    const response = await axios.get(`${API_URL}/users`,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })

    return response.data.data;
}

export const ChangeUserApproveStatus = async (id, approval) => {
    await axios.post(`${API_URL}/users/admin-approve/${id}`, { admin_approved: approval },{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
}

export const GetUserById = async (id) => {
    const response = await axios.get(`${API_URL}/users/${id}`)

    return response.data.data;
}
import axios from "axios";
import { API_URL } from "../../constants/keys";

export const GetAllDeliveryOrgs = async () => {
    const response = await axios.get(`${API_URL}/delivery-organizations`,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })

    return response.data.data;
}

export const GetDeliveryOrgById = async (id) => {
    const response = await axios.get(`${API_URL}/delivery-organizations/${id}`,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })

    return response.data.data;
}

export const ApproveDeliveryOrg = async (id, approval) => {
    await axios.post(`${API_URL}/delivery-organizations/${id}/approve`, { admin_approved: approval },{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
}
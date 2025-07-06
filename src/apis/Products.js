import { BASE_URL } from "../constants/keys";
import axios from "axios";

 export const getAllProducts = async () => {
    const response = await axios.get(`${BASE_URL}/products`);
    if (response.status === 200){
        return response.data;
    }else{
        throw new Error("Could not get all products");
    }
    
}

 export const getOneProductByID = async (id) => {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    if (response.status === 200){
        return response.data;
    }else{
        throw new Error("Colud not get one product by id");
    }
 }
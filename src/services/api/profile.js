import Api from "../Api";
import { credentials } from "./../../store/stores";
import { get } from "svelte/store";

export const createCustomer = async (formUser) => {
  try {
    const response = await Api.post("/customers", formUser);
    const user = get(credentials);
    user.customer = response;
    credentials.setCredentials(user);
    localStorage.setItem("user", JSON.stringify(user));
    return response;
  } catch (error) {
    let message = "";
    console.log("error", error.response.data);
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : "Error actualizando el perfil 😞";
    throw message;
  }
};

export const updateCustomer = async (formUser) => {
  try {
    const response = await Api.patch(
      `/customers/${formUser.user_id}`,
      formUser
    );
    const user = get(credentials);
    user.customer = response;
    credentials.setCredentials(user);
    localStorage.setItem("user", JSON.stringify(user));
    return response;
  } catch (error) {
    let message = "";
    console.log("error", error.response.data);
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : "Error actualizando el perfil 😞";
    throw message;
  }
};

export const changePassword = async (body) => {
  try {
    const response = await Api.patch(`/users/change-password/${body.id}`, body);
    return response;
  } catch (error) {
    let message = "";
    console.log("error", error.response.data);
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : "Error modificando contraseña 😞";
    throw message;
  }
};

import axios from "axios";

export const useAxios = (token) => {
  console.log(token, "tytytyty")
  const instance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    // baseURL: import.meta.env.VITE_REACT_APP_BASE_URL,
    headers: {
      Authorization: `Bearer ${token || ""}`,
    },
  });
  return instance;
};

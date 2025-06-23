import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",  // ✅ This must match Flask host
});

export const predictTraffic = async (formData) => {
  const res = await API.post("/predict", formData);
  return res.data;
};
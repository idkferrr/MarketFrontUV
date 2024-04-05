import axios from "axios";

const API_URL = "http://localhost:4000/boleta"; // Reemplaza con la URL de tu API

export const getVoucher = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getVoucherByID = async () => {
  const response = await axios.get(`${API_URL}/${id_boleta}`, boleta);
  return response.data;
};

export const createVoucher = async (user) => {
  const response = await axios.post(API_URL, boleta);
  return response.data;
};

export const updateVoucher = async (id_boleta, boleta) => {
  const response = await axios.put(`${API_URL}/${id_boleta}`, boleta);
  return response.data;
};

export const deleteVoucher = async (id_boleta) => {
  const response = await axios.delete(`${API_URL}/${id_boleta}`);
  return response.data;
};

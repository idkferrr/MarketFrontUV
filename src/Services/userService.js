import axios from "axios";

const API_URL = "http://localhost:4000/user";

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by RUN", error);
    // Puedes manejar el error o rechazar la promesa dependiendo de tus necesidades
    throw error;
  }
};

export const getUsersByRun = async (RUN) => {
  try {
    const response = await axios.get(`${API_URL}/${RUN}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by RUN", error);
    // Puedes manejar el error o rechazar la promesa dependiendo de tus necesidades
    throw error;
  }
};

export const createUser = async (user) => {
  try {
    const response = await axios.post(API_URL, user);
    return response.data;
  } catch (error) {
    console.error("Error creating user", error);
    throw error;
  }
};

export const updateUser = async (RUN, user) => {
  try {
    const response = await axios.put(`${API_URL}/${RUN}`, user);
    return response.data;
  } catch (error) {
    console.error("Error updating user", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user", error);
    throw error;
  }
};
// const traerUsuario = async () => {
//   const getDePrueba = await getUsersByRun(111);
//   console.log(getDePrueba);
// };

// React.useEffect(() => {
//   traerUsuario();
//    traerUsuario;
// }, []);

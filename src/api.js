import axios from "axios";

axios.defaults.baseURL = "https://user-events-vue-backend.onrender.com";

export const getUserList = async () => {
  try {
    const { data } = await axios.get(`api/users`);
    return data.data.result;
  } catch (error) {
    console.log(error);
  }
};

export const addUser = async (credentials) => {
  try {
    const { data } = await axios.post("api/users", credentials);
    return data.data.result;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id) => {
  try {
    const { data } = await axios.delete(`api/users/${id}`);
    return data.data.result;
  } catch (error) {
    console.log(error);
  }
};

// events;

export const getUserById = async (id) => {
  try {
    const { data } = await axios.get(`api/users/${id}/events`);
    return data.data.user.events;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserEvent = async (userId, eventId) => {
  try {
    const { data } = await axios.delete(`api/users/${userId}/events/${eventId}`);
    return data.data.result.events;
  } catch (error) {
    console.log(error);
  }
};


export const addUserEvent = async (credentials) => {
  try {
    const { data } = await axios.post("api/events", credentials);
    return data.data.result.event;
  } catch (error) {
    console.log(error);
  }
};

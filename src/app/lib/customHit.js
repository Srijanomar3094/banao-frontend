import { axiosInstance } from "./axios";

export const getHit = async (endpoint, values) => {
  try {
    const res = await axiosInstance.get(endpoint, values);
    return { res: res, err: null };
  } catch (err) {
    return { res: null, err: err };
  }
};

export const postHit = async (endpoint, values) => {
  try {
    const res = await axiosInstance.post(endpoint, values);
    return { res: res, err: null };
  } catch (err) {
    return { res: null, err: err };
  }
};

export const putHit = async (endpoint, values) => {
  try {
    const res = await axiosInstance.put(endpoint, values);
    return { res: res, err: null };
  } catch (err) {
    return { res: null, err: err };
  }
};

export const delHit = async (endpoint, values) => {
  try {
    const res = await axiosInstance.delete(endpoint, {
      data: values,
      withCredentials: true,
    });
    return { res: res, err: null };
  } catch (err) {
    return { res: null, err: err };
  }
};
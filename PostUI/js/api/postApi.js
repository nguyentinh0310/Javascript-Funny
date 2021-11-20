import axiosClient from './axiosClient';

// import: default import, named import
// export: default export, named export
// default: can use your name --> have one default export ONLY
// named export: use exactly name --> have multiple exports

// named export
// REMOVE
export function getAllCities(params) {
  const url = '/cities';
  return axiosClient.get(url, { params });
}

const postApi = {
  getAll(params) {
    const url = '/posts';
    return axiosClient.get(url, { params });
  },

  getById(id) {
    const url = `/posts/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = '/posts';
    return axiosClient.post(url, data);
  },

  update(data) {
    const url = `/posts/${data.id}`;
    return axiosClient.patch(url, data);
  },

  addFormData(data) {
    const url = '/with-thumbnail/posts';
    return axiosClient.post(url, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  updateFormData(data) {
    const url = `/with-thumbnail/posts/${data.get('id')}`;
    return axiosClient.patch(url, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  remove(id) {
    const url = `/posts/${id}`;
    return axiosClient.delete(url);
  },
};

export default postApi;

import axios from "axios";

const techEndpoint = "";

const getTechCompanies = (index, size) => {
  const config = {
    method: "GET",
    url: `${techEndpoint}/paginate/?pageIndex=${index}&pageSize=${size}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => {
    return response.data.item;
  });
};

const getAllTechCo = () => {
  const config = {
    method: "GET",
    url: `${techEndpoint}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => response.data);
};

const getTechCompaniesSearch = (index, size, query) => {
  const config = {
    method: "GET",
    url: `${techEndpoint}/search/?pageIndex=${index}&pageSize=${size}&query=${query}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => {
    return response.data.item;
  });
};

const getTechCompanyById = (id) => {
  const config = {
    method: "GET",
    url: `${techEndpoint}/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => response.data.item);
};

const addTechCompany = (payload) => {
  const config = {
    method: "POST",
    data: payload,
    url: techEndpoint,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => {
    return { ...payload, id: response.data.item };
  });
};

const updateTechCompany = (id, payload) => {
  const config = {
    method: "PUT",
    data: payload,
    url: `${techEndpoint}/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(() => {
    return { ...payload, id: id };
  });
};

const deleteTechCo = (id) => {
  const config = {
    method: "DELETE",
    url: `${techEndpoint}/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(() => {
    return id;
  });
};

const techService = {
  getTechCompanies,
  getTechCompaniesSearch,
  addTechCompany,
  updateTechCompany,
  getTechCompanyById,
  deleteTechCo,
  getAllTechCo,
};
export default techService;

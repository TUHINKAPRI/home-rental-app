const baseUrl="http://localhost:4000/api/v1";
const axios=require('axios')

exports.axiosInstance=axios.create({
  baseURL: baseUrl,
})
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {

    const token= (localStorage.getItem('access'));
  
   
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  response => {
    console.log(response);
    return response
  },
  function (error) {
    const originalRequest = error.config
    console.log("insice resp.interceptor",originalRequest)

    if (
      error.response.status === 401 &&
      originalRequest.url === 'http://127.0.0.1:8000/users/api/login/refresh/'
    ) {
      window.location.replace('/login');
      return Promise.reject(error)
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = localStorage.getItem('refresh')
      return axios
        .post('http://127.0.0.1:8000/users/api/login/refresh/', {
          refresh: refreshToken
        })
        .then(res => {
          if (res.status === 200) {
            console.log(res.data.access,"...............")
            localStorage.setItem('access',res.data.access)
            axiosInstance.defaults.headers.common['Authorization'] =
              'Bearer ' + res.data.access
            return axios(originalRequest)
          }
        })
    }
    return Promise.reject(error)
  }
)





export default axiosInstance
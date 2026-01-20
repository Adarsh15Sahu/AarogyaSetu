import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})


api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Don't override Content-Type for FormData - let axios handle it
        if (config.data instanceof FormData) {
            delete config.headers["Content-Type"];
        } else if (!config.headers["Content-Type"]) {
            config.headers["Content-Type"] = "application/json";
        }

        return config;
    },
    (error) => Promise.reject(error)
);


api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("userId");

            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;
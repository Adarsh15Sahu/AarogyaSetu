export const getAuth = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    return { token, role };
};

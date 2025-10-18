export const auth = {
    isAuthed() {
        return !!localStorage.getItem("token");
    },
    login(token, email) {
        localStorage.setItem("token", token);
        if (email)
            localStorage.setItem("email", email);
    },
    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
    },
    getToken() {
        return localStorage.getItem("token");
    },
};

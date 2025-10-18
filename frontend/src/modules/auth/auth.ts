export const auth = {
  isAuthed(): boolean {
    return !!localStorage.getItem("token");
  },
  login(token: string, email?: string) {
    localStorage.setItem("token", token);
    if (email) localStorage.setItem("email", email);
  },
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  },
  getToken(): string | null {
    return localStorage.getItem("token");
  },
};

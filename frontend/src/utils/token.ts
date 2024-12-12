export const isTokenExpired = (token: string) => {
    if (!token) return true;
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now; // Check if the token is expired
};


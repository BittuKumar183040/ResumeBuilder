
export const getUserFromLocal = () => {
    try {
        const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
        return user;
    } catch (error) {
        console.error("Error parsing user from local storage:", error);
        return null;
    }
};

export const saveUserToLocal = (user) => {
    try {
        localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
        console.error("Error saving user to local storage:", error);
    }
};

export const removeUserFromLocal = () => {
    try {
        localStorage.removeItem("user");
    } catch (error) {
        console.error("Error removing user from local storage:", error);
    }
};
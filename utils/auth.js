import axios from 'axios';

export const authenticateUser = async (email, password) => {
    try {
        const response = await axios.post('http://192.168.100.15:3000/api/login', {
            email: email,
            password: password,
        });

        const { data } = response;

        if (data.success) {
            const { id, email, username } = data.user;
            return { success: true, user: { id, email, username } };
        } else {
            return { success: false, error: data.error || "Invalid email or password" };
        }
    } catch (error) {
        console.error("Error authenticating user:", error);
        return { success: false, error: "Error authenticating user" };
    }
};

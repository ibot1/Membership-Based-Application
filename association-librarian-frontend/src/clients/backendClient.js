import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
});

export const getUserProfile = userId => client.get(`/user-profile/${userId}`);

export const addUserProfile = request => client.post("/user-profile", request);

export const modifyUserProfile = request => client.put("/user-profile", request);
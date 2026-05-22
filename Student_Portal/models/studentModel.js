import 'dotenv/config.js';

export const fetchStudentById = async (id) => {
    
    const response = await fetch(
        `http://localhost:4000/auth/student/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(result.message || "Student record not found.");
    }

    return result.data;
};
import * as AuthService from '../services/authServices.js';

export const registerStudent = async (req, res) => {
    const { firstname, lastname, dob, course, major, address, status } = req.body;
    try {
        const studentProfile = {
            firstname, lastname, dob, course, major, address, status
        };
        const result = await AuthService.registerStudent(studentProfile);
        res.status(201).json({
            success: true,
            message: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while registering the student."
        });
    }
};

export const getStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await AuthService.getStudentById(id);
        
        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error("Adapter Controller Error:", error.message);
        res.status(404).json({
            success: false,
            message: error.message || "Student not found."
        });
    }
};
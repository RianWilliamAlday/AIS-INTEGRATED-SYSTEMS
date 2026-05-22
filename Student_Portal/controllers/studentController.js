import * as StudentModel from '../models/studentModel.js';

export const searchStudentById = async (req, res) => {
    const { id } = req.params;

    if (!id || id.trim() === '') {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid Student ID."
        });
    }

    try {
        const studentProfile = await StudentModel.fetchStudentById(id);

        res.status(200).json({
            success: true,
            studentProfile: studentProfile
        });

    } catch (error) {
        console.error("Portal Search Error:", error.message);
        res.status(404).json({
            success: false,
            message: error.message || "An error occurred while retrieving student records."
        });
    }
};
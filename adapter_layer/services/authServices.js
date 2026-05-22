import * as AuthAdapter from "../adapters/authAdapter.js";

export const registerStudent = async (studentProfile) => {
    if(studentProfile.firstName ===  ''){
        throw new Error("First name is required");
    }
    
    if(studentProfile.lastName === ''){
        throw new Error("Last name is required");
    }

    if(studentProfile.dob === ''){
        throw new Error("Birthday is required");
    }

    if(studentProfile.course === ''){
        throw new Error("course is required");

    }

    if(studentProfile.major === ''){
        throw new Error("major is required");
    }

    if(studentProfile.address === ''){
        throw new Error("address is required");
    }

    if(studentProfile.status === ''){
        throw new Error("student status is required");
    }

    return await AuthAdapter.create(studentProfile);
};

export const getStudentById = async (id) => {
    if (!id || id.trim() === '') {
        throw new Error("Student ID is required");
    }
    return await AuthAdapter.getById(id);
};
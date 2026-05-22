export const create = async (profile) => {
    const transformedProfile ={
        name: profile.firstname + " " + profile.lastname,
        birthdate: profile.dob,
        program: profile.course + " " + profile.major,
        address: profile.address,
        studentStatus: profile.status
    }

    const response = await fetch (
        `https://ais-simulated-legacy.onrender.com/api/students`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transformedProfile)
        }
    );
    return await response.json();
}

export const getById = async (id) => {
    const response = await fetch(
        `https://ais-simulated-legacy.onrender.com/api/students/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    
    if (!response.ok) {
        throw new Error(`Legacy system returned status ${response.status}`);
    }
    
    const legacyData = await response.json();
    
    return {
        name: legacyData.name,
        birthdate: legacyData.birthdate,
        program: legacyData.program,
        address: legacyData.address,
        studentStatus: legacyData.studentStatus
    };
}
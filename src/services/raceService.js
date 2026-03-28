import {apiWithToken} from "../api/axios";

const createRace = async (raceData) => {
    const response = await apiWithToken.post('/race/create', raceData);
    return response.data;
};

const joinRace = async (joinData) => {
    const response = await apiWithToken.post('/race/join', joinData);
    return response.data;
};

const getRaceInfo = async (roomCode) => {
    const response = await apiWithToken.post('/race/info', {roomCode});
    return response.data;
};

export {
    createRace,
    getRaceInfo,
    joinRace
};
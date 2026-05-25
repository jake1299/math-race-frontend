import {apiWithOutToken,apiWithToken} from "../api/axios";

const createRace = async (raceData) => {
    const response = await apiWithToken.post('/race/create', raceData);
    return response.data;
};

const joinRace = async (joinData) => {
    const response = await apiWithToken.post(`/race/${joinData.roomCode}/join`, {
        nickname: joinData.nickname,
    });
    return response.data;
};

const publicRacesList = async (loc) => {
    const response = await apiWithOutToken.get(`/race/public-list`,{
        params: {
            page: loc.page,
            size: loc.size,
        }
    });
    return response.data;
};

export {
    createRace,
    joinRace,
    publicRacesList,
};
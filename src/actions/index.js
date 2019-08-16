import { SEARCH_CHANGE } from "../types"

export const setTeams = (firstTeam, secondTeam) => {
    return {
        type: SEARCH_CHANGE,
        firstTeam: firstTeam,
        secondTeam: secondTeam 
    }
}


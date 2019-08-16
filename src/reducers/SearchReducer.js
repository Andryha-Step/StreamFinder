import { SEARCH_CHANGE } from '../types'

const INITIAL_STATE = {
    firstTeam: '',
    secondTeam: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SEARCH_CHANGE:
            return {
                ...state,
                firstTeam: action.firstTeam,
                secondTeam: action.secondTeam
            }
        default: return state
    }
}
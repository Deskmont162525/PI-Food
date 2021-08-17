import {
  GET_FOODS,
  GET_TYPES,
  FOOD_DETAIL,
  SEARCH_FOOD} from '../actions/constants'

var initialState = {
  recipes: [],
  recipe: [],
  types: []
}

export default function reducer(state = initialState, action){
  switch(action.type) {
      case GET_FOODS:
          return {
              ...state,
              recipes: action.payload
          }
      case GET_TYPES:
          return {
              ...state,
              types: action.payload
          }
      case SEARCH_FOOD:
          return {
              ...state,
              searchedCharacters: [...action.payload]
          }
      case FOOD_DETAIL:
          return {
            ...state,
            recipe: action.payload
          }
      default: return state
  }
}

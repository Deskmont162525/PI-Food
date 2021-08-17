import axios from 'axios';
import {FOODS_URL, TYPES_URL, FOODSBYID_URL, FOODSADD_URL} from '../constants';
import {GET_FOODS, GET_TYPES, FOOD_DETAIL} from './constants'



export function getFoods() {
    return function (dispatch) {//recipe
        return axios.get(FOODS_URL)
        .then((recipes) => {
            dispatch({
                type:GET_FOODS,
                payload:recipes.data
            })

        })
    }

};

export function getTypes() {
    return function (dispatch) {
        return axios.get(TYPES_URL)
        .then((tipes) => {
            dispatch({
                type: GET_TYPES,
                payload: tipes.data
            })
        })
    }
};



export function getFoodsById(id) {
    return function (dispatch) {
        return axios.get(FOODSBYID_URL+id)
        .then((foodD) => {

            dispatch({
                type: FOOD_DETAIL,
                payload: foodD.data
            })

        })
    }
}

export async function  postFoodAdd(recipe){
        return await axios.post(FOODSADD_URL,recipe);
        

}

export function getFoodsByName(Nombre) {
    return function (dispatch) {//recipe
        return axios.get(`${FOODSADD_URL}?Nombre=${Nombre}`)
        .then((recipes) => {
            dispatch({
                type:GET_FOODS,
                payload:recipes.data
            })

        })
    }

};

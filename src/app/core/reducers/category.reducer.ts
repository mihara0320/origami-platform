import * as CategoryActions from '../actions/category.actions';
import { Category } from '@shared/models/database';

export interface State {
    categories: Category[];
}

const initialState: State = {
    categories: [],
};

export function reducer(
    state: State = initialState,
    action: CategoryActions.ActionUnion
): State {
    switch (action.type) {
        case CategoryActions.ActionTypes.Complete:
            return {
                ...state,
                categories: action.payload,
            };
        default:
            return state;
    }
}

export const getCategories = (state: State) => state.categories;

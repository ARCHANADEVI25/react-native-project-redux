import { COUNTER_CHANGE } from '../constants';
const initialState = {
loanedCount: 10,
availableCount:0
};
const countReducer = (state = initialState, action) => {
switch(action.type) {
case COUNTER_CHANGE:
return {
...state,
count:action.payload
};
default:
return state;
}
}
export default countReducer;
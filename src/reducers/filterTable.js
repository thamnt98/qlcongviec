import * as types from './../constants/ActionTypes';

var initialState = {
    name : '',
    desc:'',
    startdate:new Date(),
    enddate: new Date(),
    status : -1
};
var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case types.FILTER_TABLE:
            return {
                name : action.filter.name,
                desc:action.filter.desc,
                startdate:action.filter.startdate,
                enddate:action.filter.enddate,
                status :parseInt(action.filter.status,10)
            };
        default:
            return state;
    }
};

export default myReducer;
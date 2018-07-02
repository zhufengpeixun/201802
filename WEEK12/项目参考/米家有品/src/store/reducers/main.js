import * as Types from '../action-types';

let initState = {
    //首页初始化数据
    homedata: {
        sliders: [],
        activity: [],
        recommend: [{
            gid: "",
            title: "",
            describe: "",
            url: "",
            link: ""
        }],
        crowdfunding: [{
            gid: "",
            title: "",
            describe: "",
            url: "",
            link: "",
            price: "",
            ratedPerson: "",
            actualPerson: "",
            color: ""
        }],

    },
    //热门
    // homeLoaderData:{
    //     hot: [],
    //     new: []
    // },
    homeLoaderData: [],


};

function main(state = initState, action) {
    switch (action.type) {
        case Types.INIT_STATE:
            return {...state};
        case Types.GET_HOME_DATA:
            return {...state, homedata: action.homeData};
        case Types.GET_LOADER_HOME_DATA:
            // return {...state,homeLoaderData:[...action.payload]};
            return {...state, homeLoaderData: action.hotData};
    }

    return state;
}

export default main;
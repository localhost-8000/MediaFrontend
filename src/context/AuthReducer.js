const AuthReducer = (state, action) => {
    // console.log('state: ', action.type);
    // console.log('user: ', action.payload.user);
    // console.log('loader: ', action.payload.gglLoader);

    switch(action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isGglLoading: action.payload.gglLoader,
                isFbLoading: action.payload.fbLoader,
                error: false,
            };

        case "LOGIN_SUCCESS":
            sessionStorage.setItem("userData", JSON.stringify(action.payload.user));
            return {
                user: action.payload.user,
                isGglLoading: false,
                isFbLoading: false,
                error: false,
            };

        case "LOGIN_FAILURE":
            return {
                user: null,
                isGglLoading: false,
                isFbLoading: false,
                error: action.payload.error,
            };
        
        case "FOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: [...state.user.followings, action.payload],
                }
            };

        case "UNFOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: state.user.followings.filter(following => following !== action.payload),
                }
            };
        
        default:
            return state;
    }
}

export default AuthReducer;
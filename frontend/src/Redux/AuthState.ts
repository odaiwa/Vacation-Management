import UserModel from "../Models/UserModel";
// import VacationsSocket from "../Services/VacationsSocket";

// Auth State: 
export class AuthState {
    public user: UserModel = null;

    // VacationsSocketService:
    // public vacationsSocket: VacationsSocket = new VacationsSocket();
    
    // public unavailableToken: any = new Object();

    public constructor() {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (user) {
            this.user = user;
        }
    }
}

// Auth Action Types: 
export enum AuthActionType {
    UsersDownloaded = "UsersDownloaded",
    UserRegistered = "UserRegistered",
    UserLoggedIn = "UserLoggedIn",
    UserLoggedOut = "UserLoggedOut"
}

// Auth Action: 
export interface AuthAction {
    type: AuthActionType;
    payload?: any;
}




// Auth Action Creators: 
export function usersDownloadedAction(user: UserModel): AuthAction {
    return { type: AuthActionType.UsersDownloaded, payload: user };
}    
export function userRegisteredAction(user: UserModel): AuthAction {
    return { type: AuthActionType.UserRegistered, payload: user };
}
export function userLoggedInAction(user: UserModel): AuthAction {
    return { type: AuthActionType.UserLoggedIn, payload: user };
}
export function userLoggedOutAction(): AuthAction {
    return { type: AuthActionType.UserLoggedOut };
}

// Auth Reducer: 
export function authReducer(currentState: AuthState = new AuthState(), action: AuthAction): AuthState {

    const newState = { ...currentState };


    switch (action.type) {
        case AuthActionType.UsersDownloaded: // payload = all vacations
        newState.user = action.payload;
        break;
        case AuthActionType.UserRegistered:
        case AuthActionType.UserLoggedIn:
            newState.user = action.payload;
            // newState.vacationsSocket.connect();
            sessionStorage.setItem("user", JSON.stringify(newState.user));
            break;
        case AuthActionType.UserLoggedOut:
            newState.user = null;
            // newState.vacationsSocket.disconnect();
            sessionStorage.removeItem("user");
            break;
    }

    return newState;
}
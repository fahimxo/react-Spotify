import { createContext, useReducer } from "react";

export const stateContext=createContext()

const reducer =(state,action)=>{
    switch (action.type) {
        case "SET_TOKEN":
            return {...state,token:action.payload};
        case "SET_PLAYLISTS":
            return {...state,playlists:action.payload};
        case "SET_PLAYLIST":
            return {...state,selectedPlaylist:action.payload};
        case "SET_PLAYLIST_ID":
            return {...state,selectedPlaylistId:action.payload};
        case "SET_PLAYING":
            return {...state,currentlyPlayling:action.payload};
        case "SET_PLAYER_STATE":
            return {...state,playlerState:action.payload};
        case "SET_USER":
            return {...state,userInfo:action.payload};
        default:
            return state;
        }
    }   
        
const initialState ={
    token : null ,
    playlists:[],
    userInfo:null,
    selectedPlaylistId:'1x27KliWUqsYwnksjPtdIZ',
    selectedPlaylist:null,
    currentlyPlayling:null,
    playlerState:false,
}
const StateProvider=({children})=>{
    
    const [state, dispatch] = useReducer(reducer,initialState)
return (
    <stateContext.Provider value={{state,dispatch}}>
        {children}
    </stateContext.Provider>
)}

export default StateProvider;
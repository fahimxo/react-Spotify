import React, { useContext, useEffect } from 'react';
import { stateContext } from '../utils/StateProvider';
import axios from 'axios'
import styled from 'styled-components';

const PlayLists = () => {
    const {state,dispatch} = useContext(stateContext);
    const {token,playlists} = state
    useEffect(() => {
        const getPlayListData=async()=>{
            const response = await axios.get('https://api.spotify.com/v1/me/playlists',{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            const {items}=response.data
            const playLists=items.map(({name,id})=>{return {name,id}})
            dispatch({type:"SET_PLAYLISTS",payload:playLists})
        }
        getPlayListData()
        
    }, [dispatch,token]);
    const changeCurrentPlaylist=(id)=>{    
        dispatch({type:"SET_PLAYLIST_ID",payload:id})
    }
    return (
        <Container>
            <ul>
                {playlists.map((item)=>
                    <li id={item.id} key={item.id} onClick={()=>changeCurrentPlaylist(item.id)}>{item.name}</li>
                )}
                
            </ul>
        </Container>
    );
}

export default PlayLists;
const Container = styled.div`
    height: 100%;
    overflow: hidden;

    ul{
        display: flex;
        flex-direction: column;
        list-style-type: none;
        gap: .6rem;
        padding: 1rem;
        height: 55vh;
        max-height:100%;
        overflow: auto;
        &::-webkit-scrollbar{
            width:.7rem;
            &-thumb{
               background-color: rgba(255,255,255,.6);
               border-radius: 2px;
            }
        }
        li{
            display: flex;
            gap: .2rem;
            align-items: center;
            cursor: pointer;
            font-size:.9rem;
            transition: all .3s ease-in-out;
            &:hover{
                color: white;
            }

        }
    }
`
import React, { useContext } from 'react';
import styled from 'styled-components';
import {BsFillPlayCircleFill,BsFillPauseCircleFill,BsShuffle} from 'react-icons/bs'
import {CgPlayTrackNext,CgPlayTrackPrev,} from 'react-icons/cg'
import {FiRepeat} from 'react-icons/fi'
import { stateContext } from '../utils/StateProvider';
import axios from 'axios';

const PlayerControls = () => {
    const { state, dispatch } = useContext(stateContext);
    const { token, playlerState } = state;

    const changeTrack=async(type)=>{
        await axios.post(`https://api.spotify.com/v1/me/player/${type}`,{},{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        const res = await axios.get('https://api.spotify.com/v1/me/player/currently-playing',{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            if (res.data.item) {
                const {item} =res.data
                const currentlyPlaying={
                    id: item.id,
                    name: item.name,
                    artists: item.artists.map((artist) => artist.name),
                    image: item.album.images[2].url,
                }
                
                dispatch({type:"SET_PLAYING",payload:currentlyPlaying})
            }else{
                
                dispatch({type:"SET_PLAYING",payload:null})
            }
        }

    const changeState=async()=>{
        dispatch({type:"SET_PLAYER_STATE",payload:!playlerState})
        const state = playlerState ? "pause": "play";
        const res =await axios.put(`https://api.spotify.com/v1/me/player/${state}`,{},{
            headers:{
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        console.log(res);
    }
    return (
        <Container>
            <div className="shuffle">
                <BsShuffle/>
            </div>
            <div className="previous" onClick={()=>changeTrack("previous")}>
                <CgPlayTrackPrev/>
            </div>
            <div className="state" onClick={changeState}>
                {playlerState ? <BsFillPauseCircleFill/> : <BsFillPlayCircleFill/>}
            </div>
            <div className="next" onClick={()=>changeTrack("next")}>
                <CgPlayTrackNext/>
            </div>
            <div className="repeat">
                <FiRepeat/>
            </div>
        </Container>
    );
}

export default PlayerControls;

const Container =styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    svg{
        color:#b3b3b3;
        transition: all .3s ease-in-out;
        cursor: pointer;
        &:hover{
            color: white;
        }
    }
    .state{
        svg{
            color: white;
        }
    }
    .previous,.next,.state{
        font-size: 2rem;
    }
    
`
import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { stateContext } from '../utils/StateProvider';

const CurrentTrack = () => {
    const {state,dispatch} = useContext(stateContext);
    const {token,currentlyPlayling} = state
    useEffect(() => {
        const getCurrentTrack=async()=>{
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
            }
        
        }
        getCurrentTrack()
    }, [dispatch,token]);
    return (
        <Container>
            {
                currentlyPlayling && 
                (
                    <div className="track" >
                        <div className="track_image">
                            <img src={currentlyPlayling.image} alt="" />
                        </div>
                        <div className="track_info">
                            <h4>{currentlyPlayling.name}</h4>
                            <h6>{currentlyPlayling.artists.join(" ")}</h6>
                        </div>
                    </div>
                )
            }
        </Container>
    );
}

export default CurrentTrack;

const Container = styled.div`
    .track{
        display: flex;
        align-items: center;
        gap: 1rem;
        &_info{
            display: flex;
            flex-direction: column;
            gap: .4rem;
            h4{
                color: white;
            }
            h6{
                color: #b3b3b3;
            }
        }
    }
   

`
import axios from 'axios';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { stateContext } from '../utils/StateProvider';

const Volume = () => {
    const { state } = useContext(stateContext);
    const { token } = state;
    const changeVolume=async(e)=>{
        await axios.put(`https://api.spotify.com/v1/me/player/`,{},{
            params:{
                volume_percent : parseInt(e.target.value)
            },
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
    }
    return (
        <Container>
            <input type="range" min={0} max={100} onInput={e=>changeVolume(e)}/>
        </Container>
    );
}

export default Volume;
const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    align-content: center;
    input{
        width: 15rem;
        height: .4rem;
        border-radius: 2rem;
        cursor: pointer;
    }

`

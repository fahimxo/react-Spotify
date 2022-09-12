import React from 'react';
import styled from 'styled-components';
import spotify from "../image/Spotify1.png";

const Login = () => {
    const handelClick=()=>{
        const clientId = 'a959041992a8400caa2bf31572fa38e0';
        const redirectUrl ='http://localhost:3000/';
        const apiUrl = 'https://accounts.spotify.com/authorize';
        const scope = ['user-read-email','user-read-private','user-modify-playback-state',
        'user-read-playback-state','user-read-currently-playing','user-read-recently-played',
        'user-read-playback-position','user-top-read'];
        window.location.href=`${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(' ')}
        &response_type=token&show_daialog=true`;
    }
    return (
        <Container>
            <img src={spotify} alt="Spotify" />
            <button onClick={handelClick}>Connect Spotify</button>
        </Container>
    );
}

export default Login;
const Container = styled.div`
    display:flex;
    flex-direction:column;
    background-color:#1db954;
    width:100vw;
    height:100vh;
    align-items: center;
    justify-content:center;
    gap:5rem;
    text-align:center;
    img{
        height:20vh;   
    }
    button{
        padding:1rem 5rem;
        border-radius:5rem;
        border:none;
        cursor:pointer;
        background-color:black;
        color:#49f585;
        font-size:1.4rem;
    }

`;

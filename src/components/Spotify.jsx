import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { stateContext } from '../utils/StateProvider';
import Body from './Body';
import Footer from './Footer';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Spotify = () => {
    const {state,dispatch} = useContext(stateContext);
    const {token} = state
    const bodyRef=useRef()
    const [navBackground, setNavBackground] = useState(false);
    const [headerBackground, setHeaderBackground] = useState(false);
    const bodyScrolled=()=>{
        bodyRef.current.scrollTop >= 30 ? setNavBackground(true) : setNavBackground(false);
        bodyRef.current.scrollTop >= 268 ? setHeaderBackground(true) : setHeaderBackground(false);
    }
    useEffect(() => {
        const getUser=async()=>{
            const res = await axios.get('https://api.spotify.com/v1/me',{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            const user ={
                userId:res.data.id,
                userName:res.data.display_name
            }
            dispatch({type:"SET_USER",payload:user})
        
        }
    getUser()
        
    }, [dispatch,token]);
    return (
        <Container>
            <div className="spotify_body">
                <Sidebar/>
                <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
                    <Navbar navBackground={navBackground}/>
                    <div className="body_contents">
                        <Body headerBackground={headerBackground}/>
                    </div>
                </div>
            </div>
            <div className="spotify_footer">
                <Footer/>
            </div>
        </Container>
    );
}

export default Spotify;

const Container = styled.div`
    max-height: 100vh;
    max-width: 100vw;
    overflow: hidden;
    display: grid;
    grid-template-rows: 85vh 15vh;
    .spotify_body{
        display: grid;
        grid-template-columns: 15vw 85vw;
        height: 100%;
        width: 100%;
        background: linear-gradient(transparent,rgba(0,0,0,.7));
        background-color: rgb(32,87,100);
        .body{
            height: 100%;
            width: 100%;
            overflow: auto;
            &::-webkit-scrollbar{
            width:.7rem;
            &-thumb{
               background-color: rgba(255,255,255,.6);
               border-radius: 2px;
            }
        }
        }
    }
`

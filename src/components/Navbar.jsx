import React, { useContext } from 'react';
import styled from 'styled-components';
import {FaSearch} from 'react-icons/fa'
import {CgProfile} from 'react-icons/cg'
import { stateContext } from '../utils/StateProvider';

const Navbar = ({navBackground}) => {
    const {state} = useContext(stateContext);
    const {userInfo} = state
    return (
        <Container navBackground={navBackground}>
            <div className="search_bar">
                <FaSearch/>
                <input type="text" placeholder='Artists , songs or padcasts' />
            </div>
            <div className="avatar">
                <a href="#">
                    <CgProfile/>
                    {userInfo?.userName}
                </a>
            </div>
        </Container>
    );
}

export default Navbar;

const Container =styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding: 2rem;
height: 15vh;
position: sticky;
top: 0;
transition: all .3s ease-in-out;
background-color: ${({navBackground})=> navBackground ? "rgba(0,0,0,0.7)" : "none"};

.search_bar{
    display: flex;
    align-items: center;
    gap: .5rem;
    width: 30%;
    background-color: white;
    padding: .4rem 1rem;
    border-radius: 2rem;
    input{
        border: none;
        outline: none;
        height: 2rem;
    }
}
.avatar{
    background-color: black;
    border-radius: 2rem;
    padding:.3rem .4rem ;
    padding-right: 1rem;

    a{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: .5rem;
        text-decoration: none;
        color: white;
        font-weight: bold;
        svg{
            font-size: 1.3rem;
            background-color: #282828;
            color: #c7c5c5;
            border-radius: 1rem;
        }
    }
}
    
`

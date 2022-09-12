import React from 'react';
import styled from 'styled-components';
import {IoLibrary} from 'react-icons/io5'
import {MdHomeFilled,MdSearch} from 'react-icons/md'
import PlayLists from './PlayLists';
import spotify from '../image/spotify2.png';

const Sidebar = () => {
    return (
        <Container>
            <div className="top_links">
                <div className="logo">
                <img src={spotify} alt="Spotify" />
                </div>
                <ul>
                    <li><MdHomeFilled/><span>Home </span></li>
                    <li><MdSearch/><span>Search </span></li>
                    <li><IoLibrary/><span>your Library </span></li>
                </ul>
            </div>
            <PlayLists/>
        </Container>
    );
}

export default Sidebar;

const Container = styled.div`
    background-color: #000000;
    color: #b3b3b3;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    .top_links{
        .logo{
            width: 100%;
            margin: 1rem 0;
            text-align: center;
            
            img{
                width: 95%;
            }
        }
        ul{
            display: flex;
            flex-direction: column;
            list-style-type: none;
            gap: 1rem;
            padding: 1rem;
            li{
                display: flex;
                gap: 1rem;
                align-items: center;
                cursor: pointer;
                transition: all .3s ease-in-out;
                &:hover{
                    color: white;
                }

            }
        }
         
    }
`

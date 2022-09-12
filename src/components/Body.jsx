import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { AiFillClockCircle } from "react-icons/ai";
import { stateContext } from "../utils/StateProvider";
import axios from "axios";

const Body = ({ headerBackground }) => {
  const { state, dispatch } = useContext(stateContext);
  const { token, selectedPlaylistId, selectedPlaylist } = state;
  useEffect(() => {
    const getInitialPlaylist = async () => {
      const res = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const selectedPlaylist = {
        id: res.data.id,
        name: res.data.name,
        description: res.data.description.startsWith("<a")
          ? ""
          : res.data.description,
        image: res.data.images[0].url,
        tracks: res.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };
      dispatch({ type: "SET_PLAYLIST", payload: selectedPlaylist });
    };
    getInitialPlaylist();
  }, [dispatch, token, selectedPlaylistId]);

  const msToMin = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const playTrack = async (
    id,
    name,
    artists,
    image,
    context_uri,
    track_number
  ) => {
    const currentPlaying={
      id,
      name,
      artists,
      image,
    }
    dispatch({ type: "SET_PLAYING", payload: currentPlaying });
    dispatch({type:"SET_PLAYER_STATE",payload:true});
    await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri,
        offset:{
          position:track_number-1
        },
        position_ms:0
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    
  };

  return (
    <Container headerBackground={headerBackground}>
      {selectedPlaylist && (
        <>
          <div className="playlist">
            <div className="image">
              <img src={selectedPlaylist.image} alt="" />
            </div>
            <div className="details">
              <span className="type">PLAYLIST</span>
              <h1 className="title">{selectedPlaylist.name}</h1>
              <p className="description">{selectedPlaylist.description}</p>
            </div>
          </div>
          <div className="list">
            <div className="header_row">
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>TITLE</span>
              </div>
              <div className="col">
                <span>ALBUM</span>
              </div>
              <div className="col">
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
            </div>
          </div>
          <div className="tracks">
            {selectedPlaylist.tracks.map((t, i) => {
              return (
                <div
                  className="row"
                  key={t.id}
                  onClick={() =>
                    playTrack(
                      t.id,
                      t.name,
                      t.artists,
                      t.image,
                      t.context_uri,
                      t.track_number
                    )
                  }
                >
                  <div className="col">
                    <span>{i + 1}</span>
                  </div>
                  <div className="col detail">
                    <div className="image">
                      <img src={t.image} alt="track" />
                    </div>
                    <div className="info">
                      <span className="name">{t.name}</span>
                      <span>{t.artists.join(" ")}</span>
                    </div>
                  </div>
                  <div className="col">
                    <span>{t.album}</span>
                  </div>
                  <div className="col">
                    <span>{msToMin(t.duration)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </Container>
  );
};

export default Body;

const Container = styled.div`
  .playlist {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    .image {
      img {
        height: 15rem;
        box-shadow: rgba(0, 0, 0, 0.25) 0 25px 50px -12px;
      }
    }
    .details {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      color: #e0dede;
      .title {
        color: white;
        font-size: 4rem;
      }
    }
  }
  .list {
    position: sticky;
    top: 15vh;
    .header_row {
      display: grid;
      grid-template-columns: 0.3fr 3fr 1.83fr 0.15fr;
      color: #dddcdc;
      margin-top: 1rem;
      padding: 1rem 3rem;
      transition: all 0.3s ease-in-out;
      background-color: ${({ headerBackground }) =>
        headerBackground ? "#000000dc" : "none"};
    }
  }
  .tracks {
    display: flex;
    margin: 0 2rem;
    flex-direction: column;
    margin-bottom: 5rem;
    .row {
      padding: 0.5rem 1rem;
      display: grid;
      grid-template-columns: 0.3fr 3.4fr 2fr 0.1fr;
      cursor: pointer;
      &:hover {
        background-color: rgba(0, 0, 0, 0.7);
      }
      .col {
        display: flex;
        color: #dddcdc;
        align-items: center;
      }
      .detail {
        gap: 1rem;
        img {
          height: 50px;
        }
        .info {
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
`;

import { useContext, useEffect } from "react";
import Login from "./components/Login";
import Spotify from "./components/Spotify";
import { stateContext } from "./utils/StateProvider";

function App() {
  const {state,dispatch} = useContext(stateContext);
  
  useEffect(() => {
   const hash=window.location.hash
   if (hash) {
    const token =hash.substring(1).split("&")[0].split("=")[1]
    dispatch({type:"SET_TOKEN",payload:token})
   }
  }, [dispatch,state.token]);
  
  return (
    <>
      {state.token ? <Spotify/> : <Login/>}
    </>
  );
}

export default App;

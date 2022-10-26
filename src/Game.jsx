import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Postprocessing } from "./Postprocessing.jsx";
import { Ground } from "./Ground.jsx";
import { Level } from "./Level.jsx";
import { Enemy } from "./Enemy.jsx";
import { Enemy2 } from "./Enemy2.jsx";
import { Player } from "./Player.jsx";
// import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://localhost:3002/";

export function Game() {

	const [ playing, setPlaying ] = useState( false );
	const [ user, setUser ] = useState();
	const [ currentUser, setCurrentUser ] = useState();
	const [ isPopup, setIsPopup ] = useState(true);

	// const socket = socketIOClient(ENDPOINT);
	
	const [ players1, setPlayers1 ] = useState([]);

	useEffect( () => {
		window.addEventListener(
		"pointerdown",
		() => setPlaying( true ),
		{ once: true }
	)


	

	}, [] );

	const addUser = () => {
		setIsPopup(false)
		// socket.emit("addPlayer", {name:user,  position:{ positionZ:-15, positionY:1, positionX:3} } )

		// socket.on("playersData", playersData => {
		// 	console.log(playersData,'playersData')
		// 	setPlayers1(playersData)
		// });
		// console.log(user)
	}
	const updatePlayer = (name,x) => {
		setCurrentUser({name:name,  position:{ positionZ:x.z, positionY:x.y, positionX:x.x} })
		// emit USER_ONLINE event
		// socket.emit("updatePlayers", {name:name,  position:{ positionZ:x.z, positionY:x.y, positionX:x.x} }); 

		// socket.on("playersData", playersData => {
		// 	console.log(playersData,'playersData')
		// 	setPlayers1(playersData)
		// });
	}

	return (
		<>
		{isPopup ?
		<div className="userPopup">
			{/* <input type="text" name="user" placeholder="Add Your Name" onChange={(e)=>setUser(e.target.value)} />  */}
			<button type="button" onClick={()=>addUser()}>Submit</button>
		</div>
		: 
		<Canvas
			// dpr={ 10}
			// gl={{ antialias: false }}
		>
			{/* <Postprocessing /> */}
			<ambientLight intensity={0.2}  />
    		<pointLight position={[10, 10, 10]} />
			{/* <Ground /> */}
			<Level />
			{/* <Enemy2/> */}
			{/* { playing && <><Enemy positionZ={1}/><Enemy positionZ={2}/><Enemy positionZ={3}/></> } */}

			{/* {players1.length>0 && players1.map((item)=>
				item.name != user &&
				 <Enemy2 name={item} positionZ={item.position.positionZ} positionY={item.position.positionY}  positionX={item.position.positionX} /> 
			)} */}
			<Player playing={ playing } position={[ 0, 2.5, 5]} updated={(x)=>updatePlayer(user,x)} />
		</Canvas>
		}
		</>
		
	);

}

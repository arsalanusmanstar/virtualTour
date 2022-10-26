import { useRef, useState } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, PositionalAudio } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { Text } from "./Text.jsx";

import enemy_glb from "./assets/popup.glb";
import enemy_laugh_mp3 from "./assets/enemy_laugh.mp3";

export function Enemy2({name,positionZ,positionY,positionX}) {

	const enemy = useRef();
	const [ geometry ] = useState( useLoader(GLTFLoader, enemy_glb).scene.children[0].geometry );
	const [ distort, setDistort ] = useState( 0.5 );

	const [ score, setScore ] = useState( 0 );

	const { scene } = useThree();

	
	const [ showPopup, setShowPopup ] = useState( false );
			


	useFrame( function (_, delta) {

		const player = scene.getObjectByName( "player" );
		// const x = player.position.x;
		// const z = player.position.z;

		// const speed = 2.75;
		// const distance = 0;

		// enemy.current.lookAt( x, 0, z );

		enemy.current.position.x = positionX

		// if( enemy.current.position.x < x ) enemy.current.position.x += speed * delta;
		// else if( enemy.current.position.x > x ) enemy.current.position.x -= speed * delta;
		// if( enemy.current.position.z < z ) enemy.current.position.z += speed * delta;
		// else if( enemy.current.position.z > z ) enemy.current.position.z -= speed * delta;

		// if( enemy.current.position.distanceToSquared(player.position) < 7 ) {

		// 	setDistort( 0.5 );
		// 	enemy.current.position.x = player.position.x + ( (Math.random() > 0.5) ? distance : -distance );
		// 	enemy.current.position.z = player.position.z + ( (Math.random() > 0.5) ? distance : -distance );

		// 	if( score > 0 ) setScore( (score) => score - 1 );
		// }
	} );

	return (
		<mesh
			ref={ enemy }
			scale={ 1 }
			position-z={ positionZ }
			position-y={ positionY }
			geometry={ geometry }
			onPointerUp={ function (e) {

				
				if( Math.round(distort) < 16 ) {
					
					setDistort( (distort) => distort * 2 );
					setShowPopup(showPopup?false:true)
				}
				else {

					const player = scene.getObjectByName( "informationDepart" );


					const distance = 30;

					setDistort( 0.5 );
					enemy.current.position.x = player.position.x + ( (Math.random() > 0.5) ? distance + positionX  : -distance + positionX );
					enemy.current.position.z = player.position.z + ( (Math.random() > 0.5) ? distance + positionZ  : -distance + positionZ );

					setScore( (score) => score + 1 );
				}
			} }
		>
			{showPopup && 
			<Text
				content={ "Good Residence" }
				size={ 1}
				height={2.5}
			/>}
			<PositionalAudio
				url={ enemy_laugh_mp3 }
				autoplay
			/>
		</mesh>
	);

}

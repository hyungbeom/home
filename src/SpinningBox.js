import {useRef, useState} from 'react'
import {useCursor, useGLTF} from '@react-three/drei'
import * as THREE from 'three'
export function SpinningBox({ scale, ...props }) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    useCursor(hovered)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    // useFrame((state, delta) => (ref.current.rotation.x = ref.current.rotation.y += delta))
    // Return the view, these are regular Threejs elements expressed in JSX
    const {scene} = useGLTF('/logo.glb')


    return (
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? scale * 1.4 : scale * 1.2}
            onClick={(event) => click(!clicked)}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}>
            <primitive object={scene} meshStandardMaterial={new THREE.MeshBasicMaterial({color : 'black'})} />
            <meshStandardMaterial color={hovered ? 'black' : 'black'}/>
        </mesh>
    )
}

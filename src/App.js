import {Canvas, useFrame} from '@react-three/fiber'
import {BakeShadows, Html, MeshReflectorMaterial, Text3D, useGLTF, useProgress} from '@react-three/drei'
import {Bloom, DepthOfField, EffectComposer} from '@react-three/postprocessing'
import {easing} from 'maath'
import {suspend} from 'suspend-react'
import {Computers, Instances} from './Computers'
import {Button, Input, message, Modal} from "antd";
import {Suspense, useState} from "react";
import {useMediaQuery} from 'react-responsive';
import SendMail from "./SendMail";

const suzi = import('@pmndrs/assets/models/bunny.glb')

export default function App() {

    const isMobile = useMediaQuery({maxWidth: 767});

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [messageApi, contextHolder] = message.useMessage();

    const warning = () => {
        messageApi.open({
            type: 'success',
            content: <>
                <div style={{fontSize: 19, fontWeight: 700}}> &nbsp; 리뉴얼 준비중 입니다.</div>
            </>,
            icon: <img src={'/logo.png'} width={'120px'}/>
        });
    };

    const Loading = () => {
        const {progress} = useProgress();
        return <Html center>
            <img src="/logo.png" alt=""/>
            <div style={{textAlign: 'center'}}> {`Loading: ${progress.toFixed(0)}%`}</div>

        </Html>;
    };
    return (
        <>
            <Canvas shadows dpr={[1, 1.5]} camera={{position: [3, 1, 5.5], fov: 45, near: 1, far: 20}}
                    eventSource={document.getElementById('root')} eventPrefix="client">
                <Suspense fallback={<Loading/>}>
                    {/* Lights */}
                    <color attach="background" args={['black']}/>
                    <hemisphereLight intensity={isMobile ? 0.6 : 0.15} groundColor="black"/>
                    <spotLight decay={0} position={[10, 20, 10]} angle={0.12} penumbra={1} intensity={8} castShadow
                               shadow-mapSize={1024}/>
                    {/* Main scene */}
                    <group position={isMobile ? [-2.8, -1, 0] : [-0, -1, 0]}>
                        {/* Auto-instanced sketchfab model */}
                        <Instances>
                            <Computers scale={0.5}/>
                        </Instances>
                        {/* Plane reflections + distance blur */}
                        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
                            <planeGeometry args={[50, 50]}/>
                            <MeshReflectorMaterial
                                blur={[300, 30]}
                                resolution={2048}
                                mixBlur={1}
                                mixStrength={180}
                                roughness={1}
                                depthScale={1.2}
                                minDepthThreshold={0.4}
                                maxDepthThreshold={1.4}
                                color="#202020"
                                metalness={0.8}
                            />
                        </mesh>
                        <Text3D
                            position={[-1, 0, 1]}
                            font="/Roboto Condensed_Bold.json" // 꼭 .json 폰트여야 해!
                            size={0.5}
                            height={0.08}          // 두께감 여기서 조절!
                            curveSegments={12}
                            bevelEnabled
                            bevelSize={0.01}
                            bevelThickness={0.005}
                        >
                            PROGIST
                            <meshStandardMaterial color="#C17F02"/>
                        </Text3D>
                        {/* Bunny and a light give it more realism */}
                        <Bun scale={0.4} position={[0, 0.3, 0.5]} rotation={[0, -Math.PI * 0.85, 0]}/>
                        <pointLight distance={1.5} intensity={1} position={[-0.15, 0.7, 0]} color="orange"/>
                    </group>
                    {/* Postprocessing */}
                    <EffectComposer disableNormalPass>
                        <Bloom luminanceThreshold={0} mipmapBlur luminanceSmoothing={0.0} intensity={5}/>
                        <DepthOfField target={[0, 0, 13]} focalLength={0.3} bokehScale={10} height={700}/>
                    </EffectComposer>
                    {/* Camera movements */}
                    <CameraRig/>
                    {/* Small helper that freezes the shadows for better performance */}
                    <BakeShadows/>
                </Suspense>
            </Canvas>
            <div style={{
                color: 'white',
                position: 'absolute',
                top: '15%',
                left: isMobile ? 20 : 50,
                zIndex: 2,
                fontWeight: 800
            }}
                 className="fade-in">

                <div style={{fontSize: isMobile ? 50 : 80}}>
                    Turning your vision
                </div>
                <div style={{fontSize: isMobile ? 50 : 80}}>
                    into <span style={{color: "orange"}}>REALITY</span>
                </div>
                <div style={{fontSize: isMobile ? 19 : 30, paddingTop: 50, fontWeight: 500}}>
                    <div style={{
                        fontSize: isMobile ? 18 : 20,
                        paddingBottom: 10,
                        color: 'orange',
                        fontWeight: 700
                    }}>2025년에도 역시
                    </div>
                    <div>
                        상상하는 모든 것들을 현실로 보여드립니다.
                    </div>
                    <div>
                        <span style={{color: 'orange'}}>프로지스트</span>가 이루어 드리겠습니다.
                    </div>
                </div>


                <div style={{
                    paddingTop: 80,
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    width: isMobile ? '100%' : 400,
                    gap: isMobile ? 10 : 40,
                    opacity : isMobile ? 0.7 : 1
                }}>
                    <button className={isMobile ? 'buttons' : 'button'} onClick={warning}>
                        Introduce
                    </button>
                    <button className={isMobile ? 'buttons' : 'button'} onClick={warning}>
                        Work Flow
                    </button>
                    <button className={isMobile ? 'buttons' : 'button'} onClick={() => {
                        setIsModalOpen2(true);
                    }}>
                        Contact Us
                    </button>
                    <button className={isMobile ? 'buttons' : 'button'} onClick={showModal}>
                        Way to Come
                    </button>
                </div>

            </div>
            <Modal title={<div style={{display: 'flex', justifyContent: 'space-between', padding: '0px 11px'}}>
                <div>프로지스트 오시는길</div>
                <Button size={'small'} style={{width: 60, fontSize: 12, backgroundColor: 'orange'}}
                        onClick={handleCancel}>닫기</Button></div>} open={isModalOpen} footer={null}
                   onOk={handleOk} onCancel={handleCancel}>

                <div style={{width: '100%', margin: '30px auto'}}>
                    <img src='/img.png' width={'100%'} alt="" style={{border: '1px solid lightGray'}}/>
                </div>

                <div style={{borderTop: '1px solid lightGray', paddingTop: 20}}>
                    주소 : 서울시 강남구 논현동 36-11 능원타워 401
                    <br/>
                    연락처 : 010-8636-2553
                </div>
            </Modal>
            <Modal title={<div style={{display: 'flex', justifyContent: 'space-between', padding: '0px 11px'}}>
                <div>문의하기</div>
                <Button size={'small'} style={{width: 60, fontSize: 12, backgroundColor: 'orange'}} onClick={() => {
                    setIsModalOpen2(false)
                }}>닫기</Button></div>} open={isModalOpen2} footer={null}
                   onOk={() => setIsModalOpen2(true)} onCancel={() => setIsModalOpen2(false)}>

                <SendMail/>
            </Modal>
            {contextHolder}
        </>
    )
}

function Bun(props) {
    const {nodes} = useGLTF(suspend(suzi).default)
    console.log(nodes)
    return (
        <mesh receiveShadow castShadow geometry={nodes.mesh.geometry} {...props}>
            <meshStandardMaterial color="#222" roughness={0.5}/>
        </mesh>
    )
}

function CameraRig() {
    useFrame((state, delta) => {
        easing.damp3(state.camera.position, [2, (1 + state.pointer.y) / 2, 5.5], 0.5, delta)

        state.camera.lookAt(-0.5, 0.5, 2.8)
    })
}

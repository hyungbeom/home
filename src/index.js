import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App'
import { Logo } from '@pmndrs/branding'

function Overlay() {
    return (
        <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} className="fade-in">
            <div style={{position: 'absolute', bottom: 0,fontSize: '23px', backgroundColor : 'white', color : 'black', opacity : 0.5}}>
                <marquee scrollamount="10">

                    &nbsp; &nbsp;&nbsp;&nbsp;                   &nbsp; &nbsp;&nbsp;&nbsp;
                    <img
                        src="/with.png" height={28} alt=""/>
                    &nbsp; &nbsp;&nbsp;&nbsp;                   &nbsp; &nbsp;&nbsp;&nbsp;
                    <img
                        src="/with.png" height={28} alt=""/>
                    &nbsp; &nbsp;&nbsp;&nbsp;                   &nbsp; &nbsp;&nbsp;&nbsp;
                    <img
                        src="/with.png" height={28} alt=""/>
                    &nbsp; &nbsp;&nbsp;&nbsp;                   &nbsp; &nbsp;&nbsp;&nbsp;
                    <img
                        src="/with.png" height={28} alt=""/>

                    &nbsp; &nbsp;&nbsp;&nbsp;                   &nbsp; &nbsp;&nbsp;&nbsp;
                    <img
                        src="/with.png" height={28} alt=""/>
                    &nbsp; &nbsp;&nbsp;&nbsp;                   &nbsp; &nbsp;&nbsp;&nbsp;
                    <img
                        src="/with.png" height={28} alt=""/>
                    &nbsp; &nbsp;&nbsp;&nbsp;                   &nbsp; &nbsp;&nbsp;&nbsp;
                    <img
                        src="/with.png" height={28} alt=""/>
                    &nbsp; &nbsp;&nbsp;&nbsp;                   &nbsp; &nbsp;&nbsp;&nbsp;
                    <img
                        src="/with.png" height={28} alt=""/>
                </marquee>

            </div>
            <div style={{height: 60}}>
                <img src="/logo.png" alt="" style={{padding: 20, cursor: 'point'}}/>
            </div>



        </div>
    )
}

// @ts-ignore
createRoot(document.getElementById('root')).render(
    <>
        <App/>
        <Overlay/>
    </>
)

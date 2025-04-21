import {Button, Input} from "antd";
import TextArea from "antd/es/input/TextArea";
import {useState} from "react";
import emailjs from '@emailjs/browser';
export default function SendMail(){


    const [info, setInfo] = useState({company : '', mail : '', phone : '', contents : ''})

    function sendEmail(){

        emailjs.send('service_9vw862j', 'template_ymyvyfe', info, 'TtVIQcqr5J5KL2093')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error);
                console.log(error.text);
            });

    }

    return <>

        <div style={{display: 'grid', gridTemplateColumns: '60px 1fr', gap: 10, fontSize: 13, paddingTop: 30}}>

            <div>회사명</div>
            <Input value={info['company']}  onChange={e => {
                setInfo(v => {
                    return {...v, company: e.target.value}
                })
            }}/>

            <div>메일주소</div>
            <Input value={info['mail']}  onChange={e => {
                setInfo(v => {
                    return {...v, mail: e.target.value}
                })
            }}/>

            <div>연락처</div>
            <Input value={info['phone']}  onChange={e => {
                setInfo(v => {
                    return {...v, phone: e.target.value}
                })
            }}/>

            <div>문의내용</div>
            <TextArea style={{resize: 'none'}} rows={10} value={info['contents']} onChange={e => {
                setInfo(v => {
                    return {...v, contents: e.target.value}
                })
            }}/>
        </div>

        <div style={{textAlign: 'center'}}>
            <Button style={{
                backgroundColor: '#ff6000',
                color: 'white',
                width: 200,
                margin: '20px auto',
                height: 40
            }} onClick={sendEmail}>전송하기</Button>
        </div>
    </>
}
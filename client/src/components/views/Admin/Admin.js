import React, {useEffect, useState} from 'react'
import axios from 'axios'
import AlertList from './AlertList/AlertList'
import MobileAlertList from './AlertList/MobileAlertList'
import { Typography, Button, Input , Form } from 'antd'
import { Notest } from '../LandingPage/Notest'
const { Title } = Typography

function Admin() {
    
    const [alertInfo, setalertInfo] = useState([])
    const [User, setUser] = useState("")
    useEffect(() => {
    axios.get('/api/alert')
         .then(response => {
             if(response.data.success){
                setalertInfo(response.data.alertInfo)
                
             }
             else{
                 alert("Alert 정보를 가져오는데 실패하였습니다")
             }
         })
        }, [])

const clickHandler = () => {
    let variables = {
        id : Notest
    }
    axios.post('/api/hospital/add', variables)
         .then(response => {
             if(response.data.success){
                alert('데이터 추가 SUCCESS')
                
             }
             else{
                 alert(response.data.message)
             }
         })
}

const UserHandler = (e) => {
    setUser(e.target.value)
}

const submitHandler = () => {
    if(window.confirm('정말 강퇴하시겠습니까?')){
        let variables = {
            nickname : User
        }
        axios.post('/api/users/getout', variables)
             .then(response => {
                 if(response.data.success){
                    alert('GET OUT SUCCESS')
                 }
                 else{
                     alert("GET OUT ERROR")
                 }
             })
    }
}
    return (
        <div className='postlist'>
            <div style = {{ display:'flex', justifyContent:'center'}}>
                <Title level={3}>Admin Page</Title>  
                
            </div>
            <div style={{border : '1px solid #eee'}}></div>
            <br/>
            <div style={{display:'flex', justifyContent:'center'}}>
                <Button type='danger' shape='round' onClick={clickHandler}>Data 추가</Button> 
            </div>    
            <br/>
            <div style={{border : '1px solid #eee'}}></div>
            <br/>
            <div style={{display:'flex', justifyContent:'center'}}>
                <Form style={{display:'flex', justifyContent:'center'}} onSubmit={submitHandler}>
                    <Input onChange={UserHandler} value={User} placeholder='User Nickname'/>
                    &nbsp; &nbsp;
                    <Button type='danger' shape='round' onClick={submitHandler}>Get Out User</Button> 
                </Form>
                
            </div>
            <br/>    
            <div style={{border : '1px solid #eee'}}></div>
            <div className='web_board'>
                <AlertList list={alertInfo}/>
            </div>
            <div className='mobile_board'>
                <MobileAlertList/>
            </div>
            
            
        </div>
    )
}

export default Admin

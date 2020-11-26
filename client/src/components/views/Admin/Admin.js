import React, {useEffect, useState} from 'react'
import axios from 'axios'
import AlertList from './AlertList/AlertList'
import MobileAlertList from './AlertList/MobileAlertList'
import { Typography, Button } from 'antd'
import { Notest } from '../LandingPage/Notest'
const { Title } = Typography

function Admin() {
    
    const [alertInfo, setalertInfo] = useState([])
    
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
                 alert("데이터 추가 ERROR")
             }
         })
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

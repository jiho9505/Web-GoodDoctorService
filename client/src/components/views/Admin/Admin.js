import React, {useEffect, useState} from 'react'
import axios from 'axios'
import AlertList from './AlertList/AlertList'
import MobileAlertList from './AlertList/MobileAlertList'
import { Typography } from 'antd'

const { Title } = Typography

function Admin() {
    
    const [alertInfo, setalertInfo] = useState([])
    
    useEffect(() => {
    axios.get('/api/alert')
         .then(response => {
             if(response.data.success){
                setalertInfo(response.data.alertInfo)
                console.log(response.data.alertInfo)
             }
             else{
                 alert("Alert 정보를 가져오는데 실패하였습니다")
             }
         })
        }, [])

    return (
        <div className='postlist'>
            <div style = {{ display:'flex', justifyContent:'center'}}>
                <Title level={3}>Admin Page</Title>   
            </div>
            <div style={{border : '1px solid #eee'}}></div>
            <br/>
            <div className='web_board'>
                <AlertList list={alertInfo}/>
            </div>
            <div className='mobile_board'>
                <MobileAlertList list={alertInfo}/>
            </div>
            
            
        </div>
    )
}

export default Admin

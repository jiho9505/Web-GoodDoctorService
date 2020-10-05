import React, {useEffect, useState} from 'react'
import axios from 'axios'
import AlertList from './AlertList/AlertList'
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
        <div style = {{ width: '75%', margin: '3rem auto' }}>
            <div style = {{ display:'flex', justifyContent:'center'}}>
                <Title level={3}>Admin Page</Title>   
            </div>
            <div style={{border : '1px solid #eee'}}></div>
            <p style= {{ textAlign:'center'}}>Today View</p>
            <p style= {{ textAlign:'center'}}>Total View</p>
            <div style={{border : '1px solid #eee'}}></div>
            <br/>
            <AlertList list={alertInfo}/>
        </div>
    )
}

export default Admin

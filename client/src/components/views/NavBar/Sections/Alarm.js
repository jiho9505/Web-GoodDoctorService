import React, {useState} from 'react'
import { Menu, Dropdown , Empty } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from 'axios'
import AlarmItem from './AlarmItem'

function Alarm() {
    
    const [alarmInfo, setalarmInfo] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(5)
    const [PostSize, setPostSize] = useState(0)

    const user = useSelector(state => state.user)

    const onLoadMore = () => {
        let skip = Skip + Limit;
        
        let body = {
            userId : localStorage.getItem('userId'),
            skip : skip,
            limit : Limit
          }
      
          axios.post('/api/alarm/', body)
               .then(response => { 
                 if(response.data.success){ 
                    setalarmInfo([...alarmInfo,...response.data.result])
                    setPostSize(response.data.postSize)
                 

                 }
                 else{
                    alert('알림 기능 Error 발생')
                 }
               })    
  
        setSkip(skip)
      }

    const menu = (
        <Menu style={{overflowY : 'scroll' , height : '350px'}}>
            <div>
                &nbsp;&nbsp;알림
            </div>
            <div style={{border : '1px solid #eee'}}></div>
            {alarmInfo.length === 0 && 
                <Menu.Item>
                    <Empty/>
                </Menu.Item>}
            {alarmInfo && alarmInfo.map((item,index) => (
                
                <Menu.Item key={index}>
                    <AlarmItem item={item}/>
                         
                </Menu.Item>
            ))}
            {PostSize >= Limit &&
                <div style={{display:'flex', justifyContent:'center'}}>
                    <button onClick={onLoadMore} style={{borderRadius:'5px' , border:'0px'}}>더보기</button>
                </div>
            }
        </Menu>
      );
    
    const clickHandler = () => {
        let body = {
            userId : localStorage.getItem('userId'),
            skip : 0,
            limit : Limit
          }
      
          axios.post('/api/alarm/', body)
               .then(response => { 
                 if(response.data.success){ 
                    setalarmInfo(response.data.result)
                    setPostSize(response.data.postSize)
                    
                 }
                 else{
                    alert('알림 기능 Error 발생')
                 }
               })    
        setSkip(0)
    }

    if (user.userData && user.userData.isAuth) {
        
        return (
            <div className='bell'>
                
                <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter" arrow>
                    <NotificationOutlined  onClick={clickHandler} rotate={180}/>  
                </Dropdown>
            </div>  
        )
        }
    else{
        return <div></div>
    }
        
}

export default withRouter(Alarm)
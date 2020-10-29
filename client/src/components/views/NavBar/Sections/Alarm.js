import React from 'react'
import { Menu, Dropdown, Badge , Empty} from 'antd';
import { NotificationOutlined , UserOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import moment from 'moment';

function Alarm(props) {
    const user = useSelector(state => state.user)
    const info = props.info
    console.log(info)
    const menu = (
        <Menu>
            {info.length === 0 && 
                <Menu.Item>
                    <Empty/>
                </Menu.Item>}
            {info && info.map((item,index) => (
                <Menu.Item key={index}>
                    <a href={`/community/${item.postId._id}`}>
                        <span style={{fontSize:'12px'}}> 
                            '{item.toWhom.nickname}'님이 당신의 {item.choice === true ? '댓글' : '게시글'}에 댓글을 남겼습니다
                        </span>
                        <br/>
                        <span style={{fontSize:'12px'}}> 
                            {moment(item.createdAt).format("YYYY-MM-D") +' '+ moment(item.createdAt).format('LT')}
                        </span>  
                    </a>        
                </Menu.Item>
            ))}
        </Menu>
      );

    if (user.userData && user.userData.isAuth) {
        return (
            <div className='bell'>
                <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter" arrow>
                    <NotificationOutlined rotate={180}/>
                </Dropdown>
            </div>  
        )
        }
    else{
        return <div></div>
    }
        
}

export default withRouter(Alarm)
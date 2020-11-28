import React, { useState ,useEffect } from 'react'
import { Descriptions , Button , List, Avatar , Typography } from 'antd';
import axios from 'axios'
import moment from 'moment'
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


const { Title } = Typography 

function MyPage() {
    const [user, setuser] = useState({})

    useEffect(() => {
        let body = {
            _id : localStorage.getItem("userId")
        }
        axios.post('/api/users/info', body)
             .then(response => { 
                 if(response.data.success){
                    setuser(response.data.userInfo)
                 }
                 else{
                     alert('유저 정보를 가져오는데 실패하였습니다')
                 }
             })

    }, [])

    return (
        <div>

          
            <div className='mypage'>
                <div style = {{ display:'flex' , justifyContent:'center' }}>
                    <Title level={4}>My Page</Title>
                </div>

                <div style={{border : '1px solid #eee'}}></div>

                <List.Item>
                        <List.Item.Meta
                                avatar={<Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />}
                                title={user.nickname}
                                description={'가입일자 ' + moment(user.createdAt).format("YYYY-MM-D")}
                            />
                            <div></div>
                </List.Item>
                <div style={{border : '1px solid #eee'}}></div>
                <Descriptions title="설정">
                    <Descriptions.Item label="비밀번호 변경">
                        <Link to="/pwdchange"><Button>Click</Button></Link>
                    </Descriptions.Item>
                </Descriptions>
                <div style={{border : '1px solid #eee'}}></div>
                <Descriptions title="내가 쓴 글 | 댓글">
                    
                    <Descriptions.Item label="내가 쓴 글보기">
                    <Link to="/mypost"><Button>Click</Button></Link></Descriptions.Item>
                    <div className='in_mypage'></div>
                    <div className='in_mypage'></div>
                    <Descriptions.Item label="내가 쓴 댓글보기">
                         <Link to="/mycomment"><Button>Click</Button></Link>
                    </Descriptions.Item>
                </Descriptions>
                <div style={{ border : '1px solid #eee'}}></div>
                <br/>
                <div style={{ display:'flex' , justifyContent:'center'}}>
                 <Link to="/removeuser">
                    <Button type='danger' shape='round'>회원탈퇴</Button>
                </Link>
                </div>
                
            </div>
          
        </div>
    )
}

export default MyPage



import React, { useState ,useEffect } from 'react'
import { Descriptions , Button , List, Avatar , Typography } from 'antd';
import axios from 'axios'
import MyPost from './MyPost/MyPost'
import MyComment from './MyComment/MyComment'
import moment from 'moment'
import { UserOutlined } from '@ant-design/icons';
import PwdChange from './PwdChange/PwdChange'
import RemoveUser from './RemoveUser/RemoveUser'


const { Title } = Typography 

function MyPage() {
    const [user, setuser] = useState({})
    const [board, setboard] = useState({})
    const [comment, setcomment] = useState({})
    const [show, setshow] = useState(true)
    const [showPost, setshowPost] = useState(false)
    const [showComment, setshowComment] = useState(false)
    const [showChange, setshowChange] = useState(false)
    const [showRemove, setshowRemove] = useState(false)

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
             
        axios.post('/api/board/info', body)
            .then(response => { 
                if(response.data.success){
                setboard(response.data.boardInfo)
                }
                else{
                    alert('글 정보를 가져오는데 실패하였습니다')
                }
            })
        axios.post('/api/comment/info',body)
            .then(response => { 
                if(response.data.success){
                setcomment(response.data.CommentInfo)
                console.log(response.data.CommentInfo)
                }
                else{
                    alert('댓글 정보를 가져오는데 실패하였습니다')
                }
            })
    }, [])

    const postHandler = () => {
        setshow(false)
        setshowPost(true)
    }

    const commentHandler = () => {
        setshow(false)
        setshowComment(true)
    }

    const pwdHandler = () => {
        setshow(false)
        setshowChange(true)
    }

    const removeHandler = () => {
        if(window.confirm('회원탈퇴를 하시겠습니까?')){
            setshow(false)
            setshowRemove(true)
        }
    }
    return (
        <div>

          {show &&
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
                <Descriptions.Item label="비밀번호 변경"><Button onClick={pwdHandler}>Click</Button></Descriptions.Item>
                </Descriptions>
                <div style={{border : '1px solid #eee'}}></div>
                <Descriptions title="내가 쓴 글 | 댓글">
                    
                    <Descriptions.Item label="내가 쓴 글보기"><Button  onClick={postHandler}>Click</Button></Descriptions.Item>
                    <div className='in_mypage'></div>
                    <div className='in_mypage'></div>
                    <Descriptions.Item label="내가 쓴 댓글보기"><Button onClick={commentHandler}>Click</Button></Descriptions.Item>
                </Descriptions>
                <div style={{ border : '1px solid #eee'}}></div>
                <br/>
                <div style={{ display:'flex' , justifyContent:'center'}}>
                    <Button type='danger' shape='round' onClick={removeHandler}>회원탈퇴</Button>
                </div>
                
            </div>
          }
          {showPost && <MyPost list={board}/>}
          {showComment && <MyComment list={comment}/>}
          {showChange && <PwdChange/>}
          {showRemove && <RemoveUser/>}
        </div>
    )
}

export default MyPage



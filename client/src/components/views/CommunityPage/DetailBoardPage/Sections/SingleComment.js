import React, { useState } from 'react'
import { Comment, Avatar, Button, Input , Badge , message } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { UserOutlined , DeleteOutlined , AlertTwoTone } from '@ant-design/icons';
import { withRouter } from "react-router-dom"
import moment from 'moment'
const { TextArea } = Input;

function SingleComment(props) {
    const user = useSelector(state => state.user);
    const [CommentValue, setCommentValue] = useState("")
    const [OpenReply, setOpenReply] = useState(false)
    const writer = props.writer

    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const openReply = () => {
        setOpenReply(!OpenReply)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id,
            content: CommentValue
        }


        Axios.post('/api/comment', variables)
            .then(response => {
                if (response.data.success) {
                    setCommentValue("")
                    setOpenReply(!OpenReply)
                    props.refreshFunction(response.data.result)
                } else {
                    alert('댓글 저장 실패!')
                }
            })
    }
    
    const actions = [
        <div style={{ fontSize : '13px' , color : '#979797'}}>
            <span>{moment(props.comment.createdAt).format("YYYY-MM-D") +' '+ moment(props.comment.createdAt).format('HH:mm')}</span>
            &nbsp;&nbsp;
            <span onClick={openReply} key="comment-basic-reply-to">대댓글 달기</span>
        </div>
        
    ]

    const actions_child = [
        <div style={{ fontSize : '13px' , color : '#979797'}}>
            <span>{moment(props.comment.createdAt).format("YYYY-MM-D") +' '+ moment(props.comment.createdAt).format('HH:mm')}</span>
        </div>
        
    ]

    const deleteHandler = () => {
        if(window.confirm('이 댓글을 삭제하시겠습니까?')){        
            Axios.delete(`/api/comment?id=${props.comment._id}`)
                 .then(response => {
                     if(response.data.success){
                        window.location.reload()
                     }
                     else{
                         alert("댓글 삭제에 실패하였습니다!")
                     }
                 })
        }

    }

    const alertHandler = () => {
        if(window.confirm('이 댓글을 신고하시겠습니까?')){
            let key = window.prompt('신고 사유를 적어주시기 바랍니다')
            if(key){
                let body = {
                    userId:user.userData._id,
                    postId:props.postId,
                    commentId:props.comment._id,
                    contents : key
                }
                Axios.post('/api/alert/',body)
                     .then(response => {
                         if(response.data.success){
                            message.config({
                                top: 100
                              })
                            message.success('신고가 접수되었습니다.')
                         }
                         else{
                             alert('Error 발생 - 신고기능 장애')
                         }
                        })
            }
            
        }
    }
    
    
    const renderComment = (actions) => {
        return <Comment
                actions={actions}
                author={writer.nickname === props.comment.writer.nickname ? 
                    <span>
                    {props.comment.writer.nickname}
                    &nbsp;&nbsp;
                    <Badge  count='작성자' style={{ backgroundColor: '#52c41a' }} />
                    {user.userData._id === props.comment.writer._id || user.userData.isAdmin ? 
                    <span style={{ fontSize : '15px'}}>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <DeleteOutlined  onClick={deleteHandler}/>
                    </span> : <span>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <AlertTwoTone twoToneColor="#eb2f96" style={{ fontSize : '18px'}} onClick={alertHandler}/>
                            </span>}
                </span> : 
                <span>{props.comment.writer.nickname}
                    &nbsp;&nbsp;
                    {user.userData._id === props.comment.writer._id || user.userData.isAdmin ? 
                        <span style={{ fontSize : '15px'}}>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <DeleteOutlined  onClick={deleteHandler} />
                        </span> : <span>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <AlertTwoTone twoToneColor="#eb2f96" style={{ fontSize : '18px'}} onClick={alertHandler}/>
                            </span>}
                </span>
                }
                avatar={
                    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                }
                content={
                    <p>
                        {props.comment.content}
                    </p>
                }
            ></Comment>
    }


    return (
        <div>
            { user && user.userData && props.comment.writer &&
        <div>
            
            {props.child ? renderComment(actions_child) :
            renderComment(actions)}


            {OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <TextArea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={handleChange}
                        value={CommentValue}
                        placeholder="댓글을 작성해주세요"
                    />
                    <br />
                    <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>
                        <div className='web_board'>댓글 등록</div>
                        <div className='mobile_board'>등록</div>
                    </Button>
                </form>
            }

        </div>
    }
        </div>
    )
}

export default withRouter(SingleComment)
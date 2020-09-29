import React, { useState } from 'react'
import { Comment, Avatar, Button, Input , Badge } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { UserOutlined , DeleteOutlined  } from '@ant-design/icons';
import { withRouter } from "react-router-dom"
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
        <span onClick={openReply} key="comment-basic-reply-to">대댓글 달기</span>
    ]

    const deleteHandler = () => {
        if(window.confirm('이 댓글을 삭제하시겠습니까?')){        
            Axios.delete(`/api/comment?id=${props.comment._id}&cid=${props.postId}`)
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

    return (
        <div>
            { user && user.userData && props.comment.writer &&
        <div>
            
            {props.child ? <Comment style={{padding:'0px'}}
                author={writer.nickname === props.comment.writer.nickname ? 
                    <span>
                    {props.comment.writer.nickname}
                    &nbsp;&nbsp;
                    <Badge  count='작성자' style={{ backgroundColor: '#52c41a' }} />
                    {user.userData._id === props.comment.writer._id ? 
                    <span style={{ fontSize : '15px'}}>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <DeleteOutlined  onClick={deleteHandler}/>
                    </span> : ""}
                </span> : 
                <span>{props.comment.writer.nickname}
                    &nbsp;&nbsp;
                    {user.userData._id === props.comment.writer._id ? 
                        <span style={{ fontSize : '15px'}}>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <DeleteOutlined  onClick={deleteHandler} />
                        </span> : ""}
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
                : <Comment
                actions={actions}
                author={writer.nickname === props.comment.writer.nickname ? 
                    <span>
                        {props.comment.writer.nickname}
                        &nbsp;&nbsp;
                        <Badge  count='작성자' style={{ backgroundColor: '#52c41a' }} />
                        {user.userData._id === props.comment.writer._id ? 
                        <span style={{ fontSize : '15px'}}>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <DeleteOutlined  onClick={deleteHandler}/>
                        </span> : ""}
                    </span> : 
                    <span>{props.comment.writer.nickname}
                        &nbsp;&nbsp;
                        {user.userData._id === props.comment.writer._id ? 
                            <span style={{ fontSize : '15px'}}>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <DeleteOutlined  onClick={deleteHandler}/>
                            </span> : ""}
                    </span>
                    }
                avatar={
                    <Avatar style={{ backgroundColor: '#87d068' }} icon={ <UserOutlined />} />
                }
                content={
                    <p>
                        {props.comment.content}
                    </p>
                }
            ></Comment>}


            {OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <TextArea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={handleChange}
                        value={CommentValue}
                        placeholder="댓글을 작성해주세요"
                    />
                    <br />
                    <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>댓글 등록</Button>
                </form>
            }

        </div>
    }
        </div>
    )
}

export default withRouter(SingleComment)
import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';

const { TextArea } = Input;

function SingleComment(props) {
    const user = useSelector(state => state.user);
    const [CommentValue, setCommentValue] = useState("")
    const [OpenReply, setOpenReply] = useState(false)

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


        Axios.post('/api/comment/saveComment', variables)
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

    return (
        <div>
            {props.child ? <Comment style={{padding:'0px'}}
                author={props.comment.writer.nickname}
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
                author={props.comment.writer.nickname}
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
    )
}

export default SingleComment
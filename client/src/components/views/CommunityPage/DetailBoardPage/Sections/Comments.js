import React, { useState } from 'react'
import { Button, Input , Typography } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
const { TextArea } = Input
const { Title } = Typography;

function Comments(props) {
    const user = useSelector(state => state.user)
    const [Comment, setComment] = useState("")
    const writer = props.writer

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            content: Comment,
            writer: user.userData._id,
            postId: props.postId
        }

        if(Comment.length === 0){
            alert('1글자 이상 입력을 해주셔야 등록이 가능합니다')
        }
        else{
            axios.post('/api/comment', variables)
            .then(response => {
                if (response.data.success) {
                    setComment("")
                    props.refreshFunction(response.data.result)
                } else {
                    alert('댓글 저장 실패!')
                }
            })
        }
 
    }

    return (
        <div>
            <br />
            <Title level={4}>댓글</Title>
            <div style={{border : '1px solid #eee'}}></div>      

            {props.CommentLists && props.CommentLists.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment key={index}>
                        <SingleComment writer={writer} comment={comment}  postId={props.postId} 
                        refreshFunction={props.refreshFunction} />
                        <ReplyComment writer={writer} CommentLists={props.CommentLists}  postId={props.postId} 
                        parentCommentId={comment._id} refreshFunction={props.refreshFunction}  />
                    </React.Fragment>
                )
            ))}

            {/* Root Comment Form */}
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleChange}
                    value={Comment}
                    placeholder="댓글을 작성해주세요"
                />
                <br />
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>
                    <div className='web_board'>댓글 등록</div>
                    <div className='mobile_board'>등록</div>
                </Button>
            </form>

        </div>
    )
}

export default Comments
import React, { useEffect, useState } from 'react'
import { Tooltip, Icon } from 'antd';
import Axios from 'axios';

function Likes(props) {

    const [Likes, setLikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    let body = {
        postId: props.postId, userId: props.userId
    };

    useEffect(() => {

        Axios.post('/api/like/getLikes', body)
            .then(response => {
                if (response.data.success) {              
                    setLikes(response.data.likes.length)
 
                    response.data.likes.map(like => {
                        if (like.userId === props.userId) {
                            setLikeAction('liked')
                        }
                    })
                } else {
                    alert('좋아요 정보를 가져오는데 실패하였습니다')
                }
            })

       

    }, [])


    const onLike = () => {
        if (LikeAction === null) {
            Axios.post('/api/like/upLike', body)
                .then(response => {
                    if (response.data.success) {
                        setLikes(Likes + 1)
                        setLikeAction('liked')
                    } else {
                        alert('Up 하는데 실패하였습니다')
                    }
                })}
        else {
            Axios.post('/api/like/unLike', body)
                 .then(response => {
                    if (response.data.success) {        
                            setLikes(Likes - 1)
                            setLikeAction(null)
                    } else {
                            alert('Down 하는데 실패하였습니다')
                        }
                    })        
                }    
    }

    return (
        <React.Fragment>
            
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                        theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
                        onClick={onLike} />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
            </span>&nbsp;&nbsp;
                
        </React.Fragment>
    )
}

export default Likes
import React from 'react'
import moment from 'moment';
import { Link } from 'react-router-dom';

function AlarmItem(props) {

    const item = props.item

    return (

        <div>
            <Link to={`/community/${item.postId._id}`}>
                        <span style={{fontSize:'12px', color: 'black'}}> 
                            '{item.toWhom.nickname}'님이 당신의 {item.choice === true ? '댓글' : '게시글'}에 댓글을 남겼습니다
                        </span>
                        <br/>
                        <span style={{fontSize:'12px', color: 'black'}}> 
                            {moment(item.createdAt).format("YYYY-MM-D") +' '+ moment(item.createdAt).format('LT')} 
                        </span>
                        <span style={{float:'right',fontSize:'12px'}}>Click !</span>  
            </Link>
        </div>
    )
}

export default AlarmItem

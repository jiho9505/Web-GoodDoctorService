import React from 'react'
import moment from 'moment';

function AlarmItem(props) {

    const item = props.item

    return (

        <div>
            <a href={`/community/${item.postId._id}`}>
                        <span style={{fontSize:'12px'}}> 
                            '{item.toWhom.nickname}'님이 당신의 {item.choice === true ? '댓글' : '게시글'}에 댓글을 남겼습니다
                        </span>
                        <br/>
                        <span style={{fontSize:'12px'}}> 
                            {moment(item.createdAt).format("YYYY-MM-D") +' '+ moment(item.createdAt).format('LT')} 
                        </span>
                        <span style={{float:'right',fontSize:'12px'}}>Click !</span>  
            </a>   
        </div>
    )
}

export default AlarmItem

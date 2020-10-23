import React from 'react'
import { Button } from 'antd';
import axios from 'axios'

function RemoveButton(props) {
    const removeHandler = (value,cid) => {
        if(cid){
            axios.delete(`/api/alert?cid=${cid}`)
                .then(response => {
                    if(response.data.success){
                        window.location.reload()
                    }
                    else{
                        alert('Error 발생')
                    }
                })
        }
        else{
            axios.delete(`/api/alert?postid=${value}`)
                .then(response => {
                    if(response.data.success){
                        window.location.reload()
                    }
                    else{
                        alert('Error 발생')
                    }
                })
            }
        }

    return (
        <div>
            <Button onClick={() => {removeHandler(props.postId,props.commentId)}}>삭제</Button> 
        </div>
    )
}

export default RemoveButton

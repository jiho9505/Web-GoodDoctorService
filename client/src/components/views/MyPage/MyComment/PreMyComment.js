import React, {useState, useEffect} from 'react'
import MyComment from './MyComment'
import axios from 'axios'

function PreMyComment() {

    const [comment, setcomment] = useState({})

    useEffect(() => {
        let body = {
            _id : localStorage.getItem("userId")
        }

        axios.post('/api/comment/info',body)
            .then(response => { 
                if(response.data.success){
                setcomment(response.data.CommentInfo)
               
                }
                else{
                    alert('댓글 정보를 가져오는데 실패하였습니다')
                }
            })
    }, [])

    return (
        <div>
            <MyComment list={comment}/> 
        </div>
    )
}

export default PreMyComment

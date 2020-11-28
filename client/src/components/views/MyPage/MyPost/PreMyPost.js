import React, {useState, useEffect} from 'react'
import MobileMyPost from './MobileMyPost'
import MyPost from './MyPost'
import axios from 'axios'

function PreMyPost() {

    const [board, setboard] = useState({})

    useEffect(() => {
        let body = {
            _id : localStorage.getItem("userId")
        }
             
        axios.post('/api/board/info', body)
            .then(response => { 
                if(response.data.success){
                 setboard(response.data.boardInfo)
                }
                else{
                    alert('글 정보를 가져오는데 실패하였습니다')
                }
            })
    }, [])

    return (
 
        <div>
            <div className='web_board'>
                <MyPost list={board}/>
            </div>
            <div className='mobile_board'>
                <MobileMyPost />
            </div>
        </div>
    
    )
}

export default PreMyPost

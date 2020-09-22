import React , {useState,useEffect} from 'react'
import axios from 'axios'
import { Input , Typography} from 'antd'
import { SmileTwoTone } from '@ant-design/icons';

const { Title } = Typography
const { TextArea } = Input

function DetailBoardPage(props) {
    const postId = props.match.params.postId

    const [PostInfo, setPostInfo] = useState([])

    useEffect(() => {
        axios.get(`/api/board?id=${postId}`)
             .then(response => {
                 if(response.data.success){
                     setPostInfo(response.data.result[0])
                     console.log(response.data.result)
                     console.log(PostInfo)
                 }
                }
            )
        
    }, [])
    return (
        <div style = {{ width: '75%', margin: '3rem auto' }}>
            
            <div style={{ textAlign: 'center' }}>
               <Title level={3}>Find good doctors <SmileTwoTone/></Title>
            </div>

            <label style={{fontSize : '16px'}}>제목</label>
            <br />
                   
            <Input  value={PostInfo.title} />
            <br />
            <br />
            <label style={{fontSize : '16px'}}>내용</label>
                    
            <br />
           
            <TextArea  value={PostInfo.description} style={{height:300}} />
    
            <br />
            <br />
            <br/>
            <br/>
            
        </div>
    )
}

export default DetailBoardPage

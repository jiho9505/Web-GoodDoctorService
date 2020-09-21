import React , {useEffect,useState} from 'react'
import { SmileTwoTone, EditOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import NoticeBoard from './NoticeBoard/NoticeBoard'
import SearchTool from './SearchTool/SearchTool'
import Axios from 'axios'

const {Title} = Typography

function  CommunityPage() {
    const [Board, setBoard] = useState([])
  
  useEffect(() => {
    
    Axios.get('/api/board')
         .then(response => {
           if(response.data.success){
              setBoard(response.data.result)
              console.log(response.data.result)
            }
            else{
              alert("게시판 목록을 불러오는데 실패하였습니다.")
            }
          }
        )
         
      
          
  }, [])

    return (
        <div style = {{ width: '75%', margin: '3rem auto' }}>
            
            <div style={{ textAlign: 'center' }}>
                <Title level={3}>Find good doctors <SmileTwoTone/></Title>
            </div>
            <br/>
            <br/>
            <div style={{display:'flex', justifyContent:'flex-end'}}>
               <a href='/write'><Button ><EditOutlined style={{marginTop : 10}} />글쓰기</Button></a>
            </div>
            
            <br/>
            {Board && <NoticeBoard list={Board}/>}
            <SearchTool />

        </div>
    )
}

export default CommunityPage

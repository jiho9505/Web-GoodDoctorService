import React , {useEffect,useState} from 'react'
import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import NoticeBoard from './NoticeBoard/NoticeBoard'
import SearchTool from './SearchTool/SearchTool'
import Axios from 'axios'
import Notification from './Notification/Notification'
import Mobile_Detail from './DetailBoardPage/Mobile_Detail'
function  CommunityPage() {
    const [Board, setBoard] = useState([])
    const [SearchTerms, setSearchTerms] = useState("")
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

  const updateSearchTerms = (newSearchTerm) => {

    setSearchTerms(newSearchTerm)

    Axios.get(`/api/board?term=${newSearchTerm}`)
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
}

    return (
        <div className='postlist'>
            
           
            <br/>
            <br/>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <div style={{marginLeft:'10px'}}>
                <Notification/>
              </div>
              <div style={{marginRight:'10px'}}>
                <a href='/write'><Button ><EditOutlined style={{marginTop : 10}} />글쓰기</Button></a>                
              </div>
            </div>
            
            <br/>
            <div className='web_board'>
              {Board && <NoticeBoard  list={Board}/>}
            </div>
            <div className='mobile_board'>
              <Mobile_Detail/>
            </div>
            
            <div className='spacing'></div>
            <div className='spacing'></div>
            
            <SearchTool refreshFunction={updateSearchTerms}/>

        </div>
    )
}

export default CommunityPage

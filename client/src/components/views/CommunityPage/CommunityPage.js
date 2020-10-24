import React , {useEffect,useState} from 'react'
import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import NoticeBoard from './NoticeBoard/NoticeBoard'
import SearchTool from './SearchTool/SearchTool'
import Axios from 'axios'
import Notification from './Notification/Notification'
import MobileNoticeBoard from './NoticeBoard/MobileNoticeBoard'
import MobileCategory from './MobileCategory/MobileCategory'

function  CommunityPage() {
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)
    const [Board, setBoard] = useState([])
    const [MobileBoard, setMobileBoard] = useState([])
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

    Axios.get(`/api/board/mobile?skip=${Skip}&limit=${Limit}`)
        .then(response => {
          if(response.data.success){
             setMobileBoard(response.data.result)
             setPostSize(response.data.postSize)
             console.log(response.data.result)
           }
           else{
             alert("게시판 목록을 불러오는데 실패하였습니다.")
           }
         }
       )
         
      
          
  }, [])

  const onLoadMore = () => {
    let skip = Skip + Limit;

    Axios.get(`/api/board/mobile?skip=${skip}&limit=${Limit}&term=${SearchTerms}`)
        .then(response => {
          if(response.data.success){
             setMobileBoard([...MobileBoard,...response.data.result])
             setPostSize(response.data.postSize)
             console.log(response.data.result)
           }
           else{
             alert("게시판 목록을 불러오는데 실패하였습니다.")
           }
         }
       )
    setSkip(skip)
  }

  const updateSearchTerms = (newSearchTerm) => {
    let skip = 0
    
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

   Axios.get(`/api/board/mobile?skip=${skip}&limit=${Limit}&term=${newSearchTerm}`)
        .then(response => {
          if(response.data.success){
             setMobileBoard(response.data.result)
             setPostSize(response.data.postSize)
             console.log(response.data.result)
           }
           else{
             alert("게시판 목록을 불러오는데 실패하였습니다.")
           }
         }
       )
    setSkip(skip)
}

  const refresh = (value) => {
    if(value === 'a'){

    }
    else if(value === 'b'){

    }
    else if(value === 'c'){

    }
    else{

    }
  }

    return (
        <div className='postlist'>
            
           
            <br/>
            <br/>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <div >
                <Notification/>
              </div>
              <div >
                <a href='/write'><Button ><EditOutlined style={{marginTop : 10}} />글쓰기</Button></a>                
              </div>
            </div>
            <div className='spacing'></div>
            <div className='spacing'></div>
            <div className='mobile_board'>
              <MobileCategory refresh={refresh}/>
            </div>
            <div className='com_spacing'></div>
            
            <div className='web_board'>
              {Board && <NoticeBoard  list={Board}/>}
            </div>
            <div className='mobile_board'>
              {MobileBoard && <MobileNoticeBoard  list={MobileBoard}/>}
            </div>
            
            <div className='spacing'></div>
            <div className='spacing'></div>
            
            {PostSize >= Limit &&
                <div className='mobile_board_up'>
                    <button onClick={onLoadMore} style={{width: '300px', borderRadius:'5px' , border:'0px', height:'30px'}}>더보기</button>
                </div>
            }
            <div className='spacing'></div>
            <div className='spacing'></div>
            <SearchTool refreshFunction={updateSearchTerms}/>

        </div>
    )
}

export default CommunityPage

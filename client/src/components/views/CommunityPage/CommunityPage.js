import React , {useEffect,useState} from 'react'
import { EditOutlined , LoadingOutlined} from '@ant-design/icons';
import { Button , Spin } from 'antd';
import NoticeBoard from './NoticeBoard/NoticeBoard'
import SearchTool from './SearchTool/SearchTool'
import Axios from 'axios'
import Notification from './Notification/Notification'
import MobileNoticeBoard from './NoticeBoard/MobileNoticeBoard'
import MobileCategory from './MobileCategory/MobileCategory'
import { Link } from 'react-router-dom';

const Limit = 8;

function  CommunityPage() {

  const [Skip, setSkip] = useState(0)
  const [PostSize, setPostSize] = useState(0)
  const [Board, setBoard] = useState([])
  const [MobileBoard, setMobileBoard] = useState([])
  const [SearchTerms, setSearchTerms] = useState("")
  const [Category, setCategory] = useState(0)
  const [isLoading, setisLoading] = useState(false)
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
    
  useEffect(() => {
    
      requestComAPI("");
      requestAPI("",Skip,Limit,"");
      setisLoading(true)
  
  }, [])

  const onLoadMore = () => {
    let skip = Skip + Limit;

    requestAPI(Category,skip,Limit,SearchTerms);
    setSkip(skip)
  }

  const updateSearchTerms = (newSearchTerm) => {
    let skip = 0

    requestComAPI(newSearchTerm)
    requestAPI(Category,skip,Limit,newSearchTerm);

    setSearchTerms(newSearchTerm)
    setSkip(skip)
  }

  const requestComAPI = (SearchTerms) => {
      
    Axios.get(`/api/board?term=${SearchTerms}`)
         .then(response => {
            if(response.data.success){
              setBoard(response.data.result)
            
            }
            else{
              alert("게시판 목록을 불러오는데 실패하였습니다.")
            }
          }
        )
  }

  const requestAPI = (value,skip,Limit,SearchTerms) => {
      let param = {
        params : {
          skip,
          limit : Limit,
          term : SearchTerms,
          choose : value
        }
      }
      Axios.get(`/api/board/mobile`,param)
        .then(response => {
          if(response.data.success){
             setMobileBoard(response.data.result)
             setPostSize(response.data.postSize)
           }
           else{
             alert("게시판 목록을 불러오는데 실패하였습니다.")
           }
         }
       )
    setCategory(value)
    setSkip(skip)
  }

  const refresh = (value) => {
    requestAPI(value,0,Limit,SearchTerms);
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
                <Link to="/write">
                  <Button >
                    <EditOutlined style={{marginTop : 10}} />글쓰기
                  </Button>
                </Link>
                  
              </div>
            </div>
            <div className='spacing'></div>
            <div className='spacing'></div>
            <div className='mobile_board'>
              <MobileCategory refresh={refresh}/>
            </div>
            <div className='com_spacing'></div>
            
            <div className='web_board'>
            
              { isLoading ? <NoticeBoard  list={Board}/> : 
                <div style={{display:'flex', justifyContent:'center', alignItems:'center', paddingBottom:'30px'}}>
                  <Spin indicator={antIcon} />
                </div>}
            </div>
            <div className='mobile_board'>
     
              { isLoading ? <MobileNoticeBoard  list={MobileBoard}/>  : 
                <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop: '30px'}}>
                  <Spin indicator={antIcon} />
                </div>}
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

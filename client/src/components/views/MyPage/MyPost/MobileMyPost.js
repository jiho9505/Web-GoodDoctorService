import React, {useState, useEffect} from 'react'
import { List, Badge , Typography} from 'antd';
import axios from 'axios'
import moment from 'moment'

const {Title} = Typography


function MobileMyPost() {

    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)
    const [list, setlist] = useState([])

    useEffect(() => {
        let body = {
            _id : localStorage.getItem("userId"),
            loadMore : true,
            skip : Skip,
            limit : Limit
        }
             
        axios.post('/api/board/info', body)
            .then(response => { 
                if(response.data.success){
                setlist(response.data.boardInfo)
                setPostSize(response.data.postSize)

                }
                else{
                    alert('글 정보를 가져오는데 실패하였습니다')
                }
            })
         
    }, [])

    

    const onLoadMore = () => {
      let skip = Skip + Limit;
      
      let body = {
            _id : localStorage.getItem("userId"),
            loadMore : true,
            skip : skip,
            limit : Limit
     }
         
      axios.post('/api/board/info', body)
          .then(response => { 
              if(response.data.success){
              setlist([...list,...response.data.boardInfo])
              setPostSize(response.data.postSize)
              }
              else{
                  alert('글 정보를 가져오는데 실패하였습니다')
              }
          })

      setSkip(skip)
    }
  
    
    const clickHandler = (id) => {
        let body = {
          _id : id
        }
        axios.post('/api/board/view', body)
             .then(response => {
               if(!response.data.success){
                 alert('조회 수 기능에 Error 발생!')
               }
             })
      }
      
  return (
    <>
      <br/>
      <br/>
      <Title level={4}>내가 쓴 글</Title>
      <div style={{border : '1px solid #eee'}}></div>
      <List
        dataSource={
            list
        }
        bordered
        renderItem={item => (
          <List.Item
            style={{paddingLeft:'5px', paddingRight:'5px'}}
            key={item.id}
            actions={[
                <a onClick={()=>clickHandler(item._id)} href={`community/${item._id}`}>
                    <span style={{color:'#00000073'}}>댓글</span>
                    <Badge className="site-badge-count-109" count={109} style={{ backgroundColor: '#52c41a' }}>
                    
                </Badge>
                </a>
                
    
            ]}
          >
            <List.Item.Meta
              title={<a style={{fontWeight:'bolder'}} onClick={()=>clickHandler(item._id)} href={`community/${item._id}`}>
                        <span>[{item.chooseBoard === 1 ? '완치' : item.chooseBoard === 2 ? '정보' : '고민'}]{' '+item.title}</span>
                        &nbsp;
                    </a>}
              description={item.writer.nickname+' | '+moment(item.createdAt).format("YYYY-MM-D")+' | 조회수:'+item.view+' | 추천:'+item.like}
            />
          </List.Item>
        )}
      />
        
        <div className='spacing'></div>
        <div className='spacing'></div>
        
        {PostSize >= Limit &&
                <div className='mobile_board_up'>
                    <button onClick={onLoadMore} style={{width: '300px', borderRadius:'5px' , border:'0px', height:'30px'}}>더보기</button>
                </div>
         }

    </>
  )}

export default MobileMyPost


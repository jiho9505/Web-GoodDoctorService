import React, {useState,useEffect} from 'react'
import { List } from 'antd';
import axios from 'axios'
import moment from 'moment'
import RemoveButton from './RemoveButton'

function MobileAlertList() {

    const [alertInfo, setalertInfo] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)
    
    useEffect(() => {
    axios.get(`/api/alert?skip=${Skip}&limit=${Limit}`) 
        .then(response => {
            if(response.data.success){
                setalertInfo(response.data.alertInfo)
                setPostSize(response.data.postSize)
            }
            else{
                alert("Alert 정보를 가져오는데 실패하였습니다")
            }
        })
        }, [])

    const onLoadMore = () => {
      let skip = Skip + Limit;
      
      axios.get(`/api/alert?skip=${skip}&limit=${Limit}`) 
        .then(response => {
            if(response.data.success){
                setalertInfo([...alertInfo,...response.data.alertInfo])
                setPostSize(response.data.postSize)
              
            }
            else{
                alert("Alert 정보를 가져오는데 실패하였습니다")
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
    
    <div>
      <List
        dataSource={
            alertInfo
        }
        bordered
        renderItem={item => (
            <List.Item
            style={{paddingLeft:'5px', paddingRight:'5px'}}
            key={item.id}
            actions={[
                        <RemoveButton postId={item.postId && item.postId._id} commentId={item.commentId && item.commentId._id}  />     
            ]}
          >
            <List.Item.Meta
            //[게시글-신고] 내용
            // 신고자명 날짜
              title={<a onClick={()=>clickHandler(item.postId._id)} href={`community/${item.postId._id}`}>
                        <span style={{color:'red'}}>[{item.commentId ? '댓글' : '게시판'}-신고]</span>
                        <span style={{fontWeight:'bolder'}}>{' '+item.contents}</span>
                       
                        
                    </a>}
              description={'신고자명 : '+item.userId.nickname+' | '+moment(item.createdAt).format("YYYY-MM-D")}
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
    

    </div>
  )}

export default MobileAlertList


import React, {useState, useEffect} from 'react'
import { List, Badge } from 'antd';
import Axios from 'axios'
import moment from 'moment'


function Mobile_Detail() {

    useEffect(() => {
        Axios.get('/api/board')
         .then(response => {
           if(response.data.success){
              setlist(response.data.result)
            }
            else{
              alert("게시판 목록을 불러오는데 실패하였습니다.")
            }
          }
        )
         
    }, [])

    const [list, setlist] = useState([])
    
    const clickHandler = (id) => {
        let body = {
          _id : id
        }
        Axios.post('/api/board/view', body)
             .then(response => {
               if(!response.data.success){
                 alert('조회 수 기능에 Error 발생!')
               }
             })
      }
      
  return (
    <>
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
    </>
  )}

export default Mobile_Detail


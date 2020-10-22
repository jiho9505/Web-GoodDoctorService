import React, {useState, useEffect} from 'react'
import { List, Badge , Typography} from 'antd';
import axios from 'axios'
import moment from 'moment'

const {Title} = Typography


function MobileMyPost() {

    useEffect(() => {
        let body = {
            _id : localStorage.getItem("userId")
        }
             
        axios.post('/api/board/info', body)
            .then(response => { 
                if(response.data.success){
                setlist(response.data.boardInfo)
                }
                else{
                    alert('글 정보를 가져오는데 실패하였습니다')
                }
            })
         
    }, [])

    const [list, setlist] = useState([])
    
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
    </>
  )}

export default MobileMyPost


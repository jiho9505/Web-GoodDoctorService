import React from 'react'
import { List, Badge, Empty } from 'antd';
import Axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom';



function MobileNoticeBoard(props) {

    const list = props.list
    
{/* <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop: '30px'}}>
                  <Spin indicator={antIcon} />
                </div> */}
    
    
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
    <div>
      { list && list.length>0 ?
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
                <Link onClick={()=>clickHandler(item._id)} to={`community/${item._id}`}>
                    <span style={{color:'#00000073'}}>댓글</span>
                    <Badge className="site-badge-count-109" count={item.commentCount} style={{ backgroundColor: '#52c41a' }}>
                    
                </Badge>
                </Link>
                
    
            ]}
          >
            <List.Item.Meta
              title={<Link style={{fontWeight:'bolder' , fontFamily : 'Noto Sans'}} onClick={()=>clickHandler(item._id)} to={`community/${item._id}`}>
                        <span>{item.title}</span>
                       
                     </Link>}
              description={item.writer.nickname+' | '+moment(item.createdAt).format("YYYY-MM-D")+' | 조회수:'+item.view+' | 추천:'+item.like}
            />
          </List.Item>
        )}
      />
        : <Empty/>  }
    </div>
  )}

export default MobileNoticeBoard


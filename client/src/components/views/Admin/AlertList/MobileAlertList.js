import React from 'react'
import { List } from 'antd';
import axios from 'axios'
import moment from 'moment'
import RemoveButton from './RemoveButton'

function MobileAlertList(props) {

    const list = props.list

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
            list
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
                        {console.log(item)}
                        
                    </a>}
              description={'신고자명 : '+item.userId.nickname+' | '+moment(item.createdAt).format("YYYY-MM-D")}
            />
          </List.Item>
        )}
      />
    

    </div>
  )}

export default MobileAlertList


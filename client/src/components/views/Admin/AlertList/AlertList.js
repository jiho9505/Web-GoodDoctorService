import React, {useEffect, useState} from 'react'
import { Table, Button } from 'antd';  
import moment from "moment";
import axios from 'axios'

function AlertList(props) {
  const [Datas, setDatas] = useState([])

  useEffect(() => {
    let array = []
    
    props.list && props.list.length>0 && props.list.map((list,index)=>{
       
          if(list.commentId){
              list.chooseBoard = '댓글'

              array.push( {
                chooseBoard : list.chooseBoard,
                key : index,
                title: list.commentId.content,
                date: moment(list.createdAt).format("YYYY-MM-D"),
                nickname: list.userId.nickname,
                contents: list.contents,
                _id: list.postId._id,
                button: '삭제',
                comment: list.commentId._id,
              } )
         }
         else{ 
              list.chooseBoard = '게시판'

              array.push( {
                chooseBoard : list.chooseBoard,
                key : index,
                title: '(링크 타기)',
                date: moment(list.createdAt).format("YYYY-MM-D"),
                nickname: list.userId.nickname,
                contents: list.contents,
                _id: list.postId._id,
                button: '삭제',
                comment:0
              } )
         }
        
    })
    setDatas(array)
  

  },[props.list])
  
        const removeHandler = (value,cid) => {
            if(cid){
                axios.delete(`/api/alert?cid=${cid}`)
                    .then(response => {
                        if(response.data.success){
                            window.location.reload()
                        }
                        else{
                            alert('Error 발생')
                        }
                    })
            }
            else{
                axios.delete(`/api/alert?postid=${value}`)
                    .then(response => {
                        if(response.data.success){
                            window.location.reload()
                        }
                        else{
                            alert('Error 발생')
                        }
                    })
                }
            }
      
      const columns = [
        {
          title: '구분',
          dataIndex: 'chooseBoard',
          key: 'chooseBoard',
          align: 'center',        
        },
        {
          title: '댓글내용',
          dataIndex: 'title',
          key: 'title',
          align: 'center',
          render: (text,record) => (
            <a  href={`community/${record._id}`}>{text}</a>
          )
        },
        {
            title: '신고사유',
            dataIndex: 'contents',
            key: 'contents',
            align: 'center',        
        },
        {
          title: '신고날짜',
          dataIndex: 'date',
          key: 'date',
          align: 'center'
        },
        {
            title: '신고자',
            dataIndex: 'nickname',
            key: 'nickname',
            align: 'center'
        },
        {
            title: '삭제',
            dataIndex: 'button',
            key: 'button',
            align: 'center',render: (text,record) => (
                
                    <Button onClick={() => {removeHandler(record._id,record.comment)}}>{text}</Button>
            )
          },
        
      ];
      
      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          name: record.name,
        }),
      };
  
    return (
        <div>
            {props.list && props.list.length>0 &&
            <Table dataSource={Datas} columns={columns} pagination={{defaultPagesize : 15, Pagesize: 15}}  
            size='small' bordered={true} rowSelection={{
                                                            type: 'checkbox',
                                                            ...rowSelection,
                                                         }} 
            /> }                                    
        </div>
    )
}

export default AlertList
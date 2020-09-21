import React, {useEffect, useState} from 'react'
import { Table } from 'antd';  
import moment from "moment";

function NoticeBoard(props) {
  const [Datas, setDatas] = useState([])
  useEffect(() => {
    let array = []
    if(props.list && props.list.length>0){
        props.list.map((list,index)=>{
          if(list.chooseBoard === 1){
            list.chooseBoard = '완치 후기'
          }
          else{
            if(list.chooseBoard === 2){
              list.chooseBoard = '정보 공유'
            }
            else{
              list.chooseBoard = '고민 털기'
            }
          }

        array.push( {
          chooseBoard : list.chooseBoard,
          key : index,
          title: list.title,
          date: moment(list.createdAt).format("YYYY-MM-D"),
          nickname: list.writer.nickname,
          view: list.view,
          like: list.like,
          _id: list._id
        } )
        
    })
    setDatas(array)
  }

    console.log(array)
    console.log(props.list)
    console.log(Datas)
  },[props.list])
 

      const columns = [
        {
          title: '구분',
          dataIndex: 'chooseBoard',
          key: 'chooseBoard',
          width: 100,
          align: 'center'
        },
        {
          title: '제목',
          dataIndex: 'title',
          key: 'title',
          width: 520,
          align: 'center',
          render: (text,record) => (
            <a href={`community/${record._id}`}>{text}</a>
          )
        },
        {
          title: '날짜',
          dataIndex: 'date',
          key: 'date',
          width: 100,
          align: 'center'
        },
        {
            title: '닉네임',
            dataIndex: 'nickname',
            key: 'nickname',
            width: 100,
            align: 'center'
        },
        {
            title: '조회수',
            dataIndex: 'view',
            key: 'view',
            width: 50,
            align: 'center'
          },
          {
            title: '좋아요',
            dataIndex: 'like',
            key: 'like',
            width: 50,
            align: 'center'
        }


      ];
      
  
    return (
        <div>
          
            <Table dataSource={Datas} columns={columns}  size='small' bordered={true} />;
        </div>
    )
}

export default NoticeBoard
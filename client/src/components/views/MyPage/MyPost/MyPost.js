import React, {useEffect, useState} from 'react'
import { Table , Typography } from 'antd';  
import moment from "moment";
import axios from 'axios'

const {Title} = Typography

function MyPost(props) {
    
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
          view: list.view,
          like: list.like,
          _id: list._id
        } )
        
    })
    setDatas(array)
  }

  },[props.list])
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
      const columns = [
        {
          title: '구분',
          dataIndex: 'chooseBoard',
          key: 'chooseBoard',
          align: 'center',
          filters: [
            {
              text: '완치 후기',
              value: '완치 후기',
            },
            {
              text: '정보 공유',
              value: '정보 공유',
            },
            {
              text: '고민 털기',
              value: '고민 털기',
            }
            
          ],

          onFilter: (value, record) => record.chooseBoard.indexOf(value) === 0
        },
        {
          title: '제목',
          dataIndex: 'title',
          key: 'title',
          align: 'center',
          render: (text,record) => (
            <a onClick={()=>clickHandler(record._id)} href={`community/${record._id}`}>{text}</a>
          )
        },
        {
          title: '날짜',
          dataIndex: 'date',
          key: 'date',
          align: 'center'
        },
        {
            title: '조회수',
            dataIndex: 'view',
            key: 'view',
            align: 'center', 
            sorter: (a, b) => a.view - b.view,
            sortDirections: ['descend']
          },
          {
            title: '좋아요',
            dataIndex: 'like',
            key: 'like',
            align: 'center',
            sorter: (a, b) => a.like - b.like,
            sortDirections: ['descend']
           
        }


      ];
    return (
        <div style = {{ width: '80%', margin: '3rem auto' }} >
            
                <br/>
                <br/>
                <Title level={4}>내가 쓴 글</Title>
                <div style={{border : '1px solid #eee'}}></div>
  
            <Table dataSource={Datas} columns={columns} pagination={{defaultPagesize : 15, Pagesize: 15}}  size='small' bordered={true} />;
        </div>
            
    )
}

export default MyPost

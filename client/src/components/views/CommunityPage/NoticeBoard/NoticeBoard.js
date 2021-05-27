import React, {useEffect, useState} from 'react'
import { Empty, Table } from 'antd';  
import moment from "moment";
import axios from 'axios'
import { Link } from 'react-router-dom';

function NoticeBoard(props) {
  const [Datas, setDatas] = useState([])


  useEffect(() => {
    let array = []
    if(props.list && props.list.length>0){
        props.list.forEach((list,index)=>{
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
          _id: list._id,
          comCount: list.commentCount
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
          width: 100,
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
          width: 480,
          align: 'center',
          render: (text,record) => (
            <Link onClick={()=>clickHandler(record._id)} to={`community/${record._id}`}>{text}
              { record.comCount > 0 && 
                <span style={{color: 'red'}}>
                  {' '+'['+record.comCount+']'}
                </span> }
            </Link>
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
            width: 70,
            align: 'center', 
            sorter: (a, b) => a.view - b.view,
            sortDirections: ['descend']
          },
          {
            title: '좋아요',
            dataIndex: 'like',
            key: 'like',
            width: 70,
            align: 'center',
            sorter: (a, b) => a.like - b.like,
            sortDirections: ['descend']
           
        }


      ];
      
  
    return (
      
        <div>
          
          {props.list && props.list.length>0 ?
            <Table dataSource={Datas} columns={columns} pagination={{defaultPagesize : 15, Pagesize: 15}}  size='small' bordered={true} />
        : <div>
            <Empty/>
            <br/><br/>
          </div>}

        </div>
    )
}

export default NoticeBoard
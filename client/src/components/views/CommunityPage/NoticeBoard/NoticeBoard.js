import React, {useEffect, useState} from 'react'
import { Table } from 'antd';  
import moment from "moment";
import axios from 'axios'

function NoticeBoard(props) {
  const [Datas, setDatas] = useState([])
  const [Likes, setLikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    let body = {
        postId: props.postId, userId: props.userId
    };

    useEffect(() => {

        axios.post('/api/like/getLikes', body)
            .then(response => {
                if (response.data.success) {              
                    setLikes(response.data.likes.length)
 
                    response.data.likes.map(like => {
                        if (like.userId === props.userId) {
                            setLikeAction('liked')
                        }
                    })
                } else {
                    alert('좋아요 정보를 가져오는데 실패하였습니다')
                }
            })

       

    }, [])
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

  },[props.list])
      const clickHandler = (id) => {
        let body = {
          _id : id
        }
        axios.post('/api/board/view',body)
             .then(response => {
               if(!response.data.success){
                 alert("Error 발생...")
               }
             })
             
      }

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
            <a onClick={()=>clickHandler(record._id)} href={`community/${record._id}`}>{text}</a>
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
            align: 'center', 
            sorter: (a, b) => a.view - b.view,
            sortDirections: ['descend']
          },
          {
            title: '좋아요',
            dataIndex: 'like',
            key: 'like',
            width: 50,
            align: 'center',
            sorter: (a, b) => a.like - b.like,
            sortDirections: ['descend']
           
        }


      ];
      
  
    return (
        <div>
            <Table dataSource={Datas} columns={columns} pagination={{defaultPagesize : 15}}  size='small' bordered={true} />;
        </div>
    )
}

export default NoticeBoard
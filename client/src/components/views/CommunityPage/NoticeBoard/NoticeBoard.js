import React, {useEffect, useState} from 'react'
import { Table } from 'antd';
import Axios from 'axios'  

function NoticeBoard() {
  
   const [Board, setBoard] = useState([])
  
  useEffect(() => {
    
    Axios.get('/api/board')
         .then(response => {
           if(response.data.success){
              setBoard(response.data.result)
              console.log(response.data.result)
            }
            else{
              alert("게시판 목록을 불러오는데 실패하였습니다.")
            }
          }
        )
         
      
          
  }, [])

  const newmem = () => {
   
    Board.map((board,index)=>{
      return {
        key : index,
        chooseboard: board.chooseboard,
        title: board.title,
        date: board.date,
        nickname: board.nickname,
        view: board.view,
        like: board.like
      }
    }
    )

   
  }

  const newData = newmem()


  
    const dataSource = [
        {
          key: '1',
          chooseboard: '정보 공유',
          title: 'test...ing',
          date: '2020.09.16',
          nickname: 'Jiho',
          view: '50',
          like: '5'
        },
        {
          chooseboard: '완치 후기',
          key: '2',
          title: 'test...ing second',
          date: '2020.09.16',
          nickname: 'Mom',
          view: '55',
          like: '8'
        },
        {
          chooseboard: '고민 털기',
          key: '3',
          title: 'test...ing third',
          date: '2020.09.14',
          nickname: 'Dad',
          view: '67',
          like: '14'
        },
      ];
    
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
          align: 'center'
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
            <Table dataSource={newData} columns={columns}  size="small" bordered='true' />;
        </div>
    )
}

export default NoticeBoard
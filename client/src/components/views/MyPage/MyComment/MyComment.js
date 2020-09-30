import React, {useEffect, useState} from 'react'
import { Table , Typography } from 'antd';  
import moment from "moment";

const {Title} = Typography

function MyComment(props) {
    
  const [Datas, setDatas] = useState([])

  useEffect(() => {
    let array = []
    if(props.list && props.list.length>0){
        props.list.map((list,index)=>{
          
        array.push( {
          content : list.content,
          key : index,
          title: list.postId.title,
          date: moment(list.postId.createdAt).format("YYYY-MM-D"),
          _id: list.postId
        } )
        
    })
    setDatas(array)
    console.log(array)
  }

  },[props.list])

      const columns = [ 
        
        {
          title: '날짜',
          dataIndex: 'date',
          key: 'date',
          width: 70,
          align: 'center'
        },
        {
            title: '댓글 내용',
            dataIndex: 'content',
            key: 'content',
            width: 480,
            align: 'center', 
            render: (text,record) => (
                <a href={`community/${record._id}`}>{text}</a>
              )
          }


      ];
    return (
        <div style = {{ width: '75%', margin: '3rem auto' }} >
             <br/>
                <br/>
                <Title level={4}>내가 쓴 댓글</Title>
                <div style={{border : '1px solid #eee'}}></div>
            <Table dataSource={Datas} columns={columns} pagination={{defaultPagesize : 15, Pagesize: 15}}  size='small' bordered={true} />;
        </div>
            
    )
}

export default MyComment
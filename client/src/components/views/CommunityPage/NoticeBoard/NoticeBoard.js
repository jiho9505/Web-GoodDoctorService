import React from 'react'
import { Table } from 'antd';

function NoticeBoard() {
   
  
    const dataSource = [
        {
          key: '1',
          judge: '정보 공유',
          title: 'test...ing',
          date: '2020.09.16',
          name: 'Jiho',
          view: '50',
          like: '5'
        },
        {
          judge: '완치 후기',
          key: '2',
          title: 'test...ing second',
          date: '2020.09.16',
          name: 'Mom',
          view: '55',
          like: '8'
        },
        {
          judge: '고민 털기',
          key: '3',
          title: 'test...ing third',
          date: '2020.09.14',
          name: 'Dad',
          view: '67',
          like: '14'
        },
      ];
      
      const columns = [
        {
          title: '구분',
          dataIndex: 'judge',
          key: 'judge',
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
            dataIndex: 'name',
            key: 'name',
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
            <Table dataSource={dataSource} columns={columns}  size="small" bordered='true' />;
        </div>
    )
}

export default NoticeBoard
import React from 'react'
import { Table } from 'antd';  


function BRtable() {
  

  const dataSource = [
    {
      key: '1',
      purpose: '이용자 식별 및 본인여부 확인',
      list: '비밀번호,이메일',
      time: '회원 탈퇴 시까지',
    },
    {
        key: '2',
        purpose: '홈페이지 방향 개선을 위한 정보 수집',
        list: '생년월일',
        time: '회원 탈퇴 시까지',
    },
  ]
      const columns = [
       
        {
          title: '목적',
          dataIndex: 'purpose',
          key: 'purpose',
          width: 200,
          align: 'center',
        },
        {
          title: '항목',
          dataIndex: 'list',
          key: 'list',
          width: 100,
          align: 'center'
        },
        {
            title: '보유기간',
            dataIndex: 'time',
            key: 'time',
            width: 100,
            align: 'center'
        }

      ];
      
  
    return (
        <div>
            <Table dataSource={dataSource} columns={columns} pagination={false}  size='small' bordered={true} />
        </div>
    )
}

export default BRtable
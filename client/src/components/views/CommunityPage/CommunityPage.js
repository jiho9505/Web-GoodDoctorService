import React from 'react'
import { SmileTwoTone, EditOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import NoticeBoard from './NoticeBoard/NoticeBoard'
import SearchTool from './SearchTool/SearchTool'

const {Title} = Typography

function  CommunityPage() {

    return (
        <div style = {{ width: '75%', margin: '3rem auto' }}>
            
            <div style={{ textAlign: 'center' }}>
                <Title level={3}>Find good doctors <SmileTwoTone/></Title>
            </div>
            <br/>
            <br/>
            <div style={{display:'flex', justifyContent:'flex-end'}}>
               <a href='/test'><Button ><EditOutlined style={{marginTop : 10}} />글쓰기</Button></a>
            </div>
            
            <br/>
            <NoticeBoard />
            <SearchTool />

        </div>
    )
}

export default CommunityPage

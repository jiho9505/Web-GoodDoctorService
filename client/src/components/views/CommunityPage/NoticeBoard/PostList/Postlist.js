import React, { useState } from 'react'
import { Input, Typography, Button, Select , Form } from 'antd'
import { SmileTwoTone } from '@ant-design/icons';
import PictureUpload from './PictureUpload/PictureUpload'

const { Option } = Select;
const {Title} = Typography
const {TextArea} = Input

const Boardlist = [
    { key: 0, value: "게시판 선택" },
    { key: 1, value: "완치 후기" },
    { key: 2, value: "정보 공유" },
    { key: 3, value: "고민 털기" }
]

function Postlist() {

    const [PostTitle, setPostTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Images, setImages] = useState([])
    const [ChooseBoard, setChooseBoard] = useState(0)

    const ChooseBoardHandler = (e) => {
        setChooseBoard(e.currentTarget.value)
    }
    const TitleHandler = (e) => {
        setPostTitle(e.currentTarget.value)
    }
    const DescHandler = (e) => {
        setDescription(e.currentTarget.value)
    }
    
    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const selectHandler = () => (
        Boardlist.map(item => (
            <Option value={item.key}>{item.value}</Option>
        ))
    )


    return (
        <div style = {{ width: '75%', margin: '3rem auto' }}>
            

            <div style={{ textAlign: 'center' }}>
                <Title level={3}>Find good doctors <SmileTwoTone/></Title>
            </div>
            <div style = {{ width: '75%', margin: '3rem auto' }}>
                <Form >
                
                    <Select style={{ color : 'blueviolet' , width: 150 }} value={ChooseBoard} onChange={setChooseBoard}>
                         {selectHandler()}
                    </Select>
                    <br />
                    <br />
                    <label style={{fontSize : '16px'}}>제목</label>
                    <br />
                   
                    <Input onChange={TitleHandler} value={PostTitle} placeholder='제목을 입력해주세요.'/>
                    <br />
                    <br />
                    <label style={{fontSize : '16px'}}>내용</label>
                    
                    <br />
            
                    <TextArea onChange={DescHandler} value={Description} style={{height:300}} placeholder='내용을 입력해주세요.'/>
    
                    <br />
                    <br />
                    <PictureUpload refreshFunction={updateImages} />
                   
                    <div style = {{display:'flex', justifyContent:'center'}}>
                        <Button type="primary" htmlType="submit" onClick>글 게시하기</Button>
                    </div>
                </Form>
                
            </div>
           
        </div>
    )
}

export default Postlist

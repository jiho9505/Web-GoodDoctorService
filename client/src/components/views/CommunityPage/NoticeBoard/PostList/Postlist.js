import React, { useState } from 'react'
import { Input, Typography, Button, Select , Form } from 'antd'
import { SmileTwoTone } from '@ant-design/icons';
import PictureUpload from './PictureUpload/PictureUpload'
import Axios from 'axios';

const { Option } = Select;
const {Title} = Typography
const {TextArea} = Input

const Boardlist = [
    { key: 0, value: "게시판 선택" },
    { key: 1, value: "완치 후기" },
    { key: 2, value: "정보 공유" },
    { key: 3, value: "고민 털기" }
]

function Postlist(props) {

    const [PostTitle, setPostTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Images, setImages] = useState([])
    const [ChooseBoard, setChooseBoard] = useState(0)
    const [View, setView] = useState(0)
    const [Like, setLike] = useState(0)


    const TitleHandler = (e) => {
        if(Title.length>100){
            return alert('제목 글자 수 제한은 한글 기준 50글자 입니다.')
        }
        else{
            setPostTitle(e.currentTarget.value)
        }
    }
    const DescHandler = (e) => {
        setDescription(e.currentTarget.value)
    }
    
    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const selectHandler = () => (
        Boardlist.map(item => (
            <Option key={item.key} value={item.key}>{item.value}</Option>
        ))
    )
    
    const submitHandler = (e) => {
        e.preventDefault();

        if (!Title || !Description || !ChooseBoard) {
            return alert("게시판 선택,제목,내용 부분을 입력했는지 확인해주세요.")
        }


        const body = {
            writer: props.user.userData._id,
            title: Title,
            description: Description,
            chooseBoard: ChooseBoard,
            images: Images,
            view: View,
            like: Like

        }

        Axios.post('/api/board', body)
            .then(response => {
                if (response.data.success) {
                    alert('글을 게시하는데 성공 했습니다.')
                    props.history.push('/commuinity')
                } else {
                    alert('글을 게시하는데 실패 했습니다.')
                }
            })
    }
    const ChooseBoardHandler = (value) => {
        setChooseBoard(value)
      }

    return (
        <div style = {{ width: '75%', margin: '3rem auto' }}>
            
            <div style={{ textAlign: 'center' }}>
                <Title level={3}>Find good doctors <SmileTwoTone/></Title>
            </div>
            <div style = {{ width: '75%', margin: '3rem auto' }}>
                <Form onSubmit={submitHandler}>
                    
                    <Select defaultValue={ChooseBoard}  style={{ width: 150 }}  onChange={ChooseBoardHandler}>
                         {selectHandler()}
                    </Select>
                    <br />
                    <br/>
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
                    <br />
                    <br />
                   
                    <div style = {{display:'flex', justifyContent:'center'}}>
                        <Button type="primary" htmlType="submit" onClick={submitHandler}>글 게시하기</Button>
                    </div>
                </Form>
                
            </div>
           
        </div>
    )
}

export default Postlist
import React, { useState, useEffect } from 'react'
import { Input, Button, Select , Form , message, Result} from 'antd'
import PictureUpload from './PictureUpload/PictureUpload'
import Axios from 'axios';

const { Option } = Select;
const {TextArea} = Input

const Boardlist = [
    { key: 0, value: "게시판 선택" },
    { key: 1, value: "완치 후기" },
    { key: 2, value: "정보 공유" },
    { key: 3, value: "고민 털기" }
]

function Postlist(props) {

    useEffect(() => {
        
        if(props.postInfo){
            setPostTitle(props.postInfo.title)
            setDescription(props.postInfo.description)
            setImages([...props.postInfo.images])
            setChooseBoard(props.postInfo.chooseBoard)
        }
        
        
    }, [])

    const [PostTitle, setPostTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Images, setImages] = useState([])
    const [ChooseBoard, setChooseBoard] = useState(0)
    const [showFinish, setshowFinish] = useState(false)
 

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
            <Option key={item.key} value={item.key}>{item.value}</Option>
        ))
    )
    
    const submitHandler = (e) => {
        
        e.preventDefault();
        
        if (!PostTitle || !Description || !ChooseBoard) {
            return alert("게시판 선택,제목,내용 부분을 입력했는지 확인해주세요.")
        }

        const body = {
                writer: localStorage.getItem('userId'),
                title: PostTitle,
                description: Description,
                chooseBoard: ChooseBoard,
                images: Images
    
            }

        if(props.postInfo){
            
    
            Axios.patch(`/api/board?id=${props.postInfo._id}`, body)
                .then(response => {
                    if (response.data.success) {
                       
                       setshowFinish(true)
                        
                      } else {
                        alert('글을 게시하는데 실패했습니다.')
                    }
                })
        }
        else{
 
            Axios.post('/api/board', body)
                .then(response => {
                    if (response.data.success) {
                        message.config({
                            top: 100
                          })
                        message.success('글 게시 성공!')
                
                        setTimeout(() => {
                            props.history.push('/community')
                        }, 1000)
                    } else {
                        alert('글을 게시하는데 실패했습니다.')
                    }
                })
        
    }
       
    }
    const ChooseBoardHandler = (value) => {
        setChooseBoard(value) 
      }

    return (
    
    <div style = {{ width: '75%', margin: '3rem auto' }}>
        { showFinish ? 
            <div style={{marginTop : 50}}>
                <Result
                    status="success"
                    title="게시물 수정에 성공하였습니다!"
                    subTitle="해당 게시물로 다시 돌아가려면 아래의 버튼을 클릭해주세요!"
                    extra={[
                    <a href={`/community/${props.postInfo._id}`}><Button type="primary" key="console">
                        Go
                    </Button>
                    </a>
                    ]}
                 />
            </div>
             :
             <div className='postlist'>
            <Form onSubmit={submitHandler}>
                
                <Select value={ChooseBoard}  style={{ width: 150 }}  onChange={ChooseBoardHandler}>
                     {selectHandler()}
                </Select>
                <br />
                <br/>
                <label style={{fontSize : '16px'}}>제목</label>
                <br />
               
                <Input onChange={TitleHandler} maxLength={40} value={PostTitle} placeholder='제목을 입력해주세요.(50자 제한)'/>
                <br />
                <br />
                <label style={{fontSize : '16px'}}>내용</label>
                
                <br />
        
                <TextArea onChange={DescHandler} value={Description} style={{height:300}} placeholder='내용을 입력해주세요.'/>

                <br />
                <br />
                <PictureUpload images={Images} refreshFunction={updateImages} />
                <br />
                <br />
                <div style = {{display:'flex', justifyContent:'center'}}>
                    <Button type="primary" htmlType="submit" onClick={submitHandler}>글 게시하기</Button>
                </div>
                
                
            </Form>
            
        </div>}    
         
        
       
    </div>
     
    )
}
export default Postlist

import React , {useState,useEffect} from 'react'
import axios from 'axios'
import { Input , Typography , List, Avatar , Button , message } from 'antd'
import { UserOutlined, AlertTwoTone } from '@ant-design/icons';
import moment from 'moment'
import Comments from './Sections/Comments'
import Likes from './Sections/Likes';
import Postlist from '../NoticeBoard/PostList/Postlist'

const { Title } = Typography
const { TextArea } = Input

function DetailBoardPage(props) {
    const postId = props.match.params.postId
    const [update, setupdate] = useState(false)
    const [PostInfo, setPostInfo] = useState([])
    const [CommentLists, setCommentLists] = useState([])

    useEffect(() => {
        axios.get(`/api/board?id=${postId}`)
             .then(response => {                        
                 if(response.data.success){
                     setPostInfo(response.data.result[0])
                 }
                 else{
                     props.history.push('/notfound')
                 }
                }
            )
        axios.get(`/api/comment?id=${postId}`)
            .then(response => {
                if (response.data.success) {
                    setCommentLists(response.data.comments)
                } else {
                    alert('댓글 정보를 가져오는데 실패하였습니다')
                }
            })
        
    }, [])

    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }

    const updateHandler = () => {
        if(window.confirm('이 게시물을 수정하시겠습니까?')){
            setupdate(true)
        }
    }

    const deleteHandler = () => {
        if(window.confirm('이 게시물을 삭제하시겠습니까?')){
            axios.delete(`/api/board?id=${postId}`)
                 .then(response => {
                    if(response.data.success){
                        message.config({
                            top: 100
                          })
                        message.success('삭제가 되었습니다!')
                        setTimeout(() => {
                            props.history.push('/community')
                        }, 1000);
                    }
                    else{
                        alert('삭제 기능 Error..')
                    }
                })
        }
    }

    const alertHandler = () => {
        if(window.confirm('이 게시물을 신고하시겠습니까?')){
            let key = window.prompt('신고 사유를 적어주시기 바랍니다')
            if(key){
                let body = {
                    userId:localStorage.getItem('userId'),
                    postId:postId,
                    contents:key
                }
                axios.post('/api/alert/',body)
                     .then(response => {
                         if(response.data.success){
                            message.config({
                                top: 100
                              })
                            message.success('신고가 접수되었습니다.')
                         }
                         else{
                             alert('Error 발생 - 신고기능 장애')
                         }
                        })
            }
            
        }
    }

    return (
        <div>
            {update ? 
                <Postlist postInfo={PostInfo} /> : 
                <div className='mustread'>
                {
                    
                    ( PostInfo.writer && PostInfo.writer._id === localStorage.getItem('userId') ) 
                    || ( props.user &&  props.user.userData && props.user.userData.isAdmin ) ? 
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                        <Button onClick={updateHandler}>수정</Button>&nbsp;<Button onClick={deleteHandler}>삭제</Button>
                    </div> : <div style={{display:'flex', justifyContent:'flex-end'}}>
                                <AlertTwoTone twoToneColor="#eb2f96" style={{ fontSize : '18px'}}onClick={alertHandler}/></div>
                }
                <div style={{color:'yellowgreen'}}>
                    { PostInfo.chooseBoard === 1 ? '완치후기 >' : 
                        PostInfo.chooseBoard === 2 ? '정보공유 >' : '고민털기 >'
                    }
                </div>
                    
                <Title level={3} >{PostInfo.title}</Title>
                
                
                <List.Item>
                        <List.Item.Meta
                                avatar={<Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />}
                                title={PostInfo.writer && PostInfo.writer.nickname}
                                description={moment(PostInfo.createdAt).format("YYYY-MM-D") +' '+ moment(PostInfo.createdAt).format('LT')}
                            />
                            <div></div>
                </List.Item>       
        
                <div style={{border : '1px solid #eee'}}></div>
                <br />
            
                <TextArea  value={PostInfo.description} style={{height:400}} />
        
                <br />
                <br />
                <div style={{border : '1px solid #eee'}}></div>

                {PostInfo.images && PostInfo.images.length> 0 ? 
                <div style={{display:'flex', justifyContent:'center'}}>
                    <div style={{  width: '300px', height: '290px', overflowX: 'scroll'}}>

                    {PostInfo.images.map((image, index) => (
                        <div key={index}>
                            <img style={{ minWidth: '300px', width: '300px', height: '240px' }}
                                src={`http://localhost:5000/${image}`|| 'findgooddoctors.herokuapp.com:5000'} alt={index}
                            />
                            
                        </div>
        
                    ))}
                    </div>
                </div>
                : 'No Images'}
                <div style={{border : '1px solid #eee'}}></div>
                <br/>
                <div style={{display:'flex', justifyContent:'center'}}>
                    <p>이 게시물이 마음에 드신다면 엄지를 눌러주세요!</p>
                </div>
                <div style={{display:'flex', justifyContent:'center'}}>
                    <Likes postId={postId} userId={localStorage.getItem('userId')}  />
                </div>
                {
                    PostInfo.writer && 
                    <Comments writer={PostInfo.writer} CommentLists={CommentLists} postId={PostInfo._id} 
                    refreshFunction={updateComment} />

                }
                
                
                
            </div>}    
            
        
        </div>    
    )
}

export default DetailBoardPage

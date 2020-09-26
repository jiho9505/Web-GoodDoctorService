import React , {useState,useEffect} from 'react'
import axios from 'axios'
import { Input , Typography , List, Avatar} from 'antd'
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment'
import Comments from './Sections/Comments'
import Likes from './Sections/Likes';

const { Title } = Typography
const { TextArea } = Input

function DetailBoardPage(props) {
    const postId = props.match.params.postId

    const [PostInfo, setPostInfo] = useState([])
    const [CommentLists, setCommentLists] = useState([])

    let body = {
        postId : postId
    }
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
        axios.post('/api/comment/getComments', body)
            .then(response => {
                if (response.data.success) {
                    console.log('response.data.comments',response.data.comments)
                    setCommentLists(response.data.comments)
                } else {
                    alert('댓글 정보를 가져오는데 실패하였습니다')
                }
            })
        
    }, [])

    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }

    return (
        <div style = {{ width: '75%', margin: '3rem auto' }}>
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
                            src={`http://localhost:5000/${image}`} alt='image'
                        />
                        
                    </div>
    
                ))}
                </div>
             </div>
             : 'No Images'}
             <div style={{border : '1px solid #eee'}}></div>
             <br/>
             <div style={{display:'flex', justifyContent:'center'}}>
                <p>이 게시물이 마음에 드신다면 아래의 엄지를 눌러주세요!</p>
             </div>
             <div style={{display:'flex', justifyContent:'center'}}>
                <Likes postId={postId} userId={localStorage.getItem('userId')}  />
             </div>
          
             <Comments CommentLists={CommentLists} postId={PostInfo._id} refreshFunction={updateComment} />
             
            
        </div>
    )
}

export default DetailBoardPage

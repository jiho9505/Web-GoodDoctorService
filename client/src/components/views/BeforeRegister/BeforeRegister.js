import React, {useState} from 'react'
import { Form , Button , Checkbox , message } from 'antd'
import BRtable from './BRtable/BRtable'
import RegisterPage from '../RegisterPage/RegisterPage'

function BeforeRegister() {

    const [check, setcheck] = useState(false)
    const [showRegister, setshowRegister] = useState(false)
    const [showBR, setshowBR] = useState(true)

    const checkHandler = () => {
        setcheck(!check)
    }

    const submitHandler = (e) => {
        e.preventDefault()

        if(check){
            setshowBR(false)
            setshowRegister(true)
        }
        else{
            message.config({
                top: 100
              })
            message.warn('약관 동의에 체크해주셔야 회원가입 진행이 가능합니다.')
        }
    }
    return (
        <div>
            
            {showBR && 
            <div style = {{ width: '50%' , margin: '3rem auto' }}>
                <div>
                    
                    <Form onSubmit={submitHandler}>
                        
                        <div style = {{ display:'flex', justifyContent:'center' }}>
                            <p style={{ fontSize : '16px', fontFamily : 'Noto Sans' , fontWeight : 'bolder'}}>개인정보처리방침안내</p> 
                        </div>
                        <div style={{border : '1px solid #eee'}}></div>
                                
                        

                        <BRtable/>
                        

                        <div style = {{ display:'flex', justifyContent:'flex-end' }}>
                        <span style={{fontSize:'13px'}}>(필수)개인정보처리방침안내의 내용에 동의합니다.</span>
                        &nbsp;

                        <Checkbox onClick={checkHandler} checked={check}></Checkbox> 
                        </div>
                        <div style={{border : '1px solid #eee'}}></div>
                        <br/>
                        <div style = {{display:'flex', justifyContent:'center'}}>
                            <Button type="primary" htmlType="submit" onClick={submitHandler}>회원가입</Button>
                        </div>
                        
                        
                    </Form>
                </div>
                
              </div> 
              }
              { showRegister && <RegisterPage/>}
        </div>
    )
}

export default BeforeRegister

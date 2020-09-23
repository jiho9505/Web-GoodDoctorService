import React from 'react'
import { CheckCircleTwoTone } from '@ant-design/icons';
function FindPwNextPage() {
    return (
        <div style={{ marginTop: 100}}>
            <div style={{ display:'flex' , justifyContent:'center'}}>
                <h2><CheckCircleTwoTone /></h2>
            </div>
            
            <div style={{ display:'flex' , justifyContent:'center'}}>
            <p>성공적으로 E-mail이 발송되었습니다.</p>
            </div>

            <div style={{ display:'flex' , justifyContent:'center'}}>
            <p>E-mail에서 안내하는 절차를 따라 비밀번호 수정 후 로그인 해주시기 바랍니다.</p>
            </div>

            <div style={{ display:'flex' , justifyContent:'center', color:'red'  }}>
            <p>제한 시간 : 5분</p>
            </div>
          
         
        </div>
    )
}

export default FindPwNextPage

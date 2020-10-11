import React from 'react'

function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'12px' , backgroundColor:'black' , color:'white'
        }}>
               
           <div>Copyright 2020 findgooddoctor.com All Rights Reserved. Since 2020.XX.XX</div>
           <div>
               <span>문의 사항 : findgooddoctor@naver.com</span>
               &nbsp;&nbsp;
               <span>|</span>
               &nbsp;&nbsp;
               <a href='/privacy'><span>개인정보처리방침</span></a>
               &nbsp;&nbsp;
           </div>
        </div>
    )
}

export default Footer

import React from 'react'

function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'12px' , backgroundColor:'black' , color:'white'
        }}>
               
           <div>
               <span>Copyright 2020 findgooddoctors.com All Rights Reserved.</span> 
               &nbsp;
               <span className='up_down'>Since 2020.XX.XX</span>
            </div>
           <div>
               <span>문의 사항 : findgooddoctors@naver.com</span>
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

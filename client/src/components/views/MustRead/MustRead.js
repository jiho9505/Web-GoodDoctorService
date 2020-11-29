import React from 'react'
import { Typography } from 'antd'

const { Title } = Typography

function MustRead() {
    return (
        <div className='mustread'>
            <div style={{border : '1px solid #eee'}}></div>
            <br></br>
            <div style={{display:'flex', justifyContent:'center'}}>
              <p><span style={{color:'red'}}>구글 플레이스토어</span><br/> <span style={{color:'red'}}>'숨은명의찾기' 앱</span> 출시</p>
            </div>
               
            <div style={{border : '1px solid #eee'}}></div>
            <Title level={4}>숨은 명의 찾기</Title>
            <p>관절,인대,힘줄 관련 명의들로 구성</p>
            <p>다른 부위에 대한 문의가 많아질 시 추가할 계획 있습니다 :)</p>
            <div style={{border : '1px solid #eee'}}></div>
            <Title level={4}>명의 목록 기준</Title>
            <p>1.네이버에서 회원 수 많은 카페들의 추천 병원(90%)</p>
            <p>2.EBS 명의에 출연하신 분들(10%)</p>
            {/*
            <p>3.숨은명의찾기 자체 추천(3%)</p>
            */}
            <div style={{border : '1px solid #eee'}}></div>
            <Title level={4}>사용법</Title>
            <p>수술 할 정도가 아니면 대학병원보단 일반병원 선택 추천 </p>
            <p>맵 아래의 리스트의 <span style={{color:'orange'}}>병원명을 클릭</span> 할 시 해당 병원의 <span style={{color:'orange'}}>위치로 이동</span> 합니다</p>
            <p>리스트의 이름 옆에 <span style={{color:'orange'}}>특이사항을 클릭</span> 할 시 해당 병원의 <span style={{color:'orange'}}>상세 정보</span> 및 더 상세한 정보를 볼 수 있는 <span style={{color:'orange'}}>카페링크</span>가 달려있습니다.</p>
            <div style={{border : '1px solid #eee'}}></div>
            <Title level={4}>기타</Title>
            <p>-버그는 맨 아래 이메일로 문의주세요.</p>
            <p>-해당 의사분의 불평이 메일로 계속 올 시 수정할 것 </p>
            

            
            
            
            
            
            
            
            
            
            
            
            
            
        </div>
    )
}

export default MustRead

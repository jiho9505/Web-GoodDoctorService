import React from 'react'
import { Typography } from 'antd'

const { Title } = Typography

function MustRead() {
    return (
        <div className='mustread'>
            <Title level={4}>숨은 명의 찾기</Title>
            <p>관절,인대,힘줄 관련 명의들로 구성되어있습니다.</p>
            <p>- 다른 부위에 대한 문의가 많아지면 추가할게요 :) -</p>
            {/*
            <p>저도 1년 넘게 관절염증(인대,힘줄 포함)을 앓게 되면서 깨달은게 많은데 </p>
            <p>1년동안 30개 가까이 되는 병원을 다녀보면서 돌팔이도 많고 인터넷엔 병원 광고글들이 가득한 것에 대해 불만이 있었습니다.</p>
            <p>그래서 환자들도 제대로 된 의사를 찾을 권리가 필요하다고 생각하고</p>
            <p>무엇보다도 적절한 시기에 제대로 된 분한테 가서 치료받는게 제일 중요하다고 생각돼서</p>
            <p>컴퓨터 관련 과 학생으로서 공익적 목적으로 만들었습니다.</p>
            */}
            <div style={{border : '1px solid #eee'}}></div>
            <Title level={4}>명의 목록 기준</Title>
            <p>1.네이버에서 회원 수 많은 카페들의 추천 병원(90%)</p>
            <p>2.EBS 명의에 출연하신 분들(10%)</p>
            {/*
            <p>3.기타-네이버 검색하면서 수집했던 분들(3%)</p>
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

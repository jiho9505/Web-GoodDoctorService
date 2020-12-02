import React, { useState } from 'react';
import { Drawer, Button, Typography } from 'antd';

const {Title} = Typography

function Manual() {
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    return (
        <>
        
            <Button  style={{backgroundColor:'orange', fontSize:'1rem'}} type='danger' shape='round' onClick={showDrawer}>
                사용법
            </Button>
     
        
        <Drawer
            title="숨은명의찾기"
            placement="top"
            closable={false}
            onClose={onClose}
            visible={visible}
            height='420px'
        >
            <div style={{fontSize:'1.1rem'}}>
            <p>관절,인대,힘줄 관련 명의들로 구성</p>
            <p>수술 할 정도가 아니면 대학병원보단 <br/>일반병원 선택 추천 </p>
            <div style={{border : '1px solid #eee'}}></div>
            <strong>-사용법-</strong>
            <p>지도 아래의 병원 목록에서 <span style={{color:'orange'}}><br></br>병원명을 클릭</span> 할 시 해당 병원의<br/> <span style={{color:'orange'}}>위치로 이동</span> 합니다</p>
            <p>병원목록에서 병원명 옆에 <span style={{color:'orange'}}>특이사항을 클릭</span> 할 시 해당 병원의 <span style={{color:'orange'}}>상세 정보</span> 및 더 상세한 정보를 볼 수 있는 <span style={{color:'orange'}}>카페링크</span>가 달려있습니다.</p>
            <div style={{border : '1px solid #eee'}}></div>
 
            <strong>-명의 목록 기준-</strong>
            
            <p>1.네이버에서 회원 수 많은 카페들의 <br/>추천 병원(90%)</p>
            <p>2.EBS 명의에 출연하신 분들(10%)</p>
            {/*
            <p>3.숨은명의찾기 자체 추천(3%)</p>
            */}
            <div style={{border : '1px solid #eee'}}></div>
            <div style={{display:'flex', justifyContent:'center'}}>
              <p><span style={{color:'red'}}>구글 플레이스토어</span><br/> <span style={{color:'red'}}>'숨은명의찾기' 앱</span> 출시</p>
            </div>
            </div>
       
        </Drawer>
        </>
    );
}

export default Manual

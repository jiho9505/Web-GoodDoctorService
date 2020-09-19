import React , { useState } from 'react'
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps';
import { NAVER_KEY } from '../../../Config'
import './mapservice.css'


function Mapservice(props) {
    const NAVER_API_KEY = NAVER_KEY;

    return (
      
    <RenderAfterNavermapsLoaded
      ncpClientId={NAVER_API_KEY} 
      error={<p>Maps Load Error</p>}
      loading={<p>Maps Loading...</p>}

    >
      <NaverMap
        id='maps-getting-started-controlled'
        style={{
          width: 550, // 네이버지도 가로 길이
          height: 400 // 네이버지도 세로 길이
        }}
        defaultCenter={{ lat: 36.417382, lng: 128.158876 }} // 지도 초기 위치
        zoom={6}
       
      >
      
        {props.address !== null
          ? props.test.map((ele, idx) => {
              return (
                <Marker
                  // icon={""}
                  icon = {{
                    content: '<div class="pulse"/>' ,
                    anchor: {x:12, y:12}
                   // 중심 좌표 설정
                  }}
                  key={idx}
                  position={{ lat: ele.lat, lng: ele.lng }}
                  animation={2}
                  onClick={() => {
                    alert('hello');
                  }}
                />
              );
            })
          : null}
          
      </NaverMap>
    </RenderAfterNavermapsLoaded>
    )
}


export default Mapservice

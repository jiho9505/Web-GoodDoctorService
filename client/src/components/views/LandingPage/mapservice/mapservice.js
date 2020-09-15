import React , { useState } from 'react'
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps';

function Mapservice(props) {
    const NAVER_API_KEY = '1mqg482ke0';

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
        defaultCenter={{ lat: 37.554722, lng: 126.970833 }} // 지도 초기 위치
        zoom={props.zoom}
      >
        {/*
        {props.address !== null
          ? props.test.map((ele, idx) => {
              return (
                <Marker
                  // icon={""}
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
          */}
      </NaverMap>
    </RenderAfterNavermapsLoaded>
    )
}


export default Mapservice

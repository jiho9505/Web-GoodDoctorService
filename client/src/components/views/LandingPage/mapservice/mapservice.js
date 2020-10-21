import React , { useState ,useEffect } from 'react'
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps';
import { NAVER_KEY } from '../../../Config'
import './mapservice.css'

function Mapservice(props) {
    const NAVER_API_KEY = NAVER_KEY;
    const [lat, setlat] = useState(36.417382)
    const [lng, setlng] = useState(128.158876)
    const [zoom, setzoom] = useState(6)
    const [showHere, setshowHere] = useState(false)

    useEffect(() => {
      if(props.lat){
        setlat(props.lat)
        setlng(props.lng)
        setzoom(14)
        setshowHere(true)
        

      }
    }, [props.lat])

    return (
    <div>
      <RenderAfterNavermapsLoaded
        ncpClientId={NAVER_API_KEY} 
        error={<p>Maps Load Error</p>}
        loading={<p>Maps Loading...</p>}

      >
        <NaverMap
          id='maps-getting-started-controlled'
          
          defaultCenter={{ lat: 36.417382, lng: 128.158876}} // 지도 초기 위치
          center={{lat: lat, lng: lng }}
          zoom={zoom} 
          
        >

          {props.address !== null
            ? props.test.map((ele, idx) => {
                return (
                  <Marker
                    icon = {{
                      content: '<div class="pulse"/>' ,
                      anchor: {x:12, y:12}
                    }}
                    key={idx}
                    position={{ lat: ele.lat, lng: ele.lng }}
                    animation={2}
                  />
                );
              })
            : null}
          {showHere &&  <Marker
                    icon = {{
                      content: '<div class="here">Here!</div>' ,
                      anchor: {x:20, y:32}
                    }}
                   
                    position={{ lat: lat, lng: lng }}
                    animation={2}
                  />
                  }
        </NaverMap>
      </RenderAfterNavermapsLoaded>
    </div> 
    )
            }


export default Mapservice

import React, { useState } from 'react'
import { Col, Row  } from 'antd'
import Mapservice from "./mapservice/mapservice"
import CheckBox from "./checkbox/checkbox"
import CheckBox_2 from "./checkbox/checkbox_2"
import { Test } from './Test'
import HospitalList from './hospitalList/hospitalList'


function LandingPage(props) {
    
    const [continents, setcontinents] = useState(["hi","bye"])
    const [lat, setlat] = useState(0)
    const [lng, setlng] = useState(0)

    const refreshFunction = (lat,lng) => {
        setlat(lat)
        setlng(lng)
    }
    return (
        <div style = {{ width: '75%', margin: '3rem auto' }}>
            
           
            <br/>    
            <br/>

           <Row gutter={[64,64]}>
                <Col lg={12} xs={24}>
                    {/* CheckBox */}
                    <CheckBox list={continents}/>
                </Col>
                <Col lg={12} xs={24}>
                    {/* CheckBox */}
                    <CheckBox_2 list={continents}/>
                </Col>
            </Row>
            <Row gutter={[64,32]} style={{ marginTop: '3rem auto'}}>
                <Col lg={12} md={24} xs={24}>
                     
                    <Mapservice lat={lat} lng={lng} test={Test} style={{ margin: '3rem auto'}}/>
                    
                </Col>
                <Col lg={12} md={24} xs={24}>
                    
                    <div style={{width:'480px' , height: '400px' ,display:'flex', 
                    justifyContent:'center', alignItems:'center',overflowY : 'scroll'}}>
                        <div style={{height: '100%'}}>
                        {props.user && <HospitalList user={props.user} test={Test} refreshFunction={refreshFunction}/>}
                        </div>
                        
                    </div>
                </Col>
            </Row>
            
    
        </div>
    )
}

export default LandingPage

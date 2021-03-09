import React, {useState , useEffect} from 'react'
import { Drawer, List, Avatar, Divider, Col, Row , message , Button, Spin} from 'antd';
import {PlusCircleOutlined, LoadingOutlined  } from '@ant-design/icons';
import { withRouter } from "react-router-dom"




function HospitalList(props) {
  
    const list = props.test
    const [visible, setvisible] = useState(false)
    const [name, setname] = useState("")
    const [doctor, setdoctor] = useState("")
    const [location, setlocation] = useState("")
    const [part, setpart] = useState("")
    const [description, setdescription] = useState("")
    const [hospitalUrl, sethospitalUrl] = useState("")
    const [cafe, setcafe] = useState("")
    const [cafeName, setcafeName] = useState("")
    const [Show, setShow] = useState(false)
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    useEffect(() => {
      if(list.length > 0){
        setShow(true)
      } 
    }, [props.test])

    const DescriptionItem = ({ title, content }) => (
        <div className="site-description-item-profile-wrapper">
          <p className="site-description-item-profile-p-label">{title}:</p>
          {content}
        </div>
      );

    const showDrawer = (item) => {
        if(props.user.userData._id){
            setvisible(true)
            setname(item.name)
            setdoctor(item.doctor)
            setlocation(item.location)
            setpart(item.part)
            setdescription(item.descripiton)
            sethospitalUrl(item.hospital)
            setcafe(item.cafe)
            setcafeName(item.cafeName)
        }
        else{
          message.config({
            top: 100
          })
          message.success('로그인을 하셔야 이용할 수 있는 기능입니다.')
          setTimeout(() => {
            props.history.push('/login')
          }, 1000);
          
       };
    }
    
    const onClose = () => {
      setvisible(false)
    };
    
    const clickHandler = (lat,lng) => {
          props.refreshFunction(lat,lng)
    }

  return (
    <div> 
      {Show ? 
      <List
        dataSource={
            list
        }
        bordered
        renderItem={item => (

          <List.Item
            style={{paddingLeft:'5px', paddingRight:'5px'}}
            key={item.id}
            actions={[
              <a onClick={()=>{showDrawer(item)}} key={`a-${item.id}`}>
                특이사항
              </a>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar style={{marginTop:'20px',marginLeft:'5px',backgroundColor:'white'}} icon={<PlusCircleOutlined style={{fontSize:'25px' ,color:"#52c41a"}}/>} />
              }
              title={<a onClick={() => { clickHandler(item.lat,item.lng)}}>
                        <span>{item.name}</span>
                        <div>{item.doctor}</div>
                    </a>}
              description={item.location}
            />
          </List.Item>
          
        )}
      />
          : 
         <div style={{marginTop: '150px'}}>
            <Spin indicator={antIcon} size="large" />
         </div> }
      <Drawer        
        height={400}
        placement="top"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
          {name}
        </p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="의사" content={doctor} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="부위" content={part} />
          </Col>
        </Row>
        <Row>
        <Col span={24}>
            <DescriptionItem title="위치" content={location} />
          </Col>
        </Row>
        <Row span={24}>
          <Col>
            <DescriptionItem title="특이사항" content={description} />
          </Col>
        </Row>
        <Row span={24}>
          <Col>
            <DescriptionItem title="병원홈페이지" content={<a target='_blank' href={hospitalUrl}><Button>이동하기</Button></a>} />
          </Col>
        </Row>
        <Divider />
        <p className="site-description-item-profile-p">출처 카페</p>
        <Row>
          <Col span={24}>
            <p>더 많은 정보를 보길 원하면 해당 카페 방문!</p>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem title="카페이름" content={cafeName} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem title="카페홈페이지" content={<a target='_blank'  href={cafe}><Button>이동하기</Button></a>} />
          </Col>
        </Row>
        
       
      </Drawer>
 
    </div>
  )}

export default withRouter(HospitalList)


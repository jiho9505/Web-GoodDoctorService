import React, {useState, useEffect} from 'react'
import { Drawer, List, Avatar, Divider, Col, Row } from 'antd';
import {PlusCircleOutlined } from '@ant-design/icons';

function HospitalList(props) {
    useEffect(() => {
        let newlist = []
        props.test && props.test.map((test) => {
            newlist.push(test)
        })
        setlist(newlist)
    }, [])

    const [list, setlist] = useState([])
    const [visible, setvisible] = useState(false)
    const [name, setname] = useState("")
    
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
        }
        else{
            alert('로그인을 하셔야 사용 가능한 기능입니다!')
       };
    }
    
    const onClose = () => {
      setvisible(false)
    };
    

  return (
    <>
      <List
        dataSource={
            list
        }
        bordered
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[
              <a onClick={()=>{showDrawer(item)}} key={`a-${item.id}`}>
                특이사항 확인
              </a>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar style={{backgroundColor:'white'}} icon={<PlusCircleOutlined style={{fontSize:'25px' ,color:"#52c41a"}}/>} />
              }
              title={<a href="https://ant.design/index-cn">{item.name + '(' + item.doctor + ')'}</a>}
              description={item.location}
            />
          </List.Item>
        )}
      />
      <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
          {name}
        </p>
        <p className="site-description-item-profile-p">Personal</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Full Name" content="Lily" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Account" content="AntDesign@example.com" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="City" content="HangZhou" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Country" content="China🇨🇳" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Birthday" content="February 2,1900" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Website" content="-" />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Message"
              content="Make things as simple as possible but no simpler."
            />
          </Col>
        </Row>
        <Divider />
        <p className="site-description-item-profile-p">Company</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Position" content="Programmer" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Responsibilities" content="Coding" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Department" content="XTech" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Supervisor" content={<a>Lin</a>} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Skills"
              content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
            />
          </Col>
        </Row>
        <Divider />
        <p className="site-description-item-profile-p">Contacts</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Email" content="AntDesign@example.com" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Phone Number" content="+86 181 0000 0000" />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Github"
              content={
                <a href="http://github.com/ant-design/ant-design/">
                  github.com/ant-design/ant-design/
                </a>
              }
            />
          </Col>
        </Row>
      </Drawer>
    </>
  )}

export default HospitalList


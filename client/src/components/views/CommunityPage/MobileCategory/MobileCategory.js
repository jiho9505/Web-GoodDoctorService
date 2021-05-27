import React, { useState } from 'react'
import { Collapse, Radio } from 'antd';
const { Panel } = Collapse;

const list = [{
    _id : 0,
    name : '전체'
  },
  {
    _id : 1,
    name : '완치'
  },
  {
    _id : 2,
    name : '정보'
  },
  {
    _id : 3,
    name : '고민'
  }]


function MobileCategory(props) {

    const [Value, setValue] = useState(0)

    const renderRadioBox = () => (
        list.map((value,index) => (
            <Radio key={index} value={value._id}>{value.name}</Radio>
        ))
    )

    const handleChange = (e) => {
        setValue(e.target.value)
        props.refresh(e.target.value)
    }

    return (
        <div>
            <Collapse defaultActiveKey={['1']}>
                <Panel header="카테고리 선택" key="1">
                    <Radio.Group onChange={handleChange} value={Value}>

                        {renderRadioBox()}

                    </Radio.Group>
                </Panel>
            </Collapse>
        </div>
    )
}

export default MobileCategory


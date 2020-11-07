import React, { useState } from 'react'
import { Collapse, Radio } from 'antd';
const { Panel } = Collapse;


function MobileCategory(props) {

    const [Value, setValue] = useState(0)
    
    const renderRadioBox = () => (
        props.list &&  props.list.map((value) => (
            <Radio key={value._id} value={value._id}>{value.name}</Radio>
           
        ))
    )

    const handleChange = (event) => {

        setValue(event.target.value)
        props.refresh(event.target.value)
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


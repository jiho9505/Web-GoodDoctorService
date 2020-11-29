import React, { useState } from 'react'
import { Collapse, Checkbox } from 'antd';

const { Panel } = Collapse;

function CheckBox(props) {

    const [Checked, setChecked] = useState([])

    const handleToggle = (value) => {
       
        const currentIndex = Checked.indexOf(value)
        
        const newChecked = [...Checked]

        
        if (currentIndex === -1) {
            newChecked.push(value)
           
        } else {
            newChecked.splice(currentIndex, 1)
        }
        setChecked(newChecked)
        props.handleFilters(newChecked)
    }

    const renderCheckboxLists = () => props.list && props.list.map((value, index) => (
        <React.Fragment key={index} >
            <Checkbox
                onChange={() => handleToggle(value.key)}
                type="checkbox"
                checked={Checked.indexOf(value.key) === -1 ? false : true}
            />
           
            &nbsp;
            <span>{value.name}</span>
            &nbsp;
            &nbsp;
        </React.Fragment>
    ))
    return (
        <div>
            <Collapse defaultActiveKey={['0']} >
                <Panel style={{fontSize: '1.1rem'}} header="지역 선택하기" key="1">

                    {renderCheckboxLists()}

                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox
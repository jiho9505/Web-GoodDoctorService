import React, { useState } from 'react'

function SelectBox2(props) {

    const [SelectValue, setSelectValue] = useState(15)


    const handleToggle = (e) => {
        setSelectValue(e.currentTarget.value)
        const sendValue = e.currentTarget.value
    
        if(sendValue == 15){
            return props.handleFilters([])
        }

        props.handleFilters([sendValue])
    }

    const renderCheckboxLists = () => props.list && props.list.map((value, index) => (

            <option  key={index} value={value.key}>{value.name}</option>
    
    ))
    return (
        <div style={{ marginLeft:'10px'}}>
            <select  onChange={handleToggle} value={SelectValue} >
                    <option value={15}>부위 선택</option>
                    { renderCheckboxLists()}
            </select>
        </div>
    )
}

export default SelectBox2
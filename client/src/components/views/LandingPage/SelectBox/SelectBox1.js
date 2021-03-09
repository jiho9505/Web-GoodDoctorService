import React, { useState } from 'react'


function SelectBox1(props) {

    const [SelectValue, setSelectValue] = useState(15)


    const handleToggle = (e) => {
        setSelectValue(e.currentTarget.value)
        const sendValue = e.currentTarget.value
      
        if(sendValue == 15){
            return props.handleFilters([])
        }else{
            return props.handleFilters([sendValue])
        }
    }

    const renderCheckboxLists = () => props.list && props.list.map((value, index) => (

            <option  key={index} value={value.key}>{value.name}</option>
    
    ))
    return (
        <div >
            <select  onChange={handleToggle} value={SelectValue} >
                    <option value={15}>지역 선택</option>
                    {renderCheckboxLists()}
            </select>
        </div>
    )
}

export default SelectBox1



 
    

import React from 'react'
import { Select } from 'antd'

const { Option } = Select;

function MobileCategory(props) {

    function handleChange(value) {
        props.refresh(value)
      }

    return (
        <>
        <Select defaultValue="카테고리" style={{ width: 100  }} onChange={handleChange}>
          <Option value="a">전체 보기</Option>
          <Option value="b">완치 후기</Option>
          <Option value="c">정보 공유</Option>
          <Option value="d">고민 털기</Option>
        </Select>
        
      </>
    )
}

export default MobileCategory

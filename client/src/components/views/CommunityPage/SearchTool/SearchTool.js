import React from 'react'
import { Input } from 'antd'

const { Search } = Input

function SearchTool() {
    return (
        <div style = {{display:'flex', justifyContent:'center'}}>
            <Search placeholder='검색어를 입력해주세요' onchange style={{width : 250}}/>
        </div>
    )
}

export default SearchTool

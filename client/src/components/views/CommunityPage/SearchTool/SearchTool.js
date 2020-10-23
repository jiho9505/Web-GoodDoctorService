import React from 'react'
import { Input } from 'antd'

const { Search } = Input

function SearchTool(props) {
    
        
        const onChangeSearch = (value) => {
            props.refreshFunction(value)
            console.log(value)
        }

        return (
            <div style = {{display:'flex', justifyContent:'center'}}>
                 
                    <Search
                    placeholder='검색어(제목|내용)를 입력해주세요'  
                    style={{width : 300}}
                    onSearch={onChangeSearch}
                    enterButton
                     />
              
                
            </div>
        )
    
}

export default SearchTool
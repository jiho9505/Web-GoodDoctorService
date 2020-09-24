import React from 'react'
import { Result, Button } from 'antd';

function NotFound() {
    return (
        <div>
            <Result
                status="404"
                title="404"
                subTitle="더 이상 유효한 페이지가 아닙니다."
                extra={<a href="/"><Button type="primary">Home</Button></a>}
            />
        </div>
    )
}

export default NotFound
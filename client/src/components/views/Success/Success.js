import React from 'react'
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

function Success() {
    return (
        <div style={{marginTop : 50}}>
            <Result
                status="success"
                title="비밀번호 변경 성공!"
                extra={[
                <Link to='/login'><Button type="primary" key="console">
                    Login
                </Button>
                </Link>
                ]}
  />
        </div>
    )
}

export default Success

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { auth } from '../_actions/user_actions';
import { useSelector, useDispatch } from "react-redux";
import { message } from 'antd'

export default function (SpecificComponent, option, adminRoute = null) {
    function AuthenticationCheck(props) {

        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {
            //To know my current status, send Auth request 
            dispatch(auth()).then(response => {
                //Not Loggined in Status 
                if (!response.payload.isAuth) {
                    if (option) {
                        message.config({
                            top: 100
                          })
                        message.success('로그인을 하셔야 이용할 수 있는 기능입니다.')
            
                            props.history.push('/login')
                       
                        
                    }
                    //Loggined in Status 
                } else {
                    //supposed to be Admin page, but not admin person wants to go inside
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    }
                    //Logged in Status, but Try to go into log in page 
                    else {
                        if (option === false) {
                            props.history.push('/')
                        }
                    }
                }
            })

        }, [])

        return (
            <SpecificComponent {...props} user={user} />
        )
    }
    return AuthenticationCheck
}



import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Icon, Input, Button } from 'antd';

import axios from 'axios'

function FindPassword(props) {
  const [formErrorMessage, setFormErrorMessage] = useState('')

  return (
   
   
    <Formik
      initialValues={{
        email: ''
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('E-mail을 정확히 입력해주세요')
          .required('이메일을 입력해주세요')
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email
          };
          axios.post('/api/users/findpassword',dataToSubmit)
               .then(response => {
               
                 if(!response.data.success){
                   setFormErrorMessage(response.data.message)
                  setTimeout(() => {
                    setFormErrorMessage("")
                  }, 3000);
                 
                 }
                 else{
                  props.history.push('/findpwnextpage') 
                 }   
                }          
            )
            .catch(err => {
              setFormErrorMessage('Error 발생!')
              setTimeout(() => {
                setFormErrorMessage("")
              }, 3000);
            });
          setSubmitting(false);
        }, 500)
      }}
        >
      {props => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <div className="app">

            
            <form onSubmit={handleSubmit} style={{ width: '350px' ,marginBottom: 100 }}>
                비밀번호를 잃어버리셨나요?
                <br/>
                숨은명의찾기에 가입한 이메일을 정확히 입력해 주세요.
                <br/>
                이메일을 통해 비밀번호 수정 링크가 전송됩니다.
                <br/>
                <br/>
              <Form.Item required>
                <Input
                  id="email"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="이메일을 입력해주세요"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>


              {formErrorMessage && (
                <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
              )}

              <Form.Item>
    
                
                <div>
                  <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' 
                }} disabled={isSubmitting} onSubmit={handleSubmit}>
                    비밀번호 찾기
                </Button>
                </div>
               
              </Form.Item>
            </form>
          </div>
        );
      }}
    </Formik>
  
  );
};

export default withRouter(FindPassword);



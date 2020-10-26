import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button , message} from 'antd';
import axios from 'axios'


const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  
const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  
function RemoveUser(props) {
 
  const [formErrorMessage, setFormErrorMessage] = useState('') 

  return (
   
   
    <Formik
      initialValues={{
        password: '',
      }}
      validationSchema={Yup.object().shape({
        
        password: Yup.string()
          .required('비밀번호를 입력해주세요'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            password: values.password,
            _id : localStorage.getItem('userId')
          };

          axios.post('/api/users/remove',dataToSubmit)
               .then(response => {
                 
                  if(response.data.success){
                    message.config({
                        top: 100
                      })
                    message.success('탈퇴가 정상적으로 이루어졌습니다.')
            
                    setTimeout(() => {
                        props.history.push('/')
                    }, 1000)

                  }
                  else{
                    alert(response.data.message)

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
        }, 500);
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

            <h3 style={{ display:'flex', justifyContent:'center' }}>-회원 탈퇴-</h3>
            <Form className='RemoveUserForm' {...formItemLayout} onSubmit={handleSubmit}>
                
                
                
                <br></br>

                <Form.Item required label="비밀번호" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
                    <Input
                    id="password"
                    placeholder="비밀번호를 입력해주세요"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                        errors.password && touched.password ? 'text-input error' : 'text-input'
                    }
                    />
                    {errors.password && touched.password && (
                    <div className="input-feedback">{errors.password}</div>
                    )}
                </Form.Item>

              {formErrorMessage && (
                <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
              )}


              <Form.Item {...tailFormItemLayout}>
                <Button className='RemoveUserButton' onClick={handleSubmit} type='danger' shape='round' disabled={isSubmitting}>
                  회원 탈퇴
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  
  );
};

export default withRouter(RemoveUser);




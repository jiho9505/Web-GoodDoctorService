import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button , message} from 'antd';
import { ExclamationCircleOutlined} from '@ant-design/icons';
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
  
function PwdChange(props) {
 
  const [formErrorMessage, setFormErrorMessage] = useState('') 

  return (
   
   
    <Formik
      initialValues={{
        confirmPassword: '',
        password: '',
        prepassword: ''
      }}
      validationSchema={Yup.object().shape({
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다')
          .required('비밀번호를 다시 입력해주세요'),
        password: Yup.string()
          .min(5, '비밀번호는 최소 5자 이상 입력해주세요')
          .required('비밀번호를 입력해주세요'),
        prepassword: Yup.string()
          .min(5, '비밀번호는 최소 5자 이상 입력해주세요')
          .required('비밀번호를 입력해주세요'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            password: values.password,
            prepassword: values.prepassword,
            _id : localStorage.getItem('userId')
          };

          axios.post('/api/users/changepwd',dataToSubmit)
               .then(response => {
                 
                  if(response.data.success){
                    message.config({
                        top: 100
                      })
                    message.success(response.data.message)
            
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000)

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

            
            <Form style={{ minWidth: '375px',marginRight: 75 }} {...formItemLayout} onSubmit={handleSubmit}>
                <h3 style={{ display:'flex', justifyContent:'center' ,marginLeft: 70 }}>비밀번호 변경
                <ExclamationCircleOutlined style={{ marginTop: 5 }} /></h3>
                
                <br></br>

                <Form.Item required label="현재 비밀번호" hasFeedback validateStatus={errors.prepassword && touched.prepassword ? "error" : 'success'}>
                <Input
                  id="prepassword"
                  placeholder="현재 비밀번호를 입력해주세요"
                  type="password"
                  value={values.prepassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.prepassword && touched.prepassword ? 'text-input error' : 'text-input'
                  }
                />
                {errors.prepassword && touched.prepassword && (
                  <div className="input-feedback">{errors.prepassword}</div>
                )}
              </Form.Item>

                <Form.Item required label="새 비밀번호" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
                    <Input
                    id="password"
                    placeholder="새 비밀번호를 입력해주세요"
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

              <Form.Item required label="비밀번호 확인" hasFeedback>
                <Input
                  id="confirmPassword"
                  placeholder="비밀번호를 다시 입력해주세요."
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="input-feedback">{errors.confirmPassword}</div>
                )}
              </Form.Item>

              {formErrorMessage && (
                <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
              )}


              <Form.Item {...tailFormItemLayout}>
                <Button style={{ marginLeft: 50 }} onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                  비밀번호 변경
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  
  );
};

export default withRouter(PwdChange);



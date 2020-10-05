import React, { useState , useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button } from 'antd';
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
  
function ResetPw(props) {
  const tokenId = props.match.params.tokenId
  const [formErrorMessage, setFormErrorMessage] = useState('')
  
  let body =  {
    token : tokenId
  }

  useEffect(()=>{
    axios.post('/api/tokenauth',body)
         .then(response => {
           if(!response.data.success){
             props.history.push('/notfound')
           }
         })
  },[])
    

  return (
   
   
    <Formik
      initialValues={{
        confirmPassword: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다')
          .required('비밀번호를 다시 입력해주세요'),
        password: Yup.string()
          .min(8, '비밀번호는 최소 8자 이상 입력해주세요')
          .required('비밀번호를 입력해주세요')
          .matches(
            /^.*(?=.{8,})(?=.*\d)((?=.*[a-zA-Z]){1}).*$/,
            "영어와 숫자 조합이 필요합니다"
          ),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            password: values.password,
            tokenId
          };
          axios.post('/api/users/resetpw',dataToSubmit)
               .then(response => {
                 
                  if(response.data.success){
                    props.history.push('/success')

                  }
                  else{
                    props.history.push('/notfound')

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
                <h3 style={{ display:'flex', justifyContent:'center' ,marginLeft: 70 }}>새로운 비밀번호를 입력해주세요
                <ExclamationCircleOutlined style={{ marginTop: 5 }} /></h3>
                
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

export default withRouter(ResetPw);



import React from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom"

import {
  Form,
  Input,
  Button,
  Typography,
  message
} from 'antd';

const {Title} = Typography

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

function RegisterPage(props) {
  const dispatch = useDispatch();
  return (

    <Formik
      initialValues={{
        email: '',
        nickname: '',
        password: '',
        confirmPassword: '',
        birth: ''
      }}
      validationSchema={Yup.object().shape({
        nickname: Yup.string()
          .max(8, '닉네임 길이 제한')
          .required('닉네임을 입력해주세요'),
        email: Yup.string()
          .email('유효하지 않습니다')
          .required('E-mail을 입력해주세요'),
        password: Yup.string()
          .min(8, '비밀번호는 최소 8자 이상 가능합니다')
          .required('비밀번호를 입력해주세요')
          .matches(
            /^.*(?=.{8,})(?=.*\d)((?=.*[a-zA-Z]){1}).*$/,
            "영어와 숫자 조합이 필요합니다"
          ),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다')
          .required('비밀번호를 다시 입력해주세요'),
        birth: Yup.string()
          .min(8, "생년월일(8자리)을 입력해주세요")
          .max(8, "생년월일(8자리)을 입력해주세요")
          .required("생년월일(8자리)을 입력해주세요"),
  
        
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {

          let dataToSubmit = {
            email: values.email,
            password: values.password,
            nickname: values.nickname,
            birth: values.birth
           
          };
          

          dispatch(registerUser(dataToSubmit)).then(response => {
            if (response.payload.success) {
                  message.config({
                    top: 100
                  })
                message.success("회원가입 성공!")
                setTimeout(() => {
                  props.history.push('/login')
                }, 3000);
              
            } else {
        
              alert(response.payload.message)
            }
          })

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
          <div className="app_">
            <br/>
            <br/>
            <Title className='reg_title' level={3}>회원 가입</Title>
            <br/>
            <div className="register">
            <Form  {...formItemLayout} onSubmit={handleSubmit} >


            <Form.Item required label="E-mail" hasFeedback validateStatus={errors.email && touched.email ? "error" : 'success'}>
                <Input
                  id="email"
                  placeholder="이메일을 입력해주세요."
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

              <Form.Item required label="닉네임">
                <Input
                  id="nickname"
                  placeholder="닉네임을 입력해주세요."
                  type="text"
                  value={values.nickname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.nickname && touched.nickname ? 'text-input error' : 'text-input'
                  }
                />
                {errors.nickname && touched.nickname && (
                  <div className="input-feedback">{errors.nickname}</div>
                )}
              </Form.Item>

              <Form.Item required label="생년월일">
                <Input
                  id="birth"
                  placeholder="생년월일(8자리)을 입력해주세요"
                  type="number"
                  value={values.birth}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.birth && touched.birth ? 'text-input error' : 'text-input'
                  }
                />
                {errors.birth && touched.birth && (
                  <div className="input-feedback">{errors.birth}</div>
                )}
              </Form.Item>
       
             

              <Form.Item {...tailFormItemLayout}>
                <Button className='reg_button' onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                  가입하기
                </Button>
              </Form.Item>
            </Form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};


export default withRouter(RegisterPage)

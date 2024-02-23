import axios, {  AxiosResponse } from "axios";
import { useForm } from "hooks/useForm";
import { NextPage } from "next";

type field = {
  label:string,
  type: 'text' | 'password' | 'textarea',
  key: 'username' | 'password'|'passwordConfirmation'
}

const SignUp:NextPage = () =>{
  const {form} = useForm({
    initFormData: {username: '',password: '',passwordConfirmation:''},
    fields: [
      {label: '用户名',type: 'text' as 'text',key: 'username'},
      {label: '密码',type: 'password' as 'password',key: 'password'},
      {label: '确认密码',type: 'password' as 'password',key: 'passwordConfirmation'},
    ],
    buttons: <button type="submit">注册</button>,
    submit: {
      request: formData => axios.post(`/api/v1/users`,formData),
      success: () => window.alert('注册成功')
    }
  })
  return (
    <>
    <h1>注册</h1>
    {form}
    </>
  )
}

export default SignUp
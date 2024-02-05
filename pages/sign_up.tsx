import axios, {  AxiosResponse } from "axios";
import { useForm } from "hooks/useForm";
import { NextPage } from "next";

type field = {
  label:string,
  type: 'text' | 'password' | 'textarea',
  key: 'username' | 'password'|'passwordConfirmation'
}

const SignUp:NextPage = () =>{

  

  const initFormData = {
    username: '',
    password: '',
    passwordConfirmation:''
  }
  const fields:field[] = [
    {
      label: '用户名',
      type: 'text' as 'text',
      key: 'username'
    },
    {
      label: '密码',
      type: 'password' as 'password',
      key: 'password'
    },
    {
      label: '确认密码',
      type: 'password' as 'password',
      key: 'passwordConfirmation'
    },
  ]
  
  // useCallback的意思是只在第一次渲染时创建一个函数，后面空数组表示不管什么变这个useCallback都不变
  // 这里需要依赖formData这个数据，当数据变化，这个useCallback就要变化
  const onSubmit = (formData: typeof initFormData) => {
    console.log(formData);
    axios.post(`/api/v1/users`,formData)
      .then(()=>{
        window.alert('注册成功')
        // window.location.href = '/sign_in'
      },(err)=>{
        if(err.response){
          const response:AxiosResponse =  err.response
          if(response.status === 422){
            setErrors(response.data)
          }
        }
      })
  }

  const {form,setErrors} = useForm(initFormData,fields,<button type="submit">注册</button>,onSubmit)
  return (
    <>
    <h1>注册</h1>
    {form}
    </>
  )
}

export default SignUp
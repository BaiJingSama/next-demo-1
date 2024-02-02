import axios, { AxiosError, AxiosResponse } from "axios";
import { NextPage } from "next";
import { useCallback, useState } from "react";

const SignIn:NextPage = () =>{
  const [formData,setFormData] = useState({
    username: '',
    password: '',
    passwordConfirmation: ''
  })
  const [errors,setErrors] = useState({
    username: [],
    password: [],
    passwordConfirmation: []
  })
  
  // useCallback的意思是只在第一次渲染时创建一个函数，后面空数组表示不管什么变这个useCallback都不变
  // 这里需要依赖formData这个数据，当数据变化，这个useCallback就要变化
  const onSubmit = useCallback((e) => {
    e.preventDefault(); //取消submit默认事件否则提交时页面会刷新
    console.log(formData);
    axios.post(`/api/v1/sessions`,formData)
      .then(()=>{
        window.alert('登录成功')
        window.location.href = '/'
      },(err)=>{
        if(err.response){
          const response:AxiosResponse =  err.response
          if(response.status === 422){
            setErrors(response.data)
          }
        }
      })
  },[formData])
  return (
    <>
    <h1>登录</h1>
    <form onSubmit={onSubmit}>
      <div>
        <label>
          用户名
          <input 
            type="text" 
            value={formData.username} 
            onChange={e => setFormData({
              ...formData,
              username: e.target.value
            })}
            />
        </label>
        {errors.username?.length > 0 && 
        <div>
          {errors.username.join(',')}
        </div>}
      </div>
      <div>
        <label>
          密码
          <input 
            type="password"
            value={formData.password} 
            onChange={e => setFormData({
              ...formData,
              password: e.target.value
            })}
          />
        </label>
        {errors.password?.length > 0 && 
        <div>
          {errors.password.join(',')}
        </div>}
      </div>
      <div>
        <button type="submit">登录</button>
      </div>
    </form>
    </>
  )
}

export default SignIn
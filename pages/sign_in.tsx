import axios, { AxiosError, AxiosResponse } from "axios";
import { Form } from "components/Form";
import { withSession } from "lib/withSession";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useCallback, useState } from "react";
import { User } from "src/entity/User";

const SignIn: NextPage<{ user: User }> = (props) => {
  console.log(props.user)
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [errors, setErrors] = useState({
    username: [],
    password: []
  })

  const fields = [
    {
      label: '用户名',
      type: 'text' as 'text',
      value: formData.username,
      onChange: e => setFormData({
        ...formData,
        username: e.target.value
      }),
      errors: errors.username
    },
    {
      label: '密码',
      type: 'password' as 'password',
      value: formData.password,
      onChange: e => setFormData({
        ...formData,
        password: e.target.value
      }),
      errors: errors.password
    },
  ]

  // useCallback的意思是只在第一次渲染时创建一个函数，后面空数组表示不管什么变这个useCallback都不变
  // 这里需要依赖formData这个数据，当数据变化，这个useCallback就要变化
  const onSubmit = useCallback((e) => {
    e.preventDefault(); //取消submit默认事件否则提交时页面会刷新
    console.log(formData);
    axios.post(`/api/v1/sessions`, formData)
      .then(() => {
        window.alert('登录成功')
        // window.location.href = '/'
      }, (err) => {
        if (err.response) {
          const response: AxiosResponse = err.response
          if (response.status === 422) {
            setErrors(response.data)
          }
        }
      })
  }, [formData])
  return (
    <>
      {props.user &&
        <div>
          当前登录用户为{props.user.username}
        </div>
      }
      <h1>登录</h1>
      <Form fields={fields} onSubmit={onSubmit} buttons={<>
        <button type="submit">登录</button>
      </>}></Form>
    </>
  )
}

export default SignIn


export const getServerSideProps: GetServerSideProps =
  withSession(
    async (context: GetServerSidePropsContext) => {
      //  @ts-ignore
      let user = context.req.session.get('currentUser') ? JSON.parse(JSON.stringify(context.req.session.get('currentUser'))) : null
      return {
        props: {
          user
        }
      }
    }
  )
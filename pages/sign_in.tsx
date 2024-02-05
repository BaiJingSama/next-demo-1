import axios, { AxiosResponse } from "axios";
import { useForm } from "hooks/useForm";
import { withSession } from "lib/withSession";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { User } from "src/entity/User";

const SignIn: NextPage<{ user: User }> = (props) => {
  const {form} = useForm({
    initFormData:{username: '',password: ''},
    fields: [
      {label: '用户名',type: 'text' as 'text',key: 'username'},
      {label: '密码',type: 'password' as 'password',key: 'password'}
    ],
    buttons: <button type="submit">登录</button>,
    submit:{
      request: formData => axios.post(`/api/v1/sessions`, formData),
      message: '登录成功'
    }
  })

  return (
    <>
      {props.user &&
        <div>
          当前登录用户为{props.user.username}
        </div>
      }
      <h1>登录</h1>
      {form}
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
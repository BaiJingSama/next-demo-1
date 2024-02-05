import axios, { AxiosResponse } from "axios";
import { useForm } from "hooks/useForm";
import { withSession } from "lib/withSession";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { User } from "src/entity/User";

type field = {
  label:string,
  type: 'text' | 'password' | 'textarea',
  key: 'username' | 'password'
}

const SignIn: NextPage<{ user: User }> = (props) => {
  const initFormData = {
    username: '',
    password: ''
  }

  const fields:field[] = [
    {
      label: '用户名',
      type: 'text' as 'text',
      key: 'username',
    },
    {
      label: '密码',
      type: 'password' as 'password',
      key: 'password',
    },
  ]

    const onSubmit = (formData: typeof initFormData) => {
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
  }

  const {form,setErrors} = useForm(initFormData,fields,<button type="submit">登录</button>,onSubmit)

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
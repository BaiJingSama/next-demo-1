import axios, { AxiosResponse } from "axios";
import { Form } from "components/Form";
import { NextPage } from "next";
import { useCallback, useState } from "react";

const PostsNew:NextPage = ()=>{
  const [formData,setFormData] = useState({
    title: '',
    context: ''
  })
  const [errors,setErrors] = useState({
    title: [],
    context: []
  })
  const fields = [
    {
      label: '标题',
      type: 'text' as 'text',
      value: formData.title,
      onChange: e => setFormData({
        ...formData,
        title: e.target.value
      }),
      errors: errors.title
    },
    {
      label: '内容',
      type: 'textarea' as 'textarea',
      value: formData.context,
      onChange: e => setFormData({
        ...formData,
        context: e.target.value
      }),
      errors: errors.context
    }
  ]
  const onSubmit = useCallback((e) => {
    e.preventDefault(); //取消submit默认事件否则提交时页面会刷新
    console.log(formData);
  },[formData])
  return (
    <div>
      <Form fields={fields} onSubmit={onSubmit} buttons={<>
        <button type="submit">提交</button>
      </>}></Form>
    </div>
  )
}

export default PostsNew
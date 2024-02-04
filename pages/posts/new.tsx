import axios, { AxiosResponse } from "axios";
import { Form } from "components/Form";
import { useForm } from "hooks/useForm";
import { NextPage } from "next";
import { useCallback, useState } from "react";

type field = {
  label:string,
  type: 'text' | 'password' | 'textarea',
  key: 'title' | 'content'
}

const PostsNew:NextPage = ()=>{
  const onSubmit = (formData: typeof initFormData) => {
    axios.post('/api/v1/posts',formData)
      .then(()=>{
        window.alert('提交成功')
      },(e)=>{
        if(e.response){
          const response:AxiosResponse = e.response
          setErrors(response.data)
        }
      })
  }
  const fields:field[] = [
    {
      label: '标题',
      type: 'text',
      key: 'title'
    },
    {
      label: '内容',
      type: 'textarea',
      key: 'content'
    }
  ]
  const initFormData = {title: '',content:''}
  const {form,setErrors} = useForm(
    initFormData,
    fields,
    <button type="submit">提交</button>,
    onSubmit
  )
  
  return (
    <div>
      {form}
    </div>
  )
}

export default PostsNew
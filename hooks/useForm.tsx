import { AxiosResponse } from "axios";
import { ChangeEventHandler, useCallback, useState } from "react"

type Filed<T> = {
  label: string,
  type: 'text' | 'password' | 'textarea',
  key: keyof T,
}

type useFormOptions<T> = {
  initFormData:T ;
  fields:Filed<T>[];
  buttons:React.ReactElement;
  submit: {
    request: (formData:T)=> Promise<AxiosResponse<T>>;
    message: string
  }
}
export function useForm<T>(options:useFormOptions<T>){
  // 非受控
  const {initFormData,fields,buttons,submit} = options
  const [formData,setFormData] = useState(initFormData)

  const [errors,setErrors] = useState(()=>{
    const e:{[k in keyof T]?:string[]} = {}
    for(let key in initFormData){
      if(initFormData.hasOwnProperty(key)){
        e[key] = []
      }
    }
    return e
  })
  const onChange = useCallback((key: keyof T,value:any) =>{
    setFormData({
      ...formData,
      [key]: value
    })
  },[formData])
  const _onSubmit = useCallback((e) =>{
    e.preventDefault()
    submit.request(formData).then(()=>{
      window.alert(submit.message)
    },(e)=>{
      if(e.response){
        const response:AxiosResponse = e.response
        setErrors(response.data)
      }
    })
  },[submit,formData])
  const form = (
    <form onSubmit={_onSubmit}>
      {fields.map(field=>
        <div key={field.key.toString()}>
          <label>
            {field.label}
            {field.type === 'textarea' 
            ? <textarea onChange={(e)=>onChange(field.key,e.target.value)} value={formData[field.key].toString()}></textarea>
            : <input type={field.type} value={formData[field.key].toString()}
              onChange={(e)=>onChange(field.key,e.target.value)}
            />}
            
          </label>
          {errors[field.key]?.length > 0 && <div>
            {errors[field.key].join(',')}
          </div>}
        </div>  
      )}
      <div>
        {buttons}
      </div>
    </form>
  )
  return {
    form,
    setErrors
  }
}
import { ChangeEventHandler, FormEventHandler, InputHTMLAttributes, ReactChild } from "react"

type Props = {
  fields: {
    label:string,
    type: 'text' | 'password',
    value: string | number,
    onChange: ChangeEventHandler<HTMLInputElement>,
    errors?: string[]
  }[]
  onSubmit: FormEventHandler
  buttons: React.ReactElement
}

export const Form:React.FC<Props> = (props) =>{
  return (
    <form onSubmit={props.onSubmit}>
      {props.fields.map(field=>
        <div>
          <label>
            {field.label}
            <input type={field.type} value={field.value}
              onChange={field.onChange}
            />
          </label>
          {field.errors?.length > 0 && <div>
            {field.errors.join(',')}
          </div>}
        </div>  
      )}
      <div>
        {props.buttons}
      </div>
    </form>
  )
}

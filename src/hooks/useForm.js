import { useState } from "react"

export const useForm = (initialForm) => {
  
  const [formState, setFormState] = useState(initialForm);
  
  const handleChange = ({ target: { value, name } }) => {
    setFormState({
      ...formState,
      [name]: value
    })
  }

  return {
    setFormState,
    ...formState,
    formState,
    handleChange
  }
}

import { useState } from 'react'

const useSetFormInputs = (formInputs: any) => {
  const [data, setData] = useState(formInputs)

  const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setData({ ...data, [name]: value })
  }

  return { data, onInputChange }
}

export default useSetFormInputs

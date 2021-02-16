import { useState } from "react"

export const useForm = (initialState = {}) => {

    const [valueForm, setValueForm] = useState(initialState)

    const handleChange = ({target}) => {
        setValueForm({
            ...valueForm,
            [target.name]: target.value
        })
    }

    const reset = () => {
        setValueForm(initialState)
    }

    return [ valueForm, handleChange, reset ]

}
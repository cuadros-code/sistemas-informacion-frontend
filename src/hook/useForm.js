import { useState } from "react"

export const useForm = (initialState = {}) => {

    const [valueForm, setValueForm] = useState(initialState)

    const handleChange = ({ target }) => {
        setValueForm({
            ...valueForm,
            [target.name]: target.value
        })
    }

    const handleChangeCheck = ({ target }) => {

        // console.log(target.value);
        setValueForm({
            ...valueForm,
            [target.name]: target.checked
        })


        // console.log(valueForm);
    }


    const reset = () => {
        setValueForm(initialState)
    }

    return [valueForm, handleChange, reset, handleChangeCheck]

}
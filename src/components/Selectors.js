import React from 'react'
import { options } from '../data/options'
import { useForm } from '../hook/useForm'

export const Selectors = () => {

    const [valueForm, handleChange] = useForm({
        select: ''
    })

    const { select } = valueForm

    return (
        <>
            <div
                className="selectors__container"
            >
                <p className="title">Desarrollo e Innovación</p>

                <div className="options">
                    <label htmlFor="selector">Año de encuesta</label>
                    <select 
                        name="select" 
                        id="selector"
                        onChange={handleChange}
                        value={select}
                    >
                        <option value="" disabled >Seleccione</option>
                        {
                            options.map(option => (
                                <option
                                    value={option.value}
                                    key={option.id}
                                >
                                    {option.value}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <button
                className="btn__consulta"
                >
                    consultar
                </button>

            </div>
        </>
    )
}

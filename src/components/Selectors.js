import React, { useState } from 'react'
import { options } from '../data/options'
import { useForm } from '../hook/useForm'
import { Bar, Pie, Polar, Line } from 'react-chartjs-2';
import { backgroundColor, borderColor } from '../data/colorChart';

export const Selectors = () => {

    const [dataChart, setDataChart] = useState({})

    const [valueForm, handleChange, , handleChangeCheck] = useForm({
        year: '',
        nuevoProducto: false,
        servicioNuevo: false,
        servicioInternacional: false
    })

    const { year, nuevoProducto, servicioNuevo, servicioInternacional } = valueForm


    const handleSubmit = async (e) => {
        e.preventDefault()
        let consulta = {}

        if (year !== '') consulta.AÑO = year

        if (nuevoProducto) consulta.I1R1C1 = '1'

        if (servicioNuevo) consulta.I1R2C1 = '1'

        if (servicioInternacional) consulta.I1R3C1 = '1'



        const res = await fetch('http://localhost:4001/si', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(consulta)
        })
        const data = await res.json()

        console.log(data);
        setDataChart({
            labels: data?.labels,
            datasets: [
                {
                    label: 'Encuesta Edit',
                    data: data.respuesta.map(res => res),
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    borderWidth: 1,
                },
            ],
        })
    }

    return (

        <>
            <div className="container-app">
                <form
                    onSubmit={handleSubmit}
                >
                    <div
                        className="selectors__container"
                    >
                        <p className="title">Desarrollo e Innovación</p>

                        <div className="options">
                            <label htmlFor="selector">Año de encuesta</label>
                            <select
                                name="year"
                                id="selector"
                                onChange={handleChange}
                                value={year}
                            >
                                <option value="" disabled >Seleccione</option>
                                {
                                    options.map(option => (
                                        <option
                                            value={option.value}
                                            key={option.id}
                                        >
                                            {option.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="options" >
                            <label>Adquisicion de nuevos productos</label>
                            <input
                                type="checkbox"
                                value={nuevoProducto}
                                onChange={handleChangeCheck}
                                name="nuevoProducto"
                                id=""
                            />
                        </div>

                        <div className="options mt-5" >
                            <label>Servicios nuevos mercado nacional</label>
                            <input
                                type="checkbox"
                                value={servicioNuevo}
                                onChange={handleChangeCheck}
                                name="servicioNuevo"
                                id=""
                            />
                        </div>
                        <div className="options mt-5" >
                            <label>Servicios nuevos mercado internacional</label>
                            <input
                                type="checkbox"
                                value={servicioInternacional}
                                onChange={handleChangeCheck}
                                name="servicioInternacional"
                                id=""
                            />
                        </div>

                        <button
                            className="btn__consulta"
                        >
                            consultar
                </button>

                    </div>
                </form>

                <div className="container-grafica">
                    {/* <Bar data={dataChart} /> */}
                    {/* <Pie data={dataChart} /> */}
                    <Polar data={dataChart} />
                    {/* <Line data={dataChart} /> */}
                </div>
            </div>
        </>
    )
}

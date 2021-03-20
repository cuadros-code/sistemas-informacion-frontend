import React, { useState } from 'react'
import { options } from '../data/options'
import { useForm } from '../hook/useForm'
import { Bar, Polar } from 'react-chartjs-2';
import { backgroundColor, borderColor } from '../data/colorChart';
import { getData } from '../helpers/getData';

export const Selectors = () => {

  const [tipoGrafica, setTipoGrafica] = useState(false)

  const [dataChart, setDataChart] = useState({})

  const [alert, setAlert] = useState(false)

  const [valueForm, handleChange, , handleChangeCheck] = useForm({
    year: '',
    nuevoProducto: false,
    servicioNuevo: false,
    servicioInternacional: false,
    metodoProduccion: false,
    proyectoEnMarcha: false,
    metodosOrganizativos: false,
    certificadoCalidad: false,
    contratoConfidencial: false,
    registroSoftware: false,
  })

  const {
    year,
    nuevoProducto,
    servicioNuevo,
    servicioInternacional,
    metodoProduccion,
    proyectoEnMarcha,
    metodosOrganizativos,
    certificadoCalidad,
    contratoConfidencial,
    registroSoftware, } = valueForm



  const handleSubmit = async (e) => {
    e.preventDefault()
    let consulta = {}
    if (year !== '') {
      consulta.AÑO = year
      setAlert(false)
    }
    else {
      return setAlert(true)
    }

    if (nuevoProducto) consulta.I1R1C1 = '1'
    if (servicioNuevo) consulta.I1R2C1 = '1'
    if (metodoProduccion) consulta.I1R9C1 = '1'
    if (proyectoEnMarcha) consulta.I5R1C1 = '1'
    if (certificadoCalidad) consulta.VI6R1C1 = '1'
    if (metodosOrganizativos) consulta.I1R10C1 = '1'
    if (servicioInternacional) consulta.I1R3C1 = '1'
    if (contratoConfidencial) consulta.VI3R4C1 = '1'
    if (registroSoftware) consulta.VI1R4C1 = '1'

    const data = await getData(consulta)

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


  const handleChangeTipoGrafica = () => {
    setTipoGrafica(!tipoGrafica)
  }

  return (

    <>
      {
        alert &&
        <div className="alert alert-danger position-absolute w-100 text-center" role="alert">
          Ingrese un año para realizar la consulta
                </div>
      }
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

            <div className="options mt-4" >
              <label>Adquirio algun registro de software para trabajar en producción
                            </label>
              <input
                type="checkbox"
                className="options-input"
                value={registroSoftware}
                onChange={handleChangeCheck}
                name="registroSoftware"
                id=""
              />
            </div>

            <div className="options mt-4" >
              <label>Adquisicion de nuevos productos</label>
              <input
                type="checkbox"
                value={nuevoProducto}
                onChange={handleChangeCheck}
                name="nuevoProducto"
                className="options-input"
                id=""
              />
            </div>

            <div className="options mt-4" >
              <label>Servicios nuevos mercado nacional</label>
              <input
                type="checkbox"
                value={servicioNuevo}
                onChange={handleChangeCheck}
                name="servicioNuevo"
                className="options-input"
                id=""
              />
            </div>
            <div className="options mt-4" >
              <label>Servicios nuevos mercado internacional</label>
              <input
                type="checkbox"
                value={servicioInternacional}
                onChange={handleChangeCheck}
                name="servicioInternacional"
                className="options-input"
                id=""
              />
            </div>
            <div className="options mt-4" >
              <label>Adquirio nuevos metodos de producción</label>
              <input
                type="checkbox"
                className="options-input"
                value={metodoProduccion}
                onChange={handleChangeCheck}
                name="metodoProduccion"
                id=""
              />
            </div>

            <div className="options mt-4" >
              <label>Al Finalizar el año tenia algun proyecto en marcha</label>
              <input
                type="checkbox"
                className="options-input"
                value={proyectoEnMarcha}
                onChange={handleChangeCheck}
                name="proyectoEnMarcha"
                id=""
              />
            </div>

            <div className="options mt-4" >
              <label>Introdujo nuevos métodos
              organizativos
              implementados en el
              funcionamiento interno de
                            la empresa.</label>
              <input
                type="checkbox"
                className="options-input"
                value={metodosOrganizativos}
                onChange={handleChangeCheck}
                name="metodosOrganizativos"
                id=""
              />
            </div>
            <div className="options mt-4" >
              <label>¿su empresa obtuvo
              certificaciones de calidad
              de producto?
                            </label>
              <input
                type="checkbox"
                className="options-input"
                value={certificadoCalidad}
                onChange={handleChangeCheck}
                name="certificadoCalidad"
                id=""
              />
            </div>
            <div className="options mt-4" >
              <label>Firmo contratos de confidencialidad con sus empleados
              para la protección de la tecnología
                            </label>
              <input
                type="checkbox"
                className="options-input"
                value={contratoConfidencial}
                onChange={handleChangeCheck}
                name="contratoConfidencial"
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
          <div className="form-check form-switch mb-5">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              value={tipoGrafica}
              onChange={handleChangeTipoGrafica}
            />
            {
              tipoGrafica
                ? 'Grafica Tipo Torta'
                : 'Grafica Tipo Barras'
            }
          </div>
          {
            tipoGrafica
              ?
              <Polar data={dataChart} />
              :
              <Bar data={dataChart} />
          }
        </div>
      </div>
    </>
  )
}

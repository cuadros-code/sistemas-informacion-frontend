export const getData = async (consulta) => {

    const res = await fetch('http://localhost:4001/si', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(consulta)
    })
    const data = await res.json()

    return data

}
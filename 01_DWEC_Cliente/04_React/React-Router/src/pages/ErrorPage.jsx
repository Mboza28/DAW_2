import { useRouteError, isRouteErrorResponse } from 'react-router-dom'

function ErrorPage() {
    
    const error = useRouteError();
    
    // Caso 1: Errores del Router o del Enrutado: 404, 401, 500...
    if (isRouteErrorResponse(error)){

        return (
            <div>
                <>
                    <h2>Error {error.status}</h2>
                    
                    {
                        error.status === 404 && (<p>Página no encontrada</p>)
                    }
                    {
                        error.status === 401 && (<p>No tienes permisos para acceder a este recurso</p>)
                    }
                    {
                        error.status === 500 && (<p>Error interno del Servidor</p>)
                    }
                </>
            </div>
        )
    }

    // Caso 2: errores de JS normales (throw new error)
    return(
        <>
            <h2>Error inesperado:</h2>
            <p> {error.message || "Ha ocurrido un error inesperado"} </p>
        </>
    )

    
}

export default ErrorPage
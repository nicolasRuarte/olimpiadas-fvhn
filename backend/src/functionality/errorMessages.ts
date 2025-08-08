export function createErrorMessage(errorType: Error, statusCode?: number) {
    switch (errorType.message) {
        case "invalid-id":
            return { message: "Por favor ingrese un id válido", statusCode: 400 };

        case "invalid-number-id":
            return { message: "Error de id numérico no válido", statusCode: 400 };

        case "invalid-string-id":
            return { message: "Error de id string no válido", statusCode: 400 };

        case "not-found":
            return { message: "El objeto solicitado no existe", statusCode: 404 };
        
        case "access-denied":
            return { message: "Acceso no autorizado. Por favor inicie sesión", statusCode: 401 };
            
        case "empty-body":
            return { message: "Al cuerpo de la petición le faltaban uno o más datos", statusCode: 400 };

        default:
            return { message: errorType.message, statusCode: 500 }; // 0 para indicar que no se sabe qué codigo es
    }
}

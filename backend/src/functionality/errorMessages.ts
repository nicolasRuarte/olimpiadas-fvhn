export function createErrorMessage(errorType: Error, statusCode?: number) {
    switch (errorType.message) {
        case "invalid-id":
            return { message: "Por favor ingrese un id válido", statusCode: 400 };

        case "not-found":
            return { message: "El objeto solicitado no existe", statusCode: 404 };
        
        case "access-denied":
            return { message: "Acceso no autorizado. Por favor inicie sesión", statusCode: 401 };
            
        case "empty-body":
            return { message: "El cuerpo de la request no poseía ningún valor", statusCode: 400 };

        default:
            return { message: errorType.message, statusCode: statusCode };
    }
}

Lista de tareas que hay que realizar en el backend

# Backend

[x] Funcionalidad CRUD para Usuarios (enfocarse en crear)
[x] Funcionalidad CRUD para Servicios (enfocarse en crear y actualizar)
[x] Funcionalidad carrito
[x] Funcionalidad de detalles de compra
[x] Agregar historial global de pedidos
[x] Agregar funcionalidad de hasheo en las contraseñas 
[x] Agregar validaciones de formulario de nuevo usuario
[x] Funcionalidad de autenticación
[x] Funcionalidad de sesión 
[x] Funcionalidad de Rating
[x] Agregar historial de pedidos por usuario
[x] Agregar funcionalidad de pedidos pendientes
[x] Agregar funcionalidad de ver todos los pedidos pendientes 
[x] Agregar funcionalidad de ver todos los pedidos aceptados
[x] Agregar funcionalidad de ver todos los pedidos anulados
[x] Crear servidor en Render para desplegar
[x] Agregar módulo de creación de mensaje de errores
[ ] Agregar funcionalidad básica de pagos con Mercado Pago 
[ ] Conectar backend con el frontend
[ ] Agregar funcionalidad de generar PDF de detalle de orden
[ ] Agregar funcionalidad para que al agregar un producto que ya se encuentra en el carrito, que se sume +1 a la propiedad quantity del item que está en dicho carrito
[ ] Agregar documentación sobre como maneja los datos cada endpoint para el frontend

## Fixes

[x] URGENTE Sacar las claves de APIs del repositorio de GitHub (quién fue el gil)
[x] Asegurarme de que todas las funciones devuelvan JSON
[x] Refactorizar para usar repositorios en lugar del DataManager
[x] Refactorizar para independizar las funciones de los controladores de request y response
[ ] Arreglar error de no poder agregar un producto dos veces seguidas
[ ] Cambiar las partes del código donde usé el tipo any
[ ] Refactorizar para que todos los parámetros de las funciones los reciba a través del body en formato JSON
[ ] Refactorizar para utilizar repositorios en archivos apartes HACIENDO
[ ] Refactorizar para que los controladores usen los servicios HACIENDO
[ ] Ver si hay alguna manera de hacer que 2 FK se puedan utilizar como PK en TypeORM

## Testing

[x] Testear valibot
[x] Testear MP

## Si es posible agregar
[ ] Cacheo con Redis
[ ] Página de datos "interesantes" (paquete más vendido, usuario con más compras, etc)
[ ] Verificar si es muy difícil cambiar las requests a query runners

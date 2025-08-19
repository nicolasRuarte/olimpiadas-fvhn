# Notas 

**Reglas:**

Todos los archivos de servicios deben realizar la verificación de que los datos sean correctos. Los archivos de repositorio NO deben verificar si la estructura de los datos es correcta o no, la única verificación que puede realizar es si dicha estructura y dichos datos existe en la base de datos

Si necesitás realizar un manejo de datos, es preferible que usés las funciones de los servicios que la de los repositorios. Por motivo de que estas contienen validación de datos mientras que las del repositorio no

**Debuggeo:**

Si por alguna razón alguna función no está devolviendo datos o devuelve un objeto vacío cuando no debería, probá de verificar de que en la llamada estés usando await

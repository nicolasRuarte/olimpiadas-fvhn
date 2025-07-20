# Buenas prácticas para los commits

Les dejo esta guía para que consulten cuando no sepan cómo hacer sus commits.

## 1. Commits cortos

Un consejo a tener en cuenta a la hora de hacer commit es tratar de que el cambio agregado conste de uno o más problemas. Si se dan cuenta que el mensaje del commit les está quedando muy largo, quizá sea porque necesitan dividirlo en múltiples commits distintos.

:white_check_mark: "Arreglando bug que no permitía ver lista de ventas"
:x:  "Cambiando credenciales de admin, arreglando error de visualización en el navbar y sacando a Héctor del grupo"

**¿Por qué?**
Esto hace que, a la hora de buscar bugs, se pueda saber más fácilmente en qué commit fue que se hizo un cambio que rompió el programa y saber más rápido cuál fue el cambio específico que provocó dicho bug.

## 2. Prefijos de commit

A la hora de hacer un commit, es importante indicar cuál fue el tipo de cambio que realizamos. Para especificar esos cambios lo que se hace es antes de empezar a explicar qué cambios está realizando el commit, se agrega un prefijo seguido de dos puntos para hacer saber al que lee el mensaje el tipo de cambio que fue realizado.
Ejemplo:
``git commit -m "feat: Agregando funcionalidad de inicio de sesión``

La lista de prefijos que utilizaremos es la siguiente
| Prefijo | Caso de uso   | Ejemplo|
|:------- |:------|:---------|
|``feat``| Al agregar nueva característica o refactorizar código|``feat: Agregando funcionalidad de listar usuarios por nombre``|
|``fix``| Al arreglar un bug|``fix: Arreglando error que no permitía al usuario loguearse``|
|``docs``|Al crear o cambiar documentos|``docs: Agregando explicación de la página de admin al manual de usuario``|
|``style``|Al cambiar cualquier cosa relacionada al estilo de la página|``style: Cambiando color de la página de amarillo a violeta``|
|``package``|Al cambiar o instalar paquetes|``package: Instalando el paquete express``|
|``merge``|Al realizar un merge|``merge: Mergeando la rama bugfix a main``|
 
 La estructura quedaría entonces:
``<prefijo>: <mensaje>``

**¿Por qué?**
Porque ayuda a identificar a los commits en caso de tener un error. Actúa como un filtro en ese sentido. Por ejemplo, si nos interesa en algún momento buscar un commit en específico y sabemos que ese commit fue el arreglo de un bug, entonces no necesitamos tener que scrollear por toda la lista de commits, sino que en el mismo GitHub vamos a poder escribir en el buscador "fix:" y ahí nos va a listar todos los cambios que fueron arreglos de bugs

## 3. Empezar mensajes de commit con mayúscula (recomendación)

Se ve más aesthetic

Fuentes:
[Lista de prefijos](https://github.com/frissyn/commit-prefixes)

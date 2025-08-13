# Explicación del backend

Conocimiento que presupongo:
1. CRUD
2. Qué es una petición
3. Qué es el body de una petición
4. JSON

## Tecnologías

Las tecnologías que usamos en el proyecto son las siguientes:

|   |Frontend|Backend|
|---|----|-------|
|**Lenguaje/s**|Javascript, HTML, CSS|Typescript|
|**Librerías**|Boostrap, Axios|TypeORM, Morgan, ExpressJS, Valibot, bcrypt, cookie-parser, pg, reflect-metadata, mercadopago, module-alias, dotenv, jsonwebtoken, class-validator|

**Explicación de cada librería**

1. *TypeORM:* Es el ORM que utilizamos de intermediario para comunicarnos, controlar y leer la base de datos.
2. *Morgan:* Es una librería destinada a loggear la actividad de las peticiones HTTP que recibe el servidor.
3. *ExpressJS*: Es un framework backend caraterizado por su sencillez y ligereza
4. *bcrypt:* Librería de encriptación que utilizamos para el tema de hasheo y deshasheo de contraseñas
5. *cookie-parser:* Librería que maneja el middleware de las cookies. Utilizada para el manejo de sesión del usuario.
6. *pg*: Dependencia de TypeORM que es utilizada para realizar todas las queries a la base de datos de PostgreSQL
7. reflect-metadata: Librería que es utilizada porque era necesaria para no me acuerdo qué cosa
8. mercadopago: Librería oficial de Mercado Pago para manejar el tema de las compras con la plataforma
9. module-alias: Librería de alias de módulos utilizada para simplificar la labor de poner la ruta de los imports. Empezada como inclusión experimental, pero quedó
10. dotenv: Librería utilizada para permitirnos utilizar variables de entorno en nuestra aplicación
11. jsonwebtoken: Librería utilizada para generar los tokens que se utilizarán para el manejo de sesión en las cookies
12. class-validator: Librería incluida con TypeORM que nos permite agregar decoradores de validación de datos dentro de las propias entidades

## Entidades

En TypeORM, las tablas de la base de datos 


Las entidades principales son:

1. User

**Esquema:**

dni: string

name: string

surnames: string

email: string

password: string

phone_number: string

role: string

orderDetail: foreign key

**Creación**

Hay que utilizar el endpoint /user con el método POST

Para crear un usuario, debemos ingresar todos los datos de la entidad a excepción de role y orderDetail porque esos se completan automáticamente por el sistema.

**Lectura:**

Hay que utilizar el endpoint /user con el método GET. En el body se puede especificar un dni específico mediante el atributo "dni" en el JSON

Este va a ser un patrón común en todas las entidades.

Para leer un usuario tenemos dos vías:
1. Leer un único usuario mediante ID
2. Leer todos los usuarios

Ambos utilizan la misma ruta con el método GET, solo que si no le proporcionás un ID en el body se interpreta que estás queriendo leer todos los usuarios

**Actualización:**

Hay que utilizar el endpoint /user con el método PATCH. En el body debemos proporcionar el dni usuario

**Borrado:**

Hay que utilizar el endpoint /user con el método DELETE

2. Order

**Esquema:**

id: number PK

user: user.dni FK

isBougth: boolean

**Creación**

Existen dos maneras de crear una order. La primera es creando un usuario, ya que cuando creamos un usuario automáticamente se genera una orden para que ya pueda empezar a añadir productos al carrito; la segunda manera es realizando una compra, ya que esta le asignará al usuario una nueva orden vacía para utilizar para realizar otra compa más

**Lectura:**

Hay que utilizar el endpoint /order. En el body podemos proporcionar un id de orden

Para leer una orden tenemos dos vías:
1. Leer una única orden mediante ID
2. Leer todas las órdenes

Ambos utilizan la misma ruta con el método GET, solo que si no le proporcionás un ID en el body se interpreta que estás queriendo leer todos los usuarios

**Actualización:**

De momento no se proporcionan métodos para actualizar una orden

**Borrado:**

De momento no existe ningún modo de borrar una orden, simplemente hay un atributo que la deshabilita una vez se realice la compra de la misma

3. Service

**Esquema:**

id: number PK

name: string

description: string

price: number

**Creación**

Hay que utilizar el endpoint /service con el método POST. En el body debemos especificar los atributos y su valor, los nombres de atributos que hay que enviar son iguales a los nombres de los atributos de la entidad

Para crear un service, hay que enviar todos los atributos de la entidad completados con excepción del ID que se completa automáticamente

**Lectura:**

Hay que utilizar el endpoint /service con el método GET. En el body podemos especificar un id mediante el atributo "id"

Para leer un servicio tenemos dos vías:
1. Leer un único servicio mediante ID
2. Leer todos los servicios

Ambos utilizan la misma ruta con el método GET, solo que si no le proporcionás un ID en el body se interpreta que estás queriendo leer todos los usuarios

**Actualización:**

Hay que utilizar el endpoint /service con el método PATCH. En el body hay que especificar el id (atributo "id") y los valores que se quieren actualizar (atributo "data")

Para actualizar el servicio, debemos proporcionar el ID del servicio que queremos actualizar y los datos que van a ser actualizados

**Borrado:**

Hay que utilizar el endpoint /service con el método DELETE. En el body hay que proporcionar el id de servicio que queremos borrar (atributo "id")

Para borrar un servicio, debemos proporcionar el ID del servicio que queremos borrar

4. OrderDetail

**Esquema:**

order_number: number PK

emittedDate: date

total_price: number

status: string

user: foreign key

**Creación**

La manera en la que se crea un orderDetail es mediante la compra de una orden. Los datos del detalle serán completados automáticamente por el sistema

**Lectura:**

Hay que utilizar el endpoint /orderdetail con el método GET. En el body se puede especificar un número de orden (atributo "orderNumber")

Podemos leer un detalle de orden específico, pasándole al sistema un número de orden

**Actualización:**

Hay que utilizar el endpoint /orderdetail/status con el método PATCH. En el body hay que proporcionar un número de orden (atributo "orderNumber") y también un string con el nombre del nuevo status (atributo "status")

**Borrado:**

No se planea agregar una alternativa para poder borrar un detalle de orden

5. Rating

user: user.dni FK PPK

service: service.id FK PK

rating: number

**Creación**

Hay que utilizar el endpoint /rating con el método POST. En el body debemos especificar el dni de usuario (atributo "userId"), el id de servicio (atributo "serviceId") y el valor del rating (atributo "rating")

Para crear un Rating, hay que utilizar el endpoint /rating con el método POST y enviar como datos el ID del servicio que queremos calificar, el dni del usuario que produce la calificación y el valor de la calificación que eligió el usuario

**Lectura:**

Hay que utilizar el endpoint /rating con el método GET. En el body podemos elegir entre no poder nada y obtener todos los ratings o especificar tanto dni de usuario (atributo "userId"), id de servicio (atributo "serviceId") y el rating (atributo "rating")

Para leer un servicio tenemos dos vías:
1. Leer un único rating mediante IDs
2. Leer todos los ratings

Ambos utilizan la misma ruta con el método GET, solo que si no le proporcionás un ID en el body se interpreta que estás queriendo leer todos los usuarios

**Actualización:**

De momento, no se proporciona ninguna alternativa para actualizar un rating específico

**Borrado:**

Para borrar un rating, hay que utilizar el endpoint rating/ con un método DELETE, especificando las claves del rating que se desea que se elimine

6. Item

**Esquema:**

order: order.id FK

service: service.id FK

quantity: number

**Creación**

Hay que usar el endpoint /order con el método POST. En el body debemos especificar el id del servicio que vamos a agregar (atributo "serviceId"), el id de la orden a la que lo vamos a agregar (atributo "orderId") y la cantidad del servicio que queremos agregar (atributo "quantity")

Los items se crean automáticamente cuando agregamos un item al carrito

**Lectura:**

Si bien existen métodos que listan todos los items registrados, esos están pensados para utilizarse únicamente durante el desarrollo de la aplicación y no están pensados para un entorno de producción

**Actualización:**

Lo único que se puede actualizar de un item es su cantidad

Hay que usar el endpoint /order con el método POST. En el body colocamos los datos de un item que ya existe ("serviceId", "orderId" y "quantity") y el sistema automáticamente sumará +1 al atributo quantity del item

**Borrado:**

Hay que utilizar el endpoint /order con el método DELETE. En el body colocamos los datos de un item que ya existe ("serviceId", "orderId" y "quantity") y el sistema automáticamente restará -1 a la cantidad del item. Si el valor del atributo quantity del item es igual a 1, este se borra por completo


## Relaciones

Las relaciones de la base de datos son las siguientes:

User - 1 a n - OrderDetail

User - 1 a 1 - Order

User - 1 a n - Rating

Order - 1 a n - Item - n a 1 - Service (Order - n a n - Service)
OrderDetail - 1 a n - Item - 1 a n - Service (OrderDetail - n a n - Service)

En el caso de las relaciones n a n, a la hora de investigar, encontré que las relaciones n a n se podían hacer mediante una tabla intermedia. Por eso es que vemos que tanto la relación Order-Service como la relación OrderDetail-Service utilizan a la entidad Item como la intermediaria para formar la relación. 
En la investigación también aprendí que para los nombres se podía poner la unión de los dos nombres de las tablas que unimos (ej: order_service) o utilizar un nombre que describa que su funcionalidad o que representa (en este caso, los items de una orden)

## "Arquitectura"

La arquitectura del backend no es difiícil, pero si tiene su cierta complexidad. Para entenderlo vamos a dividir su funcionalidad por partes

### Inicializadores

Los inicializadores son los archivos del proyecto que permiten que el proyecto comience a ejecutarse. Se puede entender a estos archivos como los botones de encendido que permiten que el mecanismo interno funcione
En este backend existen tres inicializadores principales: **db.ts**, **index.ts** y **app.ts**. index.ts es el archivo principal que ejecuta a todo el resto del programa, se puede entender que index.ts sería el equivalente a la función main() en los programas de C db.ts se encarga de inicializar la base de datos TypeORM app.ts; app.ts es el archivo que se dedica a levantar el servidor Express con todas sus rutas y middlewares.

### Middlewares

Los middlewares son unas funciones que procesan las peticiones antes de que estas lleguen a los controladores, pueden entenderse también como funciones de pre procesamiento de datos.
En nuestro caso, el único middleware del que disponemos es el middleware de autenticación y este solo se ejecuta en las rutas de actualizado y borrado de la entidad usuario, pero se planea utilizarlo en más endpoints a medida que lo vayamos viendo necesario, como en todos los relacionados a las funciones de administrador.

### Variables de entorno

El proyecto también utiliza variables de entorno para manejar el tema de todos los valores confidenciales o que dependan del entorno en el que se ejecute el programa (como pueden ser el servidor local o el servidor de producción). Nuestro proyecto hace uso de las mismas para lo que viene a ser el tema de todas las claves confidenciales (clave API Mercado Pago, datos para acceder a la base de datos, clave de Json Web Token), puertos y el número de salt rounds de bcryot

### Manejo de datos

En esta sección explico cómo se maneja la división de responsabilidades a la hora de manipular o leer los datos de la base de datos.

Hay que tener en cuenta que todos los datos que manejamos y procesamos son en formato JSON.

#### 1. Rutas 

Las rutas son las que especifican en qué URL se van a poder acceder a los controladores. Para especificar dichas utilizamos los llamados routers de express (los routers de express son elementos que definen las url que vamos a usar para que el usuario acceda a las funcionalidades)

Todas los archivos de rutas tienen el mismo esquema ya que todas tienen un router con cuatro endpoints distintos, uno por cada operación CRUD. Cada una llama al controlador que le corresponde, los endpoints de post llaman a los controladores de creación; los endpoints de get llaman a los controladores de lectura; los endpoints de patch llaman a los controladores de actualización y los endpoints de delete llaman a los controladores de borrado.

Cabe aclarar que se optó por usar patch para la actualización de entidades porque, a la hora de pasar los atributos a actualizar en el body de la petición, no vamos a estar agregando todos los atributos que se van a mantener iguales, en su lugar solo vamos a enviar los atributos que queremos actualizar y nada más. Entonces en base a la información encontrada [acá](https://stackoverflow-com.translate.goog/questions/28459418/use-of-put-vs-patch-methods-in-rest-api-real-life-scenarios?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=tc), decidimos que era mejor utilizar patch antes que put, porque put considera que estamos remplazando la entidad entera en lugar de estar haciendo una actualización parcial

#### 2. Controladores

Los controladores son los que manejan las requests y las responses de Express. Se encargan de recibir las peticiones del usuario, enviarlas al servicio correspondiente y luego se encarga de enviar el resultado del procesado de datos de dicho servicio. Como función adicional también, verifican si los datos que fueron enviados a través del body no están definidos o completos

El esquema de los controladores también es parecido porque, de nuevo, todos son basados en las operaciones CRUD. Por ende, existen los controladores de creación, lectura, actualización y borrado

#### 3. Servicios

Los servicios son los que se encargan de llamar a las funciones de los repositorios. Su trabajo también es validar que los datos que son enviados del controlador están correctos, verificando sus IDs y que el esquema de los datos enviados coincida con el esquema de la identidad.

#### 4. Repositorios

Los repositorios son los archivos en las que se maneja a los datos en sí para realizar todas las operaciones que hayamos programados en él. En estos archivos se encuentran escritas todas las funciones que utilizamos en los servicios. 

Todos los repositorios siguen una plantilla muy parecida, ya que todos tienen las mismas funciones bases, que son: 
1. Crear una nueva entidad en el repositorio
2. Leer una entidad del repositorio en base a su ID
3. Leer todas las entidades guardadas en el repositorio
4. Actualizar una entidad del repositorio
5. Borrar una entidad del repositorio

Luego hay excepciones como la entidad Order que tiene además la funcionalidad para añadir y borrar los items de su campo items

#### Ejemplo en una request

Supongamos que queremos crear un usuario, para ello vamos a utilizar en el frontend los formularios de inicio de sesión. Dichos formularios van a tener un código Javascript que envíe una petición POST a la ruta /user, cuando esta llega la ruta lo que hace es llamar a la función createUserController() que recibe como parámetros los objetos request y response que le sirven para procesar tanto la petición recibida como la respuesta que enviará después.

Dentro del controlador, el programa hace una validación del body de la petición y verifica que el mismo no se encuentre vacío (por vacío se puede entender a los casos en los que el body no existe, contenga un objeto vacío o carezca de algunos atributos que sean necesarios para que las funciones de servicio puedan hacer su trabajo, que en este caso podrían ser que no tengan la ID de usuario), si no lo está, manda todos los datos que contenga el body a la función de servicio correspondiente, que en nuestro caso sería createUserController().

Cuando el servicio agarra los datoss del body, lo que hace generalmente es verificar las IDs que se envían para comprobar que estén en el formato correcto (verifica si es string o número según corresponda). Luego de verificar los IDs, envía los datos al repositorio de User (userRepository)
De momento esta es la única funcionalidad que realiza a la hora de validar, pero en un futuro cercano buscamos añadirle la capacidad de verificar el esquema con el que vienen los datos y compararlos con el esquema de la entidad que se quiera manipular, todo esto sería con Valibot. 

Finalmente los datos llegan al repositorio y es aquí cuando ya la base de datos empieza a ser manipulada y cambiada. Para el caso de creación de usuario lo que hace es que, mediante TypeORM, se llama a la función create() del repositorio, se le pasan los datos que provienen del servicio y luego se crea una entidad que para guardar en la base de datos tenemos que meterla como parámetro a la función del repositorio save() y ya tendríamos nuestro usuario creado

### Manejo de errores

El manejo de errores se realiza principalmente mediante el uso de bloques try-catch. El modo en que utilizamos estos bloques es que los declaramos a nivel de controlador, porque sabemos que cuando alguno de los niveles inferiores tira un error, este hace como un efecto de cascada por todas las funciones anteriores que se llamaron previamente y el error llega hasta la primera función que llamó a toda la pila de funciones.

Puede entenderse así:

1. Rutas
2. Controladores <- Y sube hasta acá donde es manejado por un trycatch
3. Servicios
4. Repositorios <- Error ocurre acá

Sería como un trycatch "global" que engloba a la mayoría de funcionamiento del programa. Kinda

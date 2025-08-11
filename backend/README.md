# Explicación del backend

Conocimiento que presupongo:
1. CRUD

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

TypeORM nos permite trabajar con tablas en una manera en la que se pueden tratar como objetos o entidades en lugar de tablas en las que hay que realizar queries utilizando el lenguaje SQL. En ese sentido, es una abstracción de dicho lenguaje.
Con esto en mente, no es raro saber que tenemos una entidad en TypeORM por cada tabla que exista en el Postgres. Más o menos, después con las relaciones se complican un poco las cosas, pero paso a paso.

Las entidades principales son:

1. User
dni: string
name: string
surnames: string
email: string
password: string
phone_number: string
role: string
orderDetail: foreign key

2. Order
id: string

3. Service
id: number
name: string
description: string
price: number

4. OrderDetail
order_number: number
emittedDate: date
total_price: number
status: string
user: foreign key

5. Rating
user: foreign key
service: foreign key
rating: number

6. Item
order: foreign key
service: foreign key
quantity: number


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

En esta sección explico cómo se maneja la división de responsabilidades a la hora de manipular o leer los datos de la base de datos

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

### Manejo de errores

El manejo de errores se realiza principalmente mediante el uso de bloques try-catch. El modo en que utilizamos estos bloques es que los declaramos a nivel de controlador, porque sabemos que cuando alguno de los niveles inferiores tira un error, este hace como un efecto de cascada por todas las funciones anteriores que se llamaron previamente y el error llega hasta la primera función que llamó a toda la pila de funciones.

Puede entenderse así:

1. Rutas
2. Controladores <- Y sube hasta acá donde es manejado por un trycatch
3. Servicios
4. Repositorios <- Error ocurre acá

Sería como un trycatch "global" que engloba a la mayoría de funcionamiento del programa. Kinda

# Convenciones

Este documento hablará de todas las convenciones que hay que mantener para tratar de mantener un ambiente de trabajo más o menos homogeneizado

Convenciones que se establecerán:
1. Archivos
	1. Nombres de archivos
	2. Estilo de archivos
2. Código
	1. Nombres

## 1. Archivos

### a. Nombres de archivo

La convención para los nombres de archivos va a ser:
* El nombre de los archivos debe estar enteramente en minúscula
* El nombre no debe tener espacios, en caso de necesitar agregar espacios hay que utilizar "-" en su lugar
* Los nombres no deben llevar tilde

### b. Estilo de archivos
* Fuente Arial
* Tamaño de letra 12
* Para marcar los títulos usar los que vienen por defecto en Word (los títulos en azul). Pasarlos a fuente Arial

## 2. Código

## General

En todo aspecto del código que se pueda elegir el nombre de un elemento (como el nombre de las variables, funciones y/o clases) deben estar escritos en inglés. En general, siempre que se pueda elegir idioma en el código se debe optar por el idioma anglosajón

### Nombres

Tanto los nombres de las variables como de las funciones deben estar en camelCase (empiezan con minúscula y para separar palabras se pone mayúscula en la primera letra de la palabra a partir de la segunda palabra)

:x: ``const MyVariable, function MyFunction()``
:x: ``const my_variable, function my_function()``
:white_check_mark:  ``const myVariable, function myFunction()``

En el caso de las funciones, las funciones siempre deben empezar con un verbo que defina qué es lo que está haciendo.

:x:  ``function allUsers()``
:white_check_mark: ``function returnAllUsers()``



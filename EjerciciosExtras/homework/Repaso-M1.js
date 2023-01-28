const {
    Queue,
    Node,
    LinkedList,
    BinarySearchTree
} = require('./DS.js')

// Implementar la función countArray: a partir de un array en el cual cada posición puede ser un único
// número u otro array anidado de números, determinar la suma de todos los números contenidos en el array.
// El array será recibido por parámetro.
// Ejemplo:
//    const array = [1, [2, [3,4]], [5,6], 7];
//    countArray(array); --> Debería devolver 28 (1 + 2 + 3 + 4 + 5 + 6 + 7)
// Pista: utilizar el método Array.isArray() para determinar si algun elemento de array es un array anidado
// [Para más información del método: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/isArray]

var countArray = function (array) {
    let acum = 0
    for (let i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])) acum += countArray(array[i])
        else acum += array[i]
    }
    return acum
}

// Implementar la función countProps: a partir de un objeto en el cual cada propiedad puede contener
// cualquier tipo de dato, determinar la cantidad de propiedades de objetos en cualquier nivel, ya sea el inicial
// u objetos anidados
// Ejemplo:
// var obj = {
//   a: {
//     a1: 10,
//     a2: 'Franco',
//     a3: {f: 'r', a: 'n', c: {o: true}}
//   },
//   b: 2,
//   c: [1, {a: 1}, 'Franco']
// }
// countProps(obj)--> Deberia devolver 10 ya que el objeto inicial tiene 3 propiedades, pero a su vez
// dentro de a tenemos 3 propiedades mas, luego a3 tiene otras 3 y por ultimo c tiene una extra.
// Propiedades: a, a1, a2, a3, f, a, c, o, b, c --> 10 en total

var countProps = function (obj) {
    let counter = 0
    // Recorro el objeto
    for (const key in obj) {
        // Aumento el contador en 1
        counter++
        // Si el objeto tiene key y no es un array ejecuta la recursion
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) counter += countProps(obj[key])
    }
    return counter
}


// Implementar el método changeNotNumbers dentro del prototype de LinkedList que deberá cambiar
// aquellos valores que no puedan castearse a numeros por 'Kiricocho' y devolver la cantidad de cambios que hizo
// Aclaracion: si el valor del nodo puede castearse a número NO hay que reemplazarlo
// Ejemplo 1:
//    Suponiendo que la lista actual es: Head --> [1] --> ['2'] --> [false] --> ['Franco']
//    lista.changeNotNumbers();
//    Ahora la lista quedaría: Head --> [1] --> ['2'] --> [false] --> ['Kirikocho] y la función debería haber devuelto el valor 1

LinkedList.prototype.changeNotNumbers = function () {
    let counter = 0
    // Siempre que tenga que recorrer una lista utilizo current
    let current = this.head
    // Mientras current tenga algo
    while (current) {
        // El valor del nodo actual se puede convertir a numero? Number(valor del nodo)
        // Ej: Number('5') -> 5
        // isNaN() permite saber si es Not a Number
        if (isNaN(current.value)) {
            // En caso de no ser casteable a numero asignamos el valor 'Kiricocho' al nodo actual
            current.value = "Kiricocho"
            // Aumentamos el contador en uno
            counter++
        }
        // En caso de que se pueda convertir a numero,
        // movemos el current al nodo siguiente
        current = current.next
    }
    return counter
}


// Implementar la función mergeQueues que a partir de dos queues recibidas por parametro
// debe devolver una nueva Queue que vaya mergeando los nodos de las anteriores.
// Ejemplo:
// - queueOne: [7,3,5]
// - queueTwo: [2,4,6]
// mergeQueues(queueOne, queueTwo) --> [7,2,3,4,5,6]
// IMPORTANTE: NO son arreglos sino que son Queues.

var mergeQueues = function (queueOne, queueTwo) {
    // Instanciamos una queue la cual sera la nueva queue que lleve el merge
    const mergedQueue = new Queue()

    while (queueOne.size() || queueTwo.size()) {
        // Removemos el primer elemento del queue utilizando dequeue()
        // luego almacenamos su valor en una const
        const firstElement = queueOne.dequeue()
        const secondElement = queueTwo.dequeue()

        // Si hay algo en element mergeamos con enqueue()
        if (firstElement) mergedQueue.enqueue(firstElement)
        if (secondElement) mergedQueue.enqueue(secondElement)
        // mergedQueue.enqueue(queueOne.dequeue())
        // mergedQueue.enqueue(queueTwo.dequeue())
    }
    return mergedQueue
}


// Implementar la funcion closureMult que permita generar nuevas funciones que representen
// las tablas de multiplicación de distintos numeros
// Ejemplo: 
// - var multByFour = closureMult(4);
// - multByFour(2) --> 8 (2 * 4)
// - multByFour(5) --> 20
// - var multBySix = closureMult(6);
// - multBySix(4) --> 24

var closureMult = function (multiplier) {
    return (num) => {
        return multiplier * num
    }
}

const closureCounter = function () {
    let counter = 0
    return () => {
        return counter++
    }
}

// Implementar el método sum dentro del prototype de BinarySearchTree
// que debe retornar la suma total de los valores dentro de cada nodo del arbol
BinarySearchTree.prototype.sum = function () {
    let acum = 0
    acum += this.value
    if (this.left) acum += this.left.sum()
    if (this.right) acum += this.right.sum()
    return acum
}

module.exports = {
    countArray,
    countProps,
    mergeQueues,
    closureMult
}
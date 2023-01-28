'use strict';

/* EJERCICIO 1
Implementar la clase LinkedList, definiendo los siguientes métodos:
  - add: agrega un nuevo nodo al final de la lista;
  - remove: elimina el último nodo de la lista y retorna su valor (tener en cuenta el caso particular de una lista de un solo nodo y de una lista vacía);
  - search: recibe un parámetro y lo busca dentro de la lista, con una particularidad: el parámetro puede ser un valor o un callback.
  En el primer caso, buscamos un nodo cuyo valor coincida con lo buscado;
  en el segundo, buscamos un nodo cuyo valor, al ser pasado como parámetro del callback, retorne true. 
  EJEMPLO 
  search(3) busca un nodo cuyo valor sea 3;
  search(isEven), donde isEven es una función que retorna true cuando recibe por parámetro un número par, busca un nodo cuyo valor sea un número par.
  En caso de que la búsqueda no arroje resultados, search debe retornar null.
*/

class LinkedList {
  constructor() {
    this.head = null
    this._lenght = 0
  }

  add(value) {
    // Instanciamos un nuevo nodo
    const newNode = new Node(value)

    // Apuntamos al head
    let current = this.head

    // if (current === null) {
    // Si current esta vacio pusheamos el nodo como head
    if (!current) {
      this.head = newNode
      this._lenght++
      return value
    }

    // while (current.next !== null)
    // Mientras tengamos un nodo apuntando a otro que no sea null, movemos current al siguiente nodo
    while (current.next) /* current !== null */ current = current.next

    // Si el nodo apunta a null salimos del while y pusheamos el nuevo nodo
    current.next = newNode
    this._lenght++
    return newNode
  }

  remove() {
    // Apuntamos al head
    let current = this.head

    // Si la lista esta vacia devolvemos null
    // Podria validar con _lenght tambien
    if (!current) { // current.next === null
      return null
    }

    // Si la lista tiene un solo nodo devolvemos el valor actual
    if (!current.next) {
      // Declaro una const donde voy a guardar el valor del nodo removido
      const removedNode = current.value
      this.head = null
      this._lenght--
      return removedNode
    }

    // while (current.next.next !== null) current = current.next
    // Si el nodo siguiente al siguiente existe movemos current una posicion
    while (current.next.next) current = current.next
    // Declaro una const donde voy a guardar el valor del nodo removido
    const removedNode = current.next.value
    // Si el nodo siguiente al siguiente es null lo removemos apuntando current a null
    current.next = null
    this._lenght--
    return removedNode
  }

  search(valueToFind) {
    this.valueToFind = valueToFind

    // Apuntamos al head
    let current = this.head
    // Mientras exista la lista
    while (current) {
      // Comprobamos si el argumento recibido es una funcion
      // Si es true ejecutamos la funcion recibida como argumento (callback),
      // pasandole como parametro el valor actual del nodo
      // Si es false comparamos el valor actual del nodo con el valor recibido como argumento
      // Si uno de los casos da como resultado true, devolvera el valor actual del nodo
      if (typeof valueToFind === 'function' ? valueToFind(current.value) : current.value === valueToFind) return current.value
      // En caso de no encontrar el valor, current avanzara al siguiente nodo
      current = current.next
    }
    // Si recorre toda la lista sin encontrar el valor devuelve null
    return null

    // // Apuntamos al head
    // let current = this.head
    // // Mientras exista la lista
    // while (current) {
    //   // Comprobamos si el argumento recibido es una funcion
    //   if (typeof valueToFind === 'function')
    //     // Ejecutamos la funcion recibida como argumento (callback)
    //     // Si devuelve true los valores coincidieron,
    //     // por lo tanto devuelve el valor del nodo actual
    //     if (valueToFind(current.value)) return current.value
    //   // Al comprobar que el argumento recibido no es una funcion,
    //   // se comparan los valores del argumento con el valor del nodo actual.
    //   // Si los valores coinciden devuelve el valor del nodo actual
    //   if (current.value === valueToFind) return current.value
    //   // En caso de no encontrar el valor, current avanzara al siguiente nodo
    //   current = current.next
    // }
    // // Si recorre toda la lista sin encontrar el valor devuelve null
    // return null
  }
}

class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

// const list = new LinkedList()

// list.add(10)
// list.add(20)
// list.add(30)
// // list.remove()
// console.log(list.remove())
// console.log(list)

/* EJERCICIO 2
Implementar la clase HashTable.
Nuetra tabla hash, internamente, consta de un arreglo de buckets (slots, contenedores, o casilleros; es decir,
posiciones posibles para almacenar la información), donde guardaremos datos en formato clave-valor (por ejemplo, {instructora: 'Ani'}).
Para este ejercicio, la tabla debe tener 35 buckets (numBuckets = 35). (Luego de haber pasado todos los tests,
 a modo de ejercicio adicional, pueden modificar un poco la clase para que reciba la cantidad de buckets por parámetro al momento de ser instanciada.)

La clase debe tener los siguientes métodos:
  - hash: función hasheadora que determina en qué bucket se almacenará un dato. Recibe un input alfabético,
  suma el código numérico de cada caracter del input (investigar el método charCodeAt de los strings) y calcula el módulo de ese número total por la cantidad de buckets; de esta manera determina la posición de la tabla en la que se almacenará el dato.
  - set: recibe el conjunto clave valor (como dos parámetros distintos), hashea la clave invocando al método hash, y almacena todo el conjunto en el bucket correcto.
  - get: recibe una clave por parámetro, y busca el valor que le corresponde en el bucket correcto de la tabla.
  - hasKey: recibe una clave por parámetro y consulta si ya hay algo almacenado en la tabla con esa clave (retorna un booleano).

Ejemplo: supongamos que quiero guardar {instructora: 'Ani'} en la tabla.
Primero puedo chequear, con hasKey, si ya hay algo en la tabla con el nombre 'instructora';
luego, invocando set('instructora', 'Ani'), se almacenará el par clave-valor en un bucket específico (determinado al hashear la clave)
*/
class HashTable {
  constructor() {
    this.buckets = []
    this.numBuckets = 35
  }

  hash(key) {
    //if (typeof key !== 'string') throw TypeError('Key must be a string')
    let hash = 0
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i)
    }
    return hash % this.numBuckets
  }

  set(key, value) {
    if (typeof key !== 'string') throw TypeError('Key must be a string')
    //const bucket o index = this.hash(key)
    const index = this.hash(key)

    if (!this.buckets[index]) {
      this.buckets[index] = {}
    }
    this.buckets[index][key] = value
    return value
  }

  get(key) {
    if (typeof key !== 'string') throw TypeError('Key must be a string')
    const index = this.hash(key)
    return this.buckets[index][key]
  }

  hasKey(key) {
    const index = this.hash(key)
    return !!this.buckets[index][key]
  }

}

const hashTable = new HashTable()
console.log(hashTable.set('Nombre', 'Ariel'))
console.log(hashTable.set('Apellido', 'Piazzano'))
console.log(hashTable.buckets)

// No modifiquen nada debajo de esta linea
// --------------------------------

module.exports = {
  Node,
  LinkedList,
  HashTable,
};

'use strict';

/*
 Implementar la clase BinarySearchTree, definiendo los siguientes métodos recursivos:
  - size: retorna la cantidad total de nodos del árbol
  - insert: agrega un nodo en el lugar correspondiente
  - contains: retorna true o false luego de evaluar si cierto valor existe dentro del árbol
  - depthFirstForEach: recorre el árbol siguiendo el orden depth first (DFS) en cualquiera de sus variantes, según se indique por parámetro ("post-order", "pre-order", o "in-order"). Nota: si no se provee ningún parámetro, hará el recorrido "in-order" por defecto.
  - breadthFirstForEach: recorre el árbol siguiendo el orden breadth first (BFS)
  El ábrol utilizado para hacer los tests se encuentra representado en la imagen bst.png dentro del directorio homework.
*/
class BinarySearchTree {
   constructor(value) {
      this.value = value
      this.left = null
      this.right = null
   }

   insert(value) {
      // Instanciamos un nuevo arbol
      const binarySearchTree = new BinarySearchTree(value)
      // Comparamos el valor a ingresar con el valor raiz del arbol
      if (value < this.value) {
         // Si tiene algo a la izquierda
         if (this.left) {
            // Ejecuto mi funcion recursiva insert() en el nuevo arbol
            this.left.insert(value)
         } else {
            // Si no hay nada en la rama izquierda insertamos el nuevo arbol
            this.left = binarySearchTree
            return value
         }
      } else {
         // Si tiene algo a la derecha
         if (this.right) {
            // Ejecuto mi funcion recursiva insert() en el nuevo arbol
            this.right.insert(value)
         } else {
            // Si no hay nada en la rama derecha insertamos el nuevo arbol
            this.right = binarySearchTree
            return value
         }
      }
      return value

      // if (value > this.value) {
      //    if (this.right) {
      //       this.right.insert(value)
      //    } else {
      //       this.right = binarySearchTree
      //       return value
      //    }
      // }
      // return value
   }

   // El metodo size podria tambien hacerse agregando una propiedad ._size en el constructor
   // Deberiamos aumentar el size con cada arbol insertado ._size++
   size() {
      let count = 1
      if (this.left) count += this.left.size()
      if (this.right) count += this.right.size()
      return count
   }

   contains(value) {
      // Comparo el valor a buscar
      if (value === this.value) return true
      // Si tengo algo a la izquierda y el valor a buscar esta en la izquierda devuelvo true
      if (this.left && this.left.contains(value)) return true
      // Si tengo algo a la derecha y el valor a buscar esta en la derecha devuelvo true
      if (this.right && this.right.contains(value)) return true
      // Si no encuentro el valor devuelvo falso
      return false
   }

   depthFirstForEach(callBack, order) {
      switch (order) {
         case 'pre-order': // Nodo -> Izq -> Der
            callBack(this.value)
            if (this.left) this.left.depthFirstForEach(callBack, order)
            if (this.right) this.right.depthFirstForEach(callBack, order)
            break
         case 'post-order': // Izq -> Der -> Nodo
            if (this.left) this.left.depthFirstForEach(callBack, order)
            if (this.right) this.right.depthFirstForEach(callBack, order)
            callBack(this.value)
            break
         default: // In order: Izq -> Nodo -> Derecha
            if (this.left) this.left.depthFirstForEach(callBack, order)
            callBack(this.value)
            if (this.right) this.right.depthFirstForEach(callBack, order)
            break
      }
   }

   breadthFirstForEach(callBack, queue = []) {
      // Necesitamos agregarle un argumento queue incializado como array para que almacene la queue
      // Ejecuto el callBack para el nodo y guardo los hijos en la queue
      callBack(this.value)
      // Guardo los hijos en la queue
      if (this.left) queue.push(this.left)
      if (this.right) queue.push(this.right)

      // Retiro el primer elemento del queue que es el siguiente a ejecutar
      // utilizando el metodo shift() para luego ejecutar el metodo con el callBack.
      // Es decir, si hay elementos a recorrer llamo a la recursividad
      while (queue.length > 0) {
         queue.shift().breadthFirstForEach(callBack, queue)
      }
   }

}

const arbol = new BinarySearchTree(20)

console.log(arbol.insert(15))
console.log(arbol.insert(2))
console.log(arbol.insert(8))
console.log(arbol.size())
console.log(arbol.contains(8))
console.log(arbol)


// No modifiquen nada debajo de esta linea
// --------------------------------

module.exports = {
   BinarySearchTree,
};

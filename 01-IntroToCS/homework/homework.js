'use strict';

function BinarioADecimal(num) {
   let decimal = 0
   for (let i = 0; i < num.length; i++) {
      decimal += num[i] * Math.pow(2, num.length - i - 1)
   }
   return decimal
}

function DecimalABinario(num) {
   let binary = ''
   while (num > 0) {
      binary = (num % 2) + binary
      num = Math.floor(num / 2)
   }
   return binary

   // let binary = 0
   // let remainder = ''
   // while (num > 0) {
   //    binary = Math.floor(num / 2)
   //    remainder += num % 2
   //    num = binary
   // }
   // return remainder.split('').reverse().join('')

   // let binary = 0
   // let remainder = []
   // while (num > 0) {
   //    binary = Math.floor(num / 2)
   //    remainder.unshift(num % 2)
   //    num = binary
   // }
   // return remainder.join('')
}

module.exports = {
   BinarioADecimal,
   DecimalABinario,
};

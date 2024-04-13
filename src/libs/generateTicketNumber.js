export function generateTicketNumber(){
 // Genera un número aleatorio entre 100000 y 999999
 const randomNumber = Math.floor(Math.random() * 900000) + 100000;
 return randomNumber;
}
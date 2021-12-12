//import { createHmac } from 'crypto';
const cry = require('crypto');

const secret = "abcdefghj5"; // secret key
const forhash = "sifrelenecek cumleler" //->
const  hash = cry.createHmac('sha256', secret).update(forhash).digest('hex');

console.log(hash);

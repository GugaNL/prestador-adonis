'use strict'

const crypto = use('crypto')
const Helpers = use('Helpers') //Adonis native helpers

/**
 * Generation random string
 * @param {int} length - 0  Length of the string that you want to generate
 * @returns {string} A random string with lenght seted
 */

const str_random = async (lenght = 40) => {
    let string = ''
    let len = string.length

    if (len < lenght) { //Just a fail safe
        let size = lenght - len
        let bytes = await crypto.randomBytes(size) //Create a random list binary of bytes
        let buffer = Buffer.from(bytes) //convert the bytes to a buffer (need be buffer to be available convert to string after)
        string += buffer
        .toString('base64') //convert to string
        .replace(/[^a-zA-Z0-0]/g, '') //Remove tudo que não for: uma letra de 'a' a 'z' minúscula, uma letra de 'a' a 'z' maiúscula, um número de '0' a '9', ou seja, remove tudo que não seja alfanumerico)
        .substr(0, size) //Format the string to be with the desire length (40)
    }

    return string
}

module.exports = {
    str_random
}
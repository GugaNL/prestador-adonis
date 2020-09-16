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


/**
 * Move a single file to a specified path, if don't specified then move to 'public/uploads'
 * @param {FileJar} file The file that will be use
 * @param {string} path The path that the file will be move
 * @returns {Object<FileJar>}
 */
const manage_single_upload = async (file, path = null) => {
    path = path ? path : Helpers.publicPath('uploads') // If params path dont passed then set to public/uploads

    //Generate a random name
    const random_name = await str_random(20)
    let filename = `${new Date().getTime()}-${random_name}.${file.subtype}` //generate a name for use and save in a variable

    //Rename the file and move to the path
    await file.move(path, { name: filename })

    return file
}


/**
 * Move multiple files to a specified path, if don't specified then move to 'public/uploads'
 * @param {FileJar} file The file that will be use
 * @param {string} path The path that the file will be move
 * @returns {Object}
 */
const manage_multiple_upload = async (filejar, path = null) => {
    path = path ? path : Helpers.publicPath('uploads') // If params path dont passed then set to public/uploads

    let success = [], errors = []

    await Promise.all(filejar.files.map(async file => {
        //Generate a random name
        const random_name = await str_random(20)
        let filename = `${new Date().getTime()}-${random_name}.${file.subtype}` //generate a name for use and save in a variable
        await file.move(path, { name: filename })

        //Check if really was moved
        if (file.moved()) {
            success.push(file)
        } else {
            errors.push(file.error())
        }

    }))

    return { success, errors }
}



module.exports = {
    str_random,
    manage_single_upload,
    manage_multiple_upload
}
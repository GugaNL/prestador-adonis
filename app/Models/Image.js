'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Env = use('Env')

class Image extends Model {

    /**
     * Inform to Lucit when send this model to the serializator(adonis feature the transform model in json) execute the computed property bellow 
    */
    static get computed() {
        return ['url']
    }


    /**
     * Necessary to get the relative path of the image
     */
    getUrl({ path }) { //Destruction equivalent to modelInstance path
        return `${Env.get('APP_URL')}/uploads/${path}` //The relative path
    }
    
}

module.exports = Image

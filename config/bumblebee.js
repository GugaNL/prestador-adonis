'use strict'

module.exports = {
  /*
   * When enabled, Bulblebee will automatically parse the ?include=
   * parameter and include all requested resources
   */
  parseRequest: true, //true means we can pass a include object in the request (Ex.: return entire user data in show_service)

  /*
   * Nested includes will be resolved up to this limit any further nested
   * resources are going to be ignored
   */
  includeRecursionLimit: 10,

  /*
   * The serializer will be used to transform the data into its final
   * representation.
   * Currently supported: 'plain', 'data', 'sld'
   */
  serializer: 'plain',

  /*
   * When a transformer is reffered to by its name only, Bumblebee will try to
   * resolve the transformer using this namespace as prefix.
   */
  namespace: 'App/Transformers'
}

/**
 * adjust toJSON transformation
 */
export const transformEnhance = schema => {
  if (!schema.options.toObject) schema.options.toObject = {}
  schema.options.toObject.transform = function(doc, ret, options) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  }

  if (!schema.options.toJSON) schema.options.toJSON = {}
  schema.options.toJSON.transform = function(doc, ret, options) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  }
}

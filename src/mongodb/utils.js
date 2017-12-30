/**
 * adjust toJSON transformation
 */
export const transformEnhance = schema => {
  schema.options.toObject.transform = function(doc, ret, options) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  }

  schema.options.toJSON.transform = function(doc, ret, options) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  }
}

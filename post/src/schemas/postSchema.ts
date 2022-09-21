import Joi from 'joi'

export const postSchema = Joi.object({
    caption: Joi.string().trim().allow('').min(1).max(20)
})
import Joi from "joi"

export const productSchema = Joi.object({
    title: Joi.string().required(),
    description:Joi.string().required(),
    price:Joi.number().required(),
    img:Joi.string().required(),
    code:Joi.required(),
    stock:Joi.number().required(),
    status:Joi.boolean().required(),
    category:Joi.string().required(),
})





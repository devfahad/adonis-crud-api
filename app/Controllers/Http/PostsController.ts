import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class PostsController {
  /** Controller methods */

  // Show all posts method
  public async index({ response }: HttpContextContract) {
    const posts = await Post.all()

    return response.ok(posts)
  }

  // Create a post method
  public async store({ request, response }: HttpContextContract) {
    /** Schema definition */
    const postSchema = schema.create({
      title: schema.string({ trim: true }, [rules.maxLength(255)]),
      content: schema.string({ escape: true }, [rules.maxLength(1000)]),
    })

    /** Validate request body against the schema. here, payload is the data */
    const payload: any = await request.validate({ schema: postSchema })

    const post: Post = await Post.create(payload)

    return response.ok(post)
  }

  // Show single post method
  public async show({ post, response }) {
    return response.ok(post)
  }

  // Update a post method
  public async update({ post, request, response }) {
    /** Schema definition */
    const postSchema = schema.create({
      title: schema.string({ trim: true }, [rules.maxLength(255)]),
      content: schema.string({ escape: true }, [rules.maxLength(1000)]),
    })

    /** Validation */
    const payload: any = await request.validate({ schema: postSchema })

    post.title = payload.title
    post.content = payload.content

    await post.save()

    return response.ok(post)
  }

  // Delete a post method
  public async destroy({ post, response }) {
    await post.delete()

    return response.ok({ message: 'Post deleted successfully.' })
  }
}

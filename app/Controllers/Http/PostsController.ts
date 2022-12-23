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
  public async show({ params, response }: HttpContextContract) {
    const { id } = params

    const post: any = await Post.find(id)
    if (!post) {
      return response.notFound({ message: 'Post not found' })
    }

    return response.ok(post)
  }

  // Update a post method
  public async update({ request, params, response }: HttpContextContract) {
    /** Schema definition */
    const postSchema = schema.create({
      title: schema.string({ trim: true }, [rules.maxLength(255)]),
      content: schema.string({ escape: true }, [rules.maxLength(1000)]),
    })

    /** Validation */
    const payload: any = await request.validate({ schema: postSchema })

    const { id } = params

    const post: any = await Post.find(id)
    if (!post) {
      return response.notFound({ message: 'Post not found' })
    }

    post.title = payload.title
    post.content = payload.content

    await post.save()

    return response.ok(post)
  }

  // Delete a post method
  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params

    const post: any = await Post.find(id)
    if (!post) {
      return response.notFound({ message: 'Post not found' })
    }

    await post.delete()

    return response.ok({ message: 'Post deleted successfully.' })
  }
}

import type { ApplicationContract } from '@ioc:Adonis/Core/Application'

const pluralize = require('pluralize')

/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
|
| Your application is not ready when this file is loaded by the framework.
| Hence, the top level imports relying on the IoC container will not work.
| You must import them inside the life-cycle methods defined inside
| the provider class.
|
| @example:
|
| public async ready () {
|   const Database = this.app.container.resolveBinding('Adonis/Lucid/Database')
|   const Event = this.app.container.resolveBinding('Adonis/Core/Event')
|   Event.on('db:query', Database.prettyPrint)
| }
|
*/

export default class RouteModelProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    const Route = this.app.container.use('Adonis/Core/Route')

    // For Route.bind()
    // Route.Route.macro('bind', function (name) {
    //   this.middleware(async (ctx, next) => {
    //     const { id } = ctx.request.params()

    //     try {
    //       const Model = (await import(`App/Models/${name}`)).default

    //       const record = await Model.find(id)
    //       if (!record) {
    //         return ctx.response.notFound({ message: `${name} not found.` })
    //       }

    //       ctx[name.toLowerCase()] = record
    //       await next()
    //     } catch (exception) {
    //       return ctx.response.internalServerError({ message: 'Invalid model name passed.' })
    //     }
    //   }, false)

    //   return this
    // })

    // For Route.resource().bind()
    Route.RouteResource.macro('bind', function (name) {
      const modelPluralized = pluralize(name.toLowerCase())
      const routes = this.routes.filter(
        (item) =>
          [
            `${modelPluralized}.show`,
            `${modelPluralized}.update`,
            `${modelPluralized}.destroy`,
          ].indexOf(item.name) !== -1
      )

      routes.forEach((item) => {
        item.middleware(async (ctx, next) => {
          const { id } = ctx.request.params()
          try {
            const Model = (await import(`App/Models/${name}`)).default

            const record = await Model.find(id)
            if (!record) {
              return ctx.response.notFound({ message: `${name} not found.` })
            }

            ctx[name.toLowerCase()] = record
            await next()
          } catch (exception) {
            return ctx.response.internalServerError({ message: 'Invalid model name passed.' })
          }
        }, false)
      })

      return this
    })
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}

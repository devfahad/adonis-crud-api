import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title', 255)
      table.text('content', 'long')
      table.specificType('status', 'tinyint(1)').unsigned().defaultTo(1)
      table.timestamp('created_at').defaultTo(this.now()).notNullable()
      table.timestamp('updated_at').defaultTo(this.now()).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

import { type Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  await knex.schema.createTable('ticket', table => {
    table.increments('id').primary()
    table.string('name').notNullable().unique()
    table.string('description').nullable()
    table.string('price').notNullable()
    table.string('quantity').notNullable()
    table.string('event_id').notNullable()
    table.string('created_at').nullable()
    table.string('updated_at').nullable()
    table.integer('user_id').references('id').inTable('user')
  })
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.dropTable('ticket')
}

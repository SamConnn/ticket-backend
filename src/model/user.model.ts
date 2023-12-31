/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Knex } from 'knex'

const table = 'user'

export const getUserModel = async (
  trx: Knex,
  page: number,
  limit: number
): Promise<any> => await trx(table)
  .select('user.id', 'user.username', 'user.email', 'user.role')
  .paginate({ perPage: limit, currentPage: page, isLengthAware: true })

export const createUserModel = async (body: any, trx: Knex) => await trx(table).insert(body).returning('id')

export const getUserByIdModel = async (id: string, trx: Knex) => await trx(table)
  .select('user.id', 'user.username', 'user.email', 'user.role')
  .where({ id })
  .first()

export const updateUserModel = async (id: string, body: any, trx: Knex) => await trx(table).update(body).where({ id }).returning('id')

export const deleteUserModel = async (id: string, trx: Knex) => await trx(table).del().where({ id }).returning('id')

export const findUserByEmail = async (email: string, trx: Knex) => await trx(table).select('*').where({ email })

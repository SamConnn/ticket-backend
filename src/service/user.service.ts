/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type Response } from 'express'
import { type Knex } from 'knex'
import knex from '../config/knex'
import { withTransaction } from '../config/transact'
import { userSchema } from '../contanst'
import { createUserModel, deleteUserModel, getUserModel, updateUserModel } from '../model/user.model'
import { handleErrorValidationArray } from '../utils/appError'
import { vali } from '../utils/validator'

export const getUserService = async (
  page: number,
  limit: number
): Promise<any> => await withTransaction(knex, async (trx: Knex) => await getUserModel(trx, page, limit))

export const CreateUserService = async (
  body: any,
  res: Response
): Promise<any> => {
  const check = vali.compile(userSchema)
  const invalid = check(body)

  if (!invalid) {
    return res.status(400).json({
      status: 'fail',
      message: handleErrorValidationArray(invalid)
    })
  }
  return await withTransaction(knex, async (trx: Knex) => await createUserModel(body, trx))
}

export const updateUserService = async (
  id: string,
  body: any,
  res: Response
): Promise<any> => {
  const check = vali.compile(userSchema)
  const invalid = check(body)

  if (!invalid) {
    return res.status(400).json({
      status: 'fail',
      message: handleErrorValidationArray(invalid)
    })
  }
  return await withTransaction(knex, async (trx: Knex) => await updateUserModel(id, body, trx))
}

export const deleteUserService = async (
  id: string
): Promise<any> => await withTransaction(knex, async (trx: Knex) => await deleteUserModel(id, trx))

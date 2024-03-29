/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type NextFunction, type Request, type Response } from 'express'
import knex from '../config/knex'
import { InternalServerError, NotFoundError } from '../lib/errors'
import { getUserByIdModel } from '../model/user.model'
import {
  create as createUserService,
  destroy as deleteUserService,
  search as getUserService,
  update as updateUserService
} from '../service/user.service'

// const redis = createClient({
//   password: 'secret_redis'
// })
// void redis.connect()

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { page = 1, limit = 10 } = req.query

  await getUserService(Number(page), Number(limit))
    .then(async (result) => res.status(200).json({ data: result }))
    .catch((err: string) => { next(new NotFoundError(err)) })
}

export const findUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params

  await getUserByIdModel(id, knex)
    .then((result) => {
      if (!result) {
        next(new NotFoundError('User not found'))
        return
      }
      return res.status(200).json({ data: result })
    })
    .catch((err: string) => { next(new NotFoundError(err)) })
}

export const createUser = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<any> => await createUserService(req.body, next)
  .then((result) => res.status(200).json({ data: result }))
  .catch((err: string) => { next(new InternalServerError(err)) })

export const updateUser = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<any> => await updateUserService(String(req.params?.id), req.body)
  .then((result) => {
    if (!result) {
      next(new NotFoundError('User not found'))
      return
    }
    return res.status(200).json({ data: result })
  })
  .catch((err: string) => { next(new InternalServerError(err)) })

export const deleteUser = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<any> => await deleteUserService(String(req.params?.id))
  .then((result) => res.status(200).json({ data: result }))
  .catch((err: string) => { next(new InternalServerError(err)) })

/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type NextFunction, type Request, type Response } from 'express'
import knex from '../config/knex'
import { NotFoundError } from '../lib/errors'
import { getUserByIdModel } from '../model/user.model'
import {
  create as CreateUserService,
  destroy as deleteUserService,
  search as getUserService,
  update as updateUserService
} from '../service/user.service'
import { responseError } from '../utils/error-handler'

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
    .then(async (result) => res.status(200).json(result))
    .catch((err) => responseError(res, err))
}

export const findUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params

  await getUserByIdModel(id, knex)
    .then((result) => {
      if (!result) { next(new NotFoundError('User not found')); return }
      return res.status(200).json(result)
    })
    .catch((err) => responseError(res, err))
}

export const createUser = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { body } = req

  CreateUserService(body, next)
    .then((result) => res.status(200).json(result))
    .catch((err) => responseError(res, err))
}

export const updateUser = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params
  const { body } = req

  updateUserService(id, body)
    .then((result) => {
      if (!result) { next(new NotFoundError('User not found')); return }
      return res.status(200).json(result)
    })
    .catch((err) => responseError(res, err))
}

export const deleteUser = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params

  deleteUserService(id)
    .then((result) => res.status(200).json(result))
    .catch((err) => responseError(res, err))
}

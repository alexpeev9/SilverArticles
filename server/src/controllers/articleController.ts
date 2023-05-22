import { Request, Response, NextFunction } from 'express'

import articleService from '../services/articleService'
import userService from '../services/userService'
import categoryService from '../services/categoryService'

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const articles = await articleService.getAll()
    return res.status(200).json(articles)
  } catch (err: any) {
    err.statusCode = 404
    return next(err)
  }
}

const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { reqUser } = req.body
    const { slug } = req.params

    const article = await articleService.getOne(slug)

    if (
      !article.isPublic &&
      reqUser &&
      !articleService.checkIfAuthorized(article, reqUser)
    ) {
      throw new Error('Article not found!')
    }

    const hasVoted = reqUser
      ? articleService.checkIfVoted(article, reqUser)
      : false

    const { _id, votes, ...articleResult } = article.toObject()

    return res.status(200).json({ ...articleResult, hasVoted })
  } catch (err: any) {
    err.statusCode = 404
    return next(err)
  }
}

const getXNumber = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { number, order } = req.params
    const articles = await articleService.getXNumber(number, order)
    return res.status(200).json(articles)
  } catch (err: any) {
    err.statusCode = 404
    return next(err)
  }
}

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body
    const { category, reqToken } = data
    const selectedCategory = await categoryService.getEntity(category)
    const selectedUser = await userService.getEntity(reqToken.username)

    const articleSlug = await articleService.create(
      data,
      selectedCategory,
      selectedUser
    )

    return res.status(200).json(articleSlug)
  } catch (err: any) {
    return next(err)
  }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { article: oldArticleData } = req.body
    const articleSlug = await articleService.update(oldArticleData, req.body)
    return res.status(200).json(articleSlug)
  } catch (err: any) {
    return next(err)
  }
}

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { article } = req.body
    const message = await articleService.remove(article)
    return res.status(200).json(message)
  } catch (err: any) {
    return next(err)
  }
}

const vote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params
    const { reqToken, vote } = req.body
    if (vote !== 'upvote' && vote !== 'downvote') {
      throw new Error('You can only upvote and downvote an article')
    }

    const voteValue = vote === 'upvote'
    const article = await articleService.getOne(slug)
    const user = await userService.getEntity(reqToken.username)

    const message = await articleService.vote(article, user, voteValue)
    return res.status(200).json(message)
  } catch (err: any) {
    err.statusCode = 404
    return next(err)
  }
}

export default { getAll, getOne, getXNumber, create, update, remove, vote }

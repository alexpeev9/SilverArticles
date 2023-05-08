import crudService from '../services/crudService'
import { User, Article, Category } from '../models'
import jwt from 'jsonwebtoken'
import { jwtSecret } from '../env'

const service = crudService(Article)

const getAll = async () =>
  await service.getAll({ isPublic: true }, 'title slug image -_id')

const getOne = async (slug: string, token: any) => {
  const article = await service.getOne(
    { slug },
    'title slug description image isPublic rating category author -_id'
  )

  await article.populate('category', 'title slug image -_id')
  await article.populate('author', 'username firstName lastName -_id')

  // if it is private and it is not requested by the creator, don't show
  if (
    !article.isPublic &&
    (!token ||
      (jwt.verify(token, jwtSecret) as any).username !==
        article.author.username)
  ) {
    throw new Error(`Article not found!`)
  }

  return article
}

const getXNumber = async (number: string, order: string) => {
  const articleNumbers = Number(number)
  if (articleNumbers <= 0) {
    throw new Error('Invalid parameters.')
  }

  const articles = await Article.find({ isPublic: true })
    .select(['title', 'slug', 'description', 'image', '-_id'])
    .sort({ _id: order === 'new' ? -1 : 1 })
    .populate('author', 'firstName lastName username -_id')
    .limit(articleNumbers)

  return articles
}

const create = async (data: any) => {
  const { title, slug, image, description, isPublic, category, reqToken } = data
  await service.checkIfDuplicate('title', title)
  await service.checkIfDuplicate('slug', slug)

  const user = await User.findOne({ username: reqToken.username })

  if (!user) {
    throw new Error('User not found')
  }

  const article = await service.create({
    title,
    slug,
    image,
    description,
    isPublic,
    category: await Category.findOne({ slug: category }),
    author: await User.findOne({ username: user.username })
  })

  await user.update({ $push: { articles: article._id } })

  return article.slug
}

const update = async (slugParam: any, data: any) => {
  const { title, slug, image, description, isPublic, category } = data

  const oldArticle = await service.getOne(
    { slug: slugParam },
    'title slug description image isPublic category -_id'
  )

  // check if title is the same, and if there is a new title check if it is used in other record
  if (title !== oldArticle.title) {
    await service.checkIfDuplicate('title', title)
  }

  // check if slug is the same, and if there is a new slug check if it is used in other record
  if (slug !== oldArticle.slug) {
    await service.checkIfDuplicate('slug', slug)
  }

  const article = await service.update(
    { slug: slugParam },
    {
      title: title ?? oldArticle.title,
      slug: slug ?? oldArticle.slug,
      image: image ?? oldArticle.image,
      description: description ?? oldArticle.description,
      isPublic: isPublic ?? oldArticle.isPublic,
      category: category
        ? await Category.findOne({ slug: category })
        : oldArticle.category
    }
  )

  return article.slug
}

export default { getAll, getOne, getXNumber, create, update }

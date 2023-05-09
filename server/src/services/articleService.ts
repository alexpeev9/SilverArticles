import crudService from '../services/crudService'
import { roleIds } from '../env'
import { User, Article, Category } from '../models'

const service = crudService(Article)

const getAll = async () =>
  await service.getAll({ isPublic: true }, 'title slug image -_id')

const getEntity = async (slug: any) => await service.getEntity({ slug })

const checkIfCreator = (article: any, user: any) =>
  article.author.username === user.username || user.roleId === roleIds.adminId

const getOne = async (slug: string) => {
  const article = await service.getOne(
    { slug },
    'title slug description image isPublic rating category author -_id'
  )

  await article.populate('category', 'title slug image -_id')
  await article.populate('author', 'username customId firstName lastName -_id')

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

const create = async (data: any, category: any, user: any) => {
  const { title, slug, image, description, isPublic } = data
  await service.checkIfDuplicate('title', title)
  await service.checkIfDuplicate('slug', slug)

  const article = await service.create({
    title,
    slug,
    image,
    description,
    isPublic,
    category: category,
    author: user
  })

  await category.update({ $push: { articles: article._id } })
  await user.update({ $push: { articles: article._id } })

  return article.slug
}

const update = async (oldArticle: any, data: any) => {
  const { title, slug, image, description, isPublic, category } = data

  // check if title is the same, and if there is a new title check if it is used in other record
  if (title !== oldArticle.title) {
    await service.checkIfDuplicate('title', title)
  }

  // check if slug is the same, and if there is a new slug check if it is used in other record
  if (slug !== oldArticle.slug) {
    await service.checkIfDuplicate('slug', slug)
  }

  const article = await service.update(
    { slug: oldArticle.slug },
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

const remove = async (article: any) => {
  await Category.findOneAndUpdate(
    { _id: article.category },
    { $pull: { articles: article._id } }
  )

  await User.findOneAndUpdate(
    { _id: article.author },
    { $pull: { articles: article._id } }
  )

  await article.remove()

  return `${article.title} successfully deleted`
}

export default {
  getAll,
  getEntity,
  checkIfCreator,
  getOne,
  getXNumber,
  create,
  update,
  remove
}

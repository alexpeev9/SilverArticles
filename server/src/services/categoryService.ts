import { Article, Category } from '../models'
import crudService from './crudService'

const service = crudService(Category)

const getAll = async () =>
  await service.getAll({}, 'title slug image description -_id')

const getEntity = async (slug: any) => await service.getEntity({ slug })

const getXNumberCategories = async (number: string) => {
  const categoryNumbers = Number(number)
  if (categoryNumbers <= 0) {
    throw new Error('Invalid parameters.')
  }

  const categories = await Category.find({
    $or: [{ slug: 'others' }, { articles: { $gt: [] } }]
  })
    .sort({ articles: -1 })
    .select(['title', 'slug', 'image', '-_id'])
    .populate({
      path: 'articles',
      select: 'title -_id',
      match: { isPublic: true },
      options: { limit: 2 }
    })
    .limit(categoryNumbers)

  if (!categories) {
    throw new Error('Categories not found!')
  }

  return categories
}

const getOne = async (slug: string) => {
  const category = await service.getOne(
    { slug },
    'title slug description image articles -_id'
  )

  await category.populate('articles', 'title slug image description -_id', {
    isPublic: true
  })

  return category
}

const create = async (data: any) => {
  const { title, slug, description, image } = data
  await service.checkIfDuplicate('title', title)
  await service.checkIfDuplicate('slug', slug)

  const category = await service.create({
    title,
    slug,
    description,
    image
  })

  return category.slug
}

const update = async (slugParam: any, data: any) => {
  const { title, slug, description, image } = data

  if (slugParam === 'others') {
    throw new Error('You can not delete Others category')
  }

  const oldCategory = await service.getOne(
    { slug: slugParam },
    'title slug image description -_id'
  )

  // check if title is the same, and if there is a new title check if it is used in other record
  if (title !== oldCategory.title) {
    await service.checkIfDuplicate('title', title)
  }

  // check if slug is the same, and if there is a new slug check if it is used in other record
  if (slug !== oldCategory.slug) {
    await service.checkIfDuplicate('slug', slug)
  }

  const category = await service.update(
    { slug: slugParam },
    {
      title: title || oldCategory.title,
      slug: slug || oldCategory.slug,
      description: description || oldCategory.description,
      image: image || oldCategory.image
    }
  )

  if (!category) {
    throw new Error('An error occured')
  }

  return slug
}

const remove = async (slug: any) => {
  if (slug === 'others') {
    throw new Error('You can not delete Others category')
  }
  const category = await service.getOne({ slug }, 'title')
  const categoryOther = await service.getOne({ slug: 'others' }, 'title')

  await Article.updateMany(
    { category: category._id },
    { category: categoryOther._id }
  )

  await category.remove()
  return `${category.title} successfully deleted.`
}

export default {
  getAll,
  getEntity,
  getOne,
  getXNumberCategories,
  create,
  update,
  remove
}

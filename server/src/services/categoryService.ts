import { Category } from '../models'
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

  const categories = await Category.find()
    .sort({ articles: -1 })
    .select(['title', 'slug', 'image', '-_id'])
    .populate({
      path: 'articles',
      select: 'title -_id',
      options: { limit: 2 }
    })
    .limit(categoryNumbers)

  return categories
}

const getOne = async (slug: string) => {
  const category = await service.getOne(
    { slug },
    'title slug description image articles -_id'
  )

  await category.populate('articles', 'title slug image description -_id')

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
  const category = await service.getOne({ slug }, 'title')
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

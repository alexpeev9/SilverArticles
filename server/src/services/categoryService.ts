import { Category } from '../models'

const getAll = async () => {
  const categories = await Category.find().select(['title', 'slug', '-_id'])

  if (!categories) {
    throw new Error('No Categories found!')
  }

  return categories
}

const getCategoryBySlug = async (slug: string) => {
  const category = await Category.findOne({ slug })
    .select(['title', 'slug', '-_id'])
    .populate('articles', 'title slug image -_id')

  if (!category) {
    throw new Error('Category not found!')
  }

  return category
}

const updateCategory = async (slugParam: string, body: any) => {
  const { title, slug } = body
  const category = await Category.findOne({ slug: slugParam })
  if (!category) {
    throw new Error('No Category found')
  }

  await checkDuplicateField('title', title)
  await checkDuplicateField('slug', slug)
  const updatedUser = await Category.updateOne(
    { slug: slugParam },
    {
      $set: {
        title: title ? title : category.title,
        slug: slug ? slug : category.slug
      }
    },
    { runValidators: true }
  )

  return updatedUser.acknowledged
}

const checkDuplicateField = async (field: string, data: string | any) => {
  if (data) {
    if (await Category.exists({ [field]: data })) {
      throw new Error(`Category with that ${field} already exists`)
    }
  }
}

export default { getAll, getCategoryBySlug, updateCategory }

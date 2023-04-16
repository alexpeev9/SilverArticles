import { Article, Category, User } from '../models'

const getAll = async () => {
  const articles = await Article.find({ isPublic: true }).select([
    'title',
    'slug',
    'image',
    '-_id'
  ])

  return articles
}

const create = async (data: any) => {
  const { title, slug, image, description, category, reqToken } = data
  await checkIfDuplicate('username', title)
  await checkIfDuplicate('email', slug)

  const user = await User.findOne({ username: reqToken.username })

  if (!user) {
    throw new Error('User not found')
  }

  const article = await Article.create({
    title,
    slug,
    image,
    description,
    category: await Category.findOne({ slug: category }),
    author: await User.findOne({ username: user.username })
  })

  await user.update({ $push: { articles: article._id } })

  return article.slug
}

const getXNumberArticles = async (number: string, order: string) => {
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

const getArticleBySlug = async (slug: string) => {
  const article = await Article.findOne({ slug, isPublic: true })
    .select([
      'title',
      'slug',
      'description',
      'image',
      'isPublic',
      'rating',
      '-_id'
    ])
    .populate('category', 'title slug image -_id')
    .populate('author', 'username -_id')

  if (!article) {
    throw new Error('Article not found!')
  }

  return article
}

const checkIfDuplicate = async (
  field: string,
  value: string
): Promise<void> => {
  if (await Article.findOne({ [field]: value })) {
    throw new Error(
      `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`
    )
  }
}

export default { getAll, create, getXNumberArticles, getArticleBySlug }

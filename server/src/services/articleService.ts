import { Article } from '../models'

const getAll = async () => {
  const articles = await Article.find({ isPublic: true }).select([
    'title',
    'slug',
    'image',
    '-_id'
  ])

  return articles
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
    .populate('category', 'title slug -_id')
    .populate('author', 'username -_id')

  if (!article) {
    throw new Error('Article not found!')
  }

  return article
}

export default { getAll, getXNumberArticles, getArticleBySlug }

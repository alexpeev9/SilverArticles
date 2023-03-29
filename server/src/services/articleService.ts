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

export default { getAll, getArticleBySlug }

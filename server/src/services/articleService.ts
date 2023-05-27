import crudService from '../services/crudService'
import { roleIds } from '../env'
import { User, Article, Category } from '../models'

const service = crudService(Article)

const getAll = async () =>
  await service.getAll({ isPublic: true }, 'title slug image description -_id')

const checkIfAuthorized = (article: any, user: any) =>
  article.author.username === user.username ||
  user.role === roleIds.moderatorId ||
  user.role === roleIds.adminId

const checkIfPrivate = (article: any, user: any) =>
  !article.isPublic && !(user && checkIfAuthorized(article, user))

const checkIfVoted = (article: any, user: any) =>
  (article.votes && article.votes.includes(user._id)) ||
  (user.votes && user.votes.includes(article._id))

const getOne = async (slug: string): Promise<any> => {
  let article = await service.getOne(
    { slug },
    'title slug description image isPublic rating category author votes'
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
      category: await Category.findOne({ slug: category })
    }
  )

  if (!article) {
    throw new Error('An error occured')
  }

  // if category is changed, update article in category list

  if (category !== oldArticle.category.slug) {
    const addToNewCategory = await Category.findOneAndUpdate(
      { slug: category },
      {
        $push: { articles: oldArticle._id }
      }
    )

    const removeFromOldCategory = await Category.findOneAndUpdate(
      { slug: oldArticle.category.slug },
      {
        $pull: { articles: oldArticle._id }
      }
    )

    if (!removeFromOldCategory || !addToNewCategory) {
      throw new Error('We are sorry. We could not update category list.')
    }
  }

  return slug
}

const remove = async (article: any) => {
  const articleObject = await service.getOne({ slug: article.slug }, 'title')

  await Category.findOneAndUpdate(
    { _id: article.category._id },
    { $pull: { articles: article._id } }
  )

  await User.findOneAndUpdate(
    { _id: article.author._id },
    { $pull: { articles: article._id } }
  )

  await articleObject.remove()

  return `${article.title} successfully deleted`
}

const vote = async (article: any, user: any, vote: boolean) => {
  await user.populate('votes')
  await user.populate('articles')
  await article.populate('votes')

  if (
    article.author.username === user.username ||
    (user.articles && user.articles.includes(article._id))
  ) {
    throw new Error('The user cannot vote for his own article!')
  }

  // if (await checkIfVoted(article, user)) {
  //   throw new Error('The user has already voted for this article!')
  // }

  await Article.findOneAndUpdate(
    { _id: article._id },
    {
      $push: { votes: user._id },
      $inc: { rating: vote ? +1 : -1 }
    }
  )

  await User.findOneAndUpdate(
    { _id: user._id },
    { $push: { votes: article._id } }
  )

  return `You have successfully ${vote ? 'up' : 'down'}voted for this article!`
}

export default {
  getAll,
  checkIfAuthorized,
  checkIfPrivate,
  checkIfVoted,
  getOne,
  getXNumber,
  create,
  update,
  remove,
  vote
}

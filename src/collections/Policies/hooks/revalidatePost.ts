import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Post } from '../../../payload-types'

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    const path = `/policies/${doc.slug}`

    payload.logger.info(`Revalidating policy at path: ${path}`)

    revalidatePath(path)
    revalidateTag('policies-sitemap')
  }

  // If the policy was previously published, we need to revalidate the old path
  if (previousDoc._status === 'published' && doc._status !== 'published') {
    const oldPath = `/policies/${previousDoc.slug}`

    payload.logger.info(`Revalidating old policy at path: ${oldPath}`)

    revalidatePath(oldPath)
    revalidateTag('policies-sitemap')
  }

  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc }) => {
  const path = `/policies/${doc?.slug}`

  revalidatePath(path)
  revalidateTag('policies-sitemap')

  return doc
}

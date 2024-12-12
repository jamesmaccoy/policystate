import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const policies = await payload.find({
    collection: 'policies',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Policies</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="policies"
          currentPage={policies.page}
          limit={12}
          totalDocs={policies.totalDocs}
        />
      </div>

      <CollectionArchive policies={policies.docs} />

      <div className="container">
        {policies.totalPages > 1 && policies.page && (
          <Pagination page={policies.page} totalPages={policies.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Policies`,
  }
}

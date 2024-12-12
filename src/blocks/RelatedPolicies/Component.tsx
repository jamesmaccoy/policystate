import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/RichText'

import type { Policy } from '@/payload-types'

import { Card } from '../../components/Card'

export type RelatedPoliciesProps = {
  className?: string
  docs?: Policy[]
  introContent?: any
}

export const RelatedPolicies: React.FC<RelatedPoliciesProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={clsx('container', className)}>
      {introContent && <RichText content={introContent} enableGutter={false} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return <Card key={index} doc={doc} relationTo="policies" showCategories />
        })}
      </div>
    </div>
  )
}

'use client'

import IndustryPageTemplate from '../../components/templates/IndustryPageTemplate'
import { technologyData } from '../../data/industryData'

const Technology: React.FC = () => {
  return <IndustryPageTemplate data={technologyData} />
}

export default Technology

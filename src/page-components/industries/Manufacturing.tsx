'use client'

import IndustryPageTemplate from '../../components/templates/IndustryPageTemplate'
import { manufacturingData } from '../../data/industryData'

const Manufacturing: React.FC = () => {
  return <IndustryPageTemplate data={manufacturingData} />
}

export default Manufacturing

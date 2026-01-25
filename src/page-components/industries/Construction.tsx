'use client'

import IndustryPageTemplate from '../../components/templates/IndustryPageTemplate'
import { constructionData } from '../../data/industryData'

const Construction: React.FC = () => {
  return <IndustryPageTemplate data={constructionData} />
}

export default Construction

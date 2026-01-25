'use client'

import IndustryPageTemplate from '../../components/templates/IndustryPageTemplate'
import { realEstateData } from '../../data/industryData'

const RealEstate: React.FC = () => {
  return <IndustryPageTemplate data={realEstateData} />
}

export default RealEstate

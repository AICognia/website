'use client'

import IndustryPageTemplate from '../../components/templates/IndustryPageTemplate'
import { energyData } from '../../data/industryData'

const Energy: React.FC = () => {
  return <IndustryPageTemplate data={energyData} />
}

export default Energy

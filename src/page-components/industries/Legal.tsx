'use client'

import IndustryPageTemplate from '../../components/templates/IndustryPageTemplate'
import { legalData } from '../../data/industryData'

const Legal: React.FC = () => {
  return <IndustryPageTemplate data={legalData} />
}

export default Legal

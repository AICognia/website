'use client'

import IndustryPageTemplate from '../../components/templates/IndustryPageTemplate'
import { healthcareData } from '../../data/industryData'

const Healthcare: React.FC = () => {
  return <IndustryPageTemplate data={healthcareData} />
}

export default Healthcare

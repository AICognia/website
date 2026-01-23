'use client'

import IndustryPageTemplate from '../../components/templates/IndustryPageTemplate'
import { retailData } from '../../data/industryData'

const Retail: React.FC = () => {
  return <IndustryPageTemplate data={retailData} />
}

export default Retail

'use client'

import IndustryPageTemplate from '../../components/templates/IndustryPageTemplate'
import { financialServicesData } from '../../data/industryData'

const FinancialServices: React.FC = () => {
  return <IndustryPageTemplate data={financialServicesData} />
}

export default FinancialServices

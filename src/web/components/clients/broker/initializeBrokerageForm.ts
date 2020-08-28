import { Region } from '#veewme/gen/graphqlTypes'
import { OptionValue } from '#veewme/web/common/formikFields/selectField'
import { BrokerFormValues, PhotoDownloadPreset } from '#veewme/web/common/formPanels/valuesInterfaces'
import { useEffect, useState } from 'react'
import { FormOptions } from './brokerForm'
import brokerFormValues from './brokerFormValues'
import { BrokerageOwnerQueryResult, BrokerageQueryResult } from './queriesDataTypes'

const getRegionOptions = (regions: Region[]): OptionValue[] => {
  return regions.map(region => ({
    label: region.label,
    value: region.id
  }))
}

export const formEmptyOptions: FormOptions = {
  regionOptions: []
}

export const useInitializeBrokerageForm = (owner?: BrokerageOwnerQueryResult, data?: BrokerageQueryResult): [BrokerFormValues, FormOptions] => {
  const [values, setValues] = useState<BrokerFormValues>({
    ...brokerFormValues
  })

  const [formOptions, setFormOptions] = useState<FormOptions>(formEmptyOptions)

  useEffect(() => {
    let availablePresets: PhotoDownloadPreset[] = []
    let regionOptions: OptionValue[] = []
    let regionId = 0  // TODO make optional in initial data
    let ownerId = 0  // TODO make optional in initial data

    if (owner) {
      availablePresets = owner.mediaExports.map<PhotoDownloadPreset>(preset => {
        const brokerPreset = data && data.photoDownloadPresets.find(bp => bp.photoPreset.id === preset.id)
        return {
          downloadTrigger: brokerPreset && brokerPreset.downloadTrigger || 'NOTRIGGER',
          enabled: brokerPreset && brokerPreset.enabled || false,
          id: brokerPreset && brokerPreset.id,
          photoPreset: preset
        }
      })

      regionId = owner.regions[0].id
      regionOptions = getRegionOptions(owner.regions)
    } else if (data && data.region) {
      regionId = data.region.id
    }

    setFormOptions(prevValues => ({
      regionOptions: prevValues.regionOptions !== regionOptions ? regionOptions : prevValues.regionOptions
    }))

    if (data) {
      ownerId = data.owner.id
    } else if (owner) {
      ownerId = owner.id
    }

    if (data) {
      setValues({
        ...data,
        music: '',
        ownerId,
        photoDownloadPresets: availablePresets,
        propertySiteMediaShowcase: {
          // TODO set proper values when available from the backend
          showPropertyMapOnShowcasePage: false,
          topOfTheShowcasePhoto: ''
        },
        regionId
      })
    } else if (owner) {
      setValues(prevValues => ({
        ...prevValues,
        ownerId,
        photoDownloadPresets: availablePresets,
        regionId
      }))
    }
  }, [owner, data])

  return [values, formOptions]
}

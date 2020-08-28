import * as GraphqlTypes from '#veewme/gen/graphqlTypes'
import * as PrismaTypes from '#veewme/gen/prisma'
import { hashPassword } from '#veewme/helpers/password'
import { saveFileToStorage } from '#veewme/lib/storage'

export const convertToPhotoPresetUpdateWithWhereUniqueWithoutOwnerInput
: (medium: GraphqlTypes.PhotoPresetInput) => PrismaTypes.PhotoPresetUpdateWithWhereUniqueWithoutOwnerInput = medium => {
  const { id, ...data } = medium
  return {
    data,
    where: { id }
  }
}

export const convertToPhotoPresetUpdateManyInput
: (affiliateId: GraphqlTypes.Scalars['Int'], media?: GraphqlTypes.AffiliateUpdateInput['mediaExports'] | null)
=> Promise<PrismaTypes.PhotoPresetUpdateManyWithoutOwnerInput> = async (affiliateId, media) => {
  const currentMediaExports = await PrismaTypes.prisma.photoPresets({ where: { owner: { id: affiliateId } } })

  if (media) {
    const mediaExportsToDelete = currentMediaExports && currentMediaExports.reduce(
      (toDelete: PrismaTypes.PhotoPresetScalarWhereInput[], currentMedium: PrismaTypes.PhotoPreset)
      : PrismaTypes.PhotoPresetScalarWhereInput[] => {
        if (!media.some(medium => medium.id === currentMedium.id)) {
          toDelete.push({ id: currentMedium.id })
        }
        return toDelete
      }, []
    )
    return {
      create: media.filter(medium => !medium.hasOwnProperty('id')),
      deleteMany: mediaExportsToDelete,
      update: media.filter(medium => medium.hasOwnProperty('id')).map(convertToPhotoPresetUpdateWithWhereUniqueWithoutOwnerInput)
    }
  }
  return {}
}

export function convertToRegionUpdateManyInput (regions?: GraphqlTypes.RegionUpdateInput[] | null)
: PrismaTypes.Maybe<PrismaTypes.RegionUpdateManyInput> {
  if (regions) {
    const updateInput = {
      delete: regions.filter(region => region.delete).map(region => ({ id: region.id })),
      upsert: regions.map(region => {
        const { id, label } = region
        return {
          create: { label },
          update: { label },
          where: { id }
        }
      })
    }
    return updateInput
  }
  return
}

export async function convertToPrismaAffiliateUpdateInput (affiliateInput: GraphqlTypes.AffiliateUpdateInput, affiliateId: GraphqlTypes.Scalars['Int'])
: Promise<PrismaTypes.AffiliateUpdateInput> {
  let password
  try {
    // TODO: Change after pass generating will be ready
    password = affiliateInput.user && affiliateInput.user.password && hashPassword(affiliateInput.user.password)
  } catch (error) {
    return error
  }
  // TODO handle featuredPropertySites connecting and disconnecting
  const updateVariables: PrismaTypes.AffiliateUpdateInput = {
    ...affiliateInput,
    areasCovered: affiliateInput.areasCovered,
    defaultColorScheme: { update: affiliateInput.defaultColorScheme },
    description: { update: affiliateInput.description },
    featuredPropertySites: affiliateInput.featuredPropertySites && { connect: affiliateInput.featuredPropertySites.map(id => ({ id })) },
    mediaExports: await convertToPhotoPresetUpdateManyInput(affiliateId, affiliateInput.mediaExports),
    permissionsAndSettings: { update: affiliateInput.permissionsAndSettings },
    regions: convertToRegionUpdateManyInput(affiliateInput.regions),
    status: { update: affiliateInput.status },
    tourColor: { update: affiliateInput.tourColor },
    usefulLinks: { update: affiliateInput.usefulLinks },
    user: { update: {
      ...affiliateInput.user,
      password
    }},
    whiteLabel: { update: affiliateInput.whiteLabel }
  }

  return updateVariables
}

export async function convertToAgentCreateInput (input: GraphqlTypes.AgentCreateInput)
: Promise<PrismaTypes.AgentCreateInput> {
  const { regionId, ...agentInput } = input
  let password
  try {
    // TODO: Change after pass generating will be ready
    password = hashPassword(agentInput.user.password || 'password')
  } catch (error) {
    return error
  }
  const affiliate = agentInput.affiliateId ? { connect: { id: agentInput.affiliateId } } : undefined
  agentInput.affiliateId && delete agentInput.affiliateId
  const brokerage = agentInput.brokerageId ? { connect: { id: agentInput.brokerageId } } : undefined
  const brokerageData = agentInput.brokerageId && await PrismaTypes.prisma.brokerage({ id: agentInput.brokerageId })
  agentInput.brokerageId && delete agentInput.brokerageId
  const profilePicture = agentInput.profilePicture && agentInput.profilePicture.file && await saveFileToStorage(agentInput.profilePicture.file)
  return {
    ...agentInput,
    affiliate,
    brokerage,
    companyPay: !!brokerageData && brokerageData.companyPay,
    defaultColorScheme: {
      create: agentInput.defaultColorScheme ? agentInput.defaultColorScheme : { a: 1, b: 62, g: 204, r: 159 }
    },
    orders: { create: [] },
    profilePicture: { create: profilePicture },
    region: regionId ? { connect: { id: regionId } } : undefined,
    user: { create: {
      ...agentInput.user,
      password,
      role: 'AGENT'
    }}
  }
}

export function convertToUpdateEnabledPresetInput (
  updatePreset: PrismaTypes.EnabledPhotoPresetUpdateWithWhereUniqueNestedInput[],
  preset: GraphqlTypes.EnabledPhotoPresetUpdateInput
): PrismaTypes.EnabledPhotoPresetUpdateWithWhereUniqueNestedInput[] {
  updatePreset.push({
    data: {
      downloadTrigger: preset.downloadTrigger,
      enabled: !!preset.enabled
    },
    where: { id: preset.id }
  })
  return updatePreset
}

export function convertToUpsertEnabledPresetInput (
  upsertPreset: PrismaTypes.EnabledPhotoPresetUpsertWithWhereUniqueNestedInput[],
  preset: GraphqlTypes.EnabledPhotoPresetUpdateInput
): PrismaTypes.EnabledPhotoPresetUpsertWithWhereUniqueNestedInput[] {
  if (preset.photoPresetId) {
    upsertPreset.push({
      create: {
        downloadTrigger: preset.downloadTrigger,
        enabled: !!preset.enabled,
        photoPreset: { connect: { id: preset.photoPresetId } }
      },
      update: {
        downloadTrigger: preset.downloadTrigger,
        enabled: !!preset.enabled
      },
      where: { id: preset.id }
    })
  }
  return upsertPreset
}

export function convertToEnabledPhotoPresetCreateInput (enabledPresets?: GraphqlTypes.EnabledPhotoPresetCreateInput[])
: PrismaTypes.EnabledPhotoPresetCreateInput[] {
  return enabledPresets ? enabledPresets.map(preset => {
    return {
      downloadTrigger: preset.downloadTrigger,
      enabled: preset.enabled,
      photoPreset: { connect: { id: preset.photoPresetId } }
    }
  }) : []
}

export function convertToEnabledPhotoPresetCreateManyInput (enabledPresets?: GraphqlTypes.EnabledPhotoPresetCreateInput[])
: PrismaTypes.Maybe<PrismaTypes.EnabledPhotoPresetCreateManyInput> {
  const photoDownloadPresets = convertToEnabledPhotoPresetCreateInput(enabledPresets)
  if (photoDownloadPresets.length > 0) {
    return { create: photoDownloadPresets }
  }
  return
}

export function convertToEnabledPhotoPresetUpdateManyInput (enabledPresets?: GraphqlTypes.EnabledPhotoPresetUpdateInput[] | null)
: PrismaTypes.Maybe<PrismaTypes.EnabledPhotoPresetUpdateManyInput> {
  if (enabledPresets) {
    return {
      update: enabledPresets.reduce(convertToUpdateEnabledPresetInput, []),
      upsert: enabledPresets.reduce(convertToUpsertEnabledPresetInput, [])
    }
  }
  return
}

export function isToggleBrokerageActivityStatusInput (brokerageInput: GraphqlTypes.BrokerageUpdateInput | GraphqlTypes.ToggleActivityStatusInput): brokerageInput is GraphqlTypes.ToggleActivityStatusInput {
  return !!brokerageInput.status
}

export function convertToBrokerageUpdateInput (brokerageInput: GraphqlTypes.BrokerageUpdateInput | GraphqlTypes.ToggleActivityStatusInput): PrismaTypes.BrokerageUpdateInput {
  if (isToggleBrokerageActivityStatusInput(brokerageInput)) {
    return brokerageInput
  } else {
    const { regionId, ...restInput } = brokerageInput
    return {
      ...restInput,
      defaultColorScheme: { update: restInput.defaultColorScheme },
      photoDownloadPresets: convertToEnabledPhotoPresetUpdateManyInput(restInput.photoDownloadPresets),
      region: { connect: { id: regionId } }
    }
  }
}

export function convertToPrismaTourBannerUpdateInput (tourBannerInput: GraphqlTypes.TourBannerUpdateInput)
: PrismaTypes.TourBannerUpdateInput {
  const updateVariables: PrismaTypes.TourBannerUpdateInput = {
    blackText: tourBannerInput.blackText ,
    color: { update: tourBannerInput.color },
    label: tourBannerInput.label
  }

  return updateVariables
}

import { ServiceCategoryIcon, ServiceType } from '#veewme/gen/graphqlTypes'
import { UnreachableCaseError } from '#veewme/lib/error'
import Drone from '#veewme/web/assets/svg/drone.svg'
import FloorPlan from '#veewme/web/assets/svg/floor-plan.svg'
import { Camera, Globe, Video } from 'styled-icons/boxicons-regular'
import { Landscape, PanoramaHorizontal } from 'styled-icons/material'

export const getServiceCategoryIcon = (icon: ServiceCategoryIcon) => {
  switch (icon) {
    case 'Aerial':
      return Drone
    case 'FloorPlan':
      return FloorPlan
    case 'Landscape':
      return Landscape
    case 'Panorama':
      return PanoramaHorizontal
    case 'Photo':
      return Camera
    case 'Video':
      return Video
    case 'Vr3D':
      return Globe
    default: throw new UnreachableCaseError(icon)
  }
}

export const getServiceTypeLabel = (serviceType: ServiceType) => {
  switch (serviceType) {
    case 'AddOn':
      return 'Add On'
    case 'Admin':
      return 'Admin'
    case 'Package':
      return 'Package'
    case 'Primary':
      return 'Primary'
    default:
      throw new UnreachableCaseError(serviceType)
  }
}

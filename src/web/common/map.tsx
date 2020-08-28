import { LatLng } from '#veewme/lib/types'
import * as log from '#veewme/web/common/log'
import * as React from 'react'
import Geocode from 'react-geocode'
import { GoogleMap, Marker, StreetViewPanorama, withGoogleMap, withScriptjs } from 'react-google-maps'

// WIP - TODO streetview

export const GOOGLE_MAP_API_KEY = ''

export interface MapProps {
  center?: LatLng
  zoom?: number
  defaultCenter?: LatLng
  defaultZoom?: number
  streetView?: boolean
  markerPosition: LatLng
  onMarkerDragEnd: (e: google.maps.MouseEvent) => void
  onPositionChanged?: () => void
  onPovChanged?: () => void
}

export const MapWithMarker = withScriptjs(withGoogleMap<MapProps>(props => (
  <GoogleMap
    defaultZoom={props.defaultZoom}
    defaultCenter={props.defaultCenter}
    center={props.center}
    zoom={props.zoom}
  >
    <Marker
      position={props.markerPosition}
      draggable
      onDragEnd={props.onMarkerDragEnd}
    />
    {props.streetView &&
      <StreetViewPanorama
        defaultPosition={props.defaultCenter}
        visible
        onPositionChanged={props.onPositionChanged}
        onPovChanged={props.onPovChanged}
      />
    }
  </GoogleMap>
)))

export const addressToLatLng = async (address: string) => {
  Geocode.setApiKey(GOOGLE_MAP_API_KEY)
  try {
    const response = await Geocode.fromAddress(address)
    const { lat, lng } = response.results[0].geometry.location
    return { lat, lng }
  } catch (error) {
    log.error(error)
    throw new Error(error.message)
  }
}

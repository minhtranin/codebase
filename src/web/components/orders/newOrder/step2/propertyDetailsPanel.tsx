import { Currency, HomeSizeUnit, ListingTypesCategory, LotSizeUnit, PropertyDetails, RentalPeriod } from '#veewme/lib/types'
import { nameof } from '#veewme/lib/util'
import CheckboxField from '#veewme/web/common/formikFields/checkboxField'
import InputField from '#veewme/web/common/formikFields/inputField'
import RadioField from '#veewme/web/common/formikFields/radioInputField'
import SelectField from '#veewme/web/common/formikFields/selectField'
import SwitchField from '#veewme/web/common/formikFields/switchField'
import TextareaField from '#veewme/web/common/formikFields/textareaField'
import Editor from '#veewme/web/common/formikFields/wysiwygEditor'
import InlineHelp from '#veewme/web/common/inlineHelp'
import Panel from '#veewme/web/common/panel'
import styled from '#veewme/web/common/styled-components'
import { Field } from 'formik'
import * as React from 'react'
import { FormValues } from '../newOrderForm'
import { StyledBold, StyledHelpWrapper } from '../styled'

const priceHelpText = `Consequat dolore dolor proident anim dolor deserunt esse irure voluptate. \nConsectetur qui do pariatur culpa deserunt est adipisicing id voluptate. \nAliqua ullamco do exercitation aliquip pariatur. \nDo et pariatur dolor anim eu proident irure in minim cupidatat qui qui nostrud est. \nSunt non dolore fugiat qui qui labore ipsum consequat esse sint qui nostrud.`
const propertyHeadlineHelpText = `Consequat dolore dolor proident anim dolor deserunt esse irure voluptate. \nConsectetur qui do pariatur culpa deserunt est adipisicing id voluptate. \nAliqua ullamco do exercitation aliquip pariatur. \nDo et pariatur dolor anim eu proident irure in minim cupidatat qui qui nostrud est. \nSunt non dolore fugiat qui qui labore ipsum consequat esse sint qui nostrud.`
const propertyDescriptionHelpText = `Consequat dolore dolor proident anim dolor deserunt esse irure voluptate. \nConsectetur qui do pariatur culpa deserunt est adipisicing id voluptate. \nAliqua ullamco do exercitation aliquip pariatur. \nDo et pariatur dolor anim eu proident irure in minim cupidatat qui qui nostrud est. \nSunt non dolore fugiat qui qui labore ipsum consequat esse sint qui nostrud.`
const propertyShortDescriptionHelpText = `Consequat dolore dolor proident anim dolor deserunt esse irure voluptate. \nConsectetur qui do pariatur culpa deserunt est adipisicing id voluptate. \nAliqua ullamco do exercitation aliquip pariatur. \nDo et pariatur dolor anim eu proident irure in minim cupidatat qui qui nostrud est. \nSunt non dolore fugiat qui qui labore ipsum consequat esse sint qui nostrud.`

const StyledSwitch = styled(SwitchField)`
  margin-bottom: 5px;
`

const StyledPanel = styled(Panel) `
  input {
    max-width: 100%;

    &[type='number'] {
      -moz-appearance:textfield;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
  }
`

const StyledRentalWrapper = styled.div `
  display: flex;
  justify-content: space-between;
  padding-bottom: 30px;
  border-bottom: 2px solid ${props => props.theme.colors.BORDER};
`

const StyledRentalPeriodWrapper = styled.div `
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  & > div {
    margin: unset;
  }
  & > :nth-child(2) {
    margin: 0 50px;
  }
`

const StyledGrid = styled.div `
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  margin-top: 20px;
  align-items: end;
  & input {width: 100%;}
  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_XL}) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const StyledSizeUnitWrapper = styled.div `
  justify-self: start;
`

const StyledPropertyHeadlineWrapper = styled.div `
  grid-column: 1 / span 3;
  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_XL}) {
    grid-column: 1 / span 2;
  }
`

const StyledEditorWrapper = styled.div `
  grid-column: 1 / span 4;
  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_XL}) {
    grid-column: 1 / span 2;
  }
`

const StyledWysiwygHelpWrapper = styled(StyledHelpWrapper) `
  flex: 1;
  justify-content: flex-end;
`

const StyledUnitSelectField = styled(SelectField) `
  & > div {
    width: 120px;
  }
`

type Screen = 'small' | 'large'

const StyledEmptyCell = styled.div<{ screen: Screen }> `
  display: ${props => props.screen === 'large' ? 'block' : 'none'};
  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_XL}) {
    display: ${props => props.screen === 'small' ? 'block' : 'none'};
  }
`

interface PropertyDetailsPanelProps {
  listingTypesCategories: ListingTypesCategory[]
  currencies: Currency[]
}

const PropertyDetailsPanel: React.FunctionComponent<PropertyDetailsPanelProps> = props => {
  const getListingTypeOptions = () => (
    props.listingTypesCategories.map(category => ({
      label: category.name,
      options: category.listingTypes.map(listingType => ({
        label: listingType,
        value: listingType
      }))
    }))
  )

  const getCurrencyOptions = () => (
    props.currencies.map(currency => ({
      label: currency.id + ' - ' + currency.name,
      value: currency.id
    }))
  )

  const get0to20Options = () => (
    [...Array(21).keys()].map(i => ({
      label: i,
      value: i
    }))
  )

  const getHomeSizeUnitOptions = () => {
    const options = []
    for (const key in HomeSizeUnit) {
      if (HomeSizeUnit.hasOwnProperty(key)) {
        options.push({
          label: HomeSizeUnit[key],
          value: key
        })
      }
    }
    return options
  }

  const getLotSizeUnitOptions = () => {
    const options = []
    for (const key in LotSizeUnit) {
      if (LotSizeUnit.hasOwnProperty(key)) {
        options.push({
          label: LotSizeUnit[key],
          value: key
        })
      }
    }
    return options
  }

  return (
    <StyledPanel
      heading='Property Details'
      toggleable
      collapsed
    >
      <StyledRentalWrapper>
        <div>
          <Field
            name={`${nameof<FormValues>('propertyDetails')}.${nameof<PropertyDetails>('rental')}`}
            component={StyledSwitch}
            label={<><p><StyledBold>Rental</StyledBold></p><p>Select if you want to rent this property</p></>}
          />
        </div>
        <StyledRentalPeriodWrapper>
          <Field
            name={`${nameof<FormValues>('propertyDetails')}.${nameof<PropertyDetails>('rentalPeriod')}`}
            labelPosition='bottom'
            value={RentalPeriod.Month}
            component={RadioField}
            label='Month'
          />
          <Field
            name={`${nameof<FormValues>('propertyDetails')}.${nameof<PropertyDetails>('rentalPeriod')}`}
            labelPosition='bottom'
            value={RentalPeriod.Week}
            component={RadioField}
            label='Week'
          />
          <Field
            name={`${nameof<FormValues>('propertyDetails')}.${nameof<PropertyDetails>('rentalPeriod')}`}
            labelPosition='bottom'
            value={RentalPeriod.Day}
            component={RadioField}
            label='Day'
          />
        </StyledRentalPeriodWrapper>
      </StyledRentalWrapper>
      <StyledGrid>
        <Field
          name={`${nameof<FormValues>('propertyDetails')}.${nameof<PropertyDetails>('listingType')}`}
          component={SelectField}
          label='Listing Type:'
          options={getListingTypeOptions()}
        />
        <StyledEmptyCell screen='small'/>
        <Field
          name={`${nameof<FormValues>('propertyDetails')}.${nameof<PropertyDetails>('price')}`}
          component={InputField}
          rightComponent={
            <StyledHelpWrapper>
              <InlineHelp
                text={priceHelpText}
              />
            </StyledHelpWrapper>
          }
          type='number'
          label='Price:'
        />
        <Field
          name={`${nameof<FormValues>('propertyDetails')}.${nameof<PropertyDetails>('currency')}`}
          component={SelectField}
          label='Currency:'
          options={getCurrencyOptions()}
        />
        <Field
          name={`${nameof<FormValues>('propertyDetails')}.${nameof<PropertyDetails>('bedrooms')}`}
          component={SelectField}
          label='Bedrooms:'
          options={get0to20Options()}
        />
        <Field
          name={`${nameof<FormValues>('propertyDetails')}.${nameof<PropertyDetails>('fullBathrooms')}`}
          component={SelectField}
          label='Full Bathrooms:'
          options={get0to20Options()}
        />
        <Field
          name={`${nameof<FormValues>('propertyDetails')}.${nameof<PropertyDetails>('halfBathrooms')}`}
          component={SelectField}
          label='Half Bathrooms:'
          options={get0to20Options()}
        />
        <Field
          name={`${nameof<FormValues>('propertyDetails')}.${nameof<PropertyDetails>('garages')}`}
          component={SelectField}
          label='Garages:'
          options={get0to20Options()}
        />
        <Field
          name={`${nameof<FormValues>('propertyDetails')}.${nameof<PropertyDetails>('parkingSpaces')}`}
          component={InputField}
          type='number'
          label='Parking Spaces:'
        />
        <Field
          name={`${nameof<FormValues>('propertyDetails')}.${nameof<PropertyDetails>('yearBuilt')}`}
          component={InputField}
          type='number'
          label='Year Built:'
        />
        <Field
          name={`${nameof<FormValues>('propertyDetails')}.${nameof<PropertyDetails>('primaryMLS')}`}
          component={InputField}
          type='number'
          label='MLS Number (Primary):'
        />
        <Field
          name={`${nameof<FormValues>('propertyDetails')}.${nameof<PropertyDetails>('secondaryMLS')}`}
          component={InputField}
          type='number'
          label='MLS Number (Secondary):'
        />
        <StyledEmptyCell screen='large'/>
        <Field
          name={`${nameof<FormValues>('propertyDetails')}.${nameof<PropertyDetails>('homeSize')}`}
          component={InputField}
          type='number'
          label='Home Size:'
        />
        <StyledSizeUnitWrapper>
          <Field
            name={`${nameof<FormValues>('propertyDetails')}.${nameof<PropertyDetails>('homeSizeUnit')}`}
            component={StyledUnitSelectField}
            options={getHomeSizeUnitOptions()}
            compactMode={false}
          />
        </StyledSizeUnitWrapper>
        <Field
          name={`${nameof<FormValues>('propertyDetails')}.${nameof<PropertyDetails>('lotSize')}`}
          component={InputField}
          type='number'
          label='Lot Size:'
        />
        <StyledSizeUnitWrapper>
          <Field
            name={`${nameof<FormValues>('propertyDetails')}.${nameof<PropertyDetails>('lotSizeUnit')}`}
            component={StyledUnitSelectField}
            options={getLotSizeUnitOptions()}
            compactMode={false}
          />
        </StyledSizeUnitWrapper>
        <StyledPropertyHeadlineWrapper>
          <Field
            name={`${nameof<FormValues>('propertyDetails')}.${nameof<PropertyDetails>('propertyHeadline')}`}
            component={InputField}
            label='Property Headline:'
            rightComponent={
              <StyledHelpWrapper>
                <InlineHelp
                  text={propertyHeadlineHelpText}
                />
              </StyledHelpWrapper>
            }
          />
        </StyledPropertyHeadlineWrapper>
        <Field
          name={`${nameof<FormValues>('propertyDetails')}.${nameof<PropertyDetails>('hideHeadline')}`}
          component={CheckboxField}
          label='Hide headline:'
          compactMode={false}
        />
        <StyledEditorWrapper>
          <Field
            name={`${nameof<FormValues>('propertyDetails')}.${nameof<PropertyDetails>('propertyDescription')}`}
            placeholder='Some description here...'
            component={Editor}
            label='Property Description:'
            toolbarCustomButtons={[
              <StyledWysiwygHelpWrapper key={0}>
                <InlineHelp
                  text={propertyDescriptionHelpText}
                />
              </StyledWysiwygHelpWrapper>
            ]}
          />
        </StyledEditorWrapper>
        <StyledEditorWrapper>
          <Field
            name={`${nameof<FormValues>('propertyDetails')}.${nameof<PropertyDetails>('shortPropertyDescription')}`}
            placeholder='Some description here...'
            component={TextareaField}
            label='Short Description (Brochure & Social Media Use):'
            labelBarComponent={
              <StyledHelpWrapper>
                <InlineHelp text={propertyShortDescriptionHelpText}/>
              </StyledHelpWrapper>
            }
            labelBarComponentPosition='right'
          />
        </StyledEditorWrapper>
      </StyledGrid>
    </StyledPanel>
  )
}

export default PropertyDetailsPanel

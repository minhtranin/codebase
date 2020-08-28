import { Service, ServicesComponent } from '#veewme/graphql/types'
import * as React from 'react'
import Form from './form'

const NewPromoCode: React.FunctionComponent = () => (
  // <CreateService.Component>
  //   {(createService, { data: createServiceData }) => (
  //     <>
  //       {createServiceData && `Created service ${createServiceData.createService.name}`}
  //       {!createServiceData &&
          <ServicesComponent>
            {({ data: servicesQueryData, loading }) => (
              <>
                {loading && <div>Loading...</div>}
                {!loading &&
                  <Form
                    // onSubmit={promoCode => {
                    //   createService({ variables: promoCode }).catch() // TODO error handling
                    // }}
                    services={servicesQueryData && servicesQueryData.services as Service[] || []} // TODO remove cast
                  />
                }
              </>
            )}
          </ServicesComponent>
  //       }
  //     </>
  //   )}
  // </CreateService.Component>
)

export default NewPromoCode

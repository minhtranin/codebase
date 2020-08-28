/* tslint:disable:no-console */

import { prisma } from '#veewme/gen/prisma'
import { Admin, Affiliate, Agent, Developer, MutationResolvers, Photographer, Processor, QueryResolvers, Resolvers, Role, User } from '#veewme/graphql/types'
import { sendWelcomeEmail } from '#veewme/helpers/email'
import { comparePassword, hashPassword } from '#veewme/helpers/password'
import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import { Application, Request } from 'express'
import { ExecutionResult } from 'graphql'
import { forwardTo } from 'graphql-binding'
import { importSchema } from 'graphql-import'
import { applyMiddleware } from 'graphql-middleware'
import { makeExecutableSchema } from 'graphql-tools'
import { GraphQLUpload } from 'graphql-upload'
import { Prisma as PrismaBinding } from 'prisma-binding'
import { FileUpload, getPublicUrl, saveFileToStorage, unlink } from '../lib/storage'
import { mocks } from './mocks'
import * as converter from './typeConverter'

import { checkCname } from '../helpers/dns'
import { CnameStatus } from '../lib/types'

interface Context {
  accountId?: Admin['id'] | Affiliate['id'] | Agent['id'] | Developer['id'] | Photographer['id'] | Processor['id']
  prismaBinding: PrismaBinding
  request: Request
  role?: User['role']
  userId?: User['id']
}

// make resolver functions required so a type checker can spot missing ones
interface ResolversRequired extends Resolvers<Context> {
  Mutation: Required<MutationResolvers<Context>>
  Query: Required<QueryResolvers<Context>>
}

const accountQueries: {[key in Role]: { list: keyof QueryResolvers, item: keyof QueryResolvers }} = {
  ADMIN: { item: 'admin', list: 'admins' },
  AFFILIATE: { item: 'affiliate', list: 'affiliates' },
  AGENT: { item: 'agent', list: 'agents' },
  DEVELOPER: { item: 'developer', list: 'developers' },
  PHOTOGRAPHER: { item: 'photographer', list: 'photographers' },
  PROCESSOR: { item: 'processor', list: 'processors' }
}

export class GraphQLServer {
  prismaBinding = new PrismaBinding({
    debug: !!process.env.PRISMA_DEBUG,
    endpoint: `http://${process.env.PRISMA_HOST}:4466/veewme/${process.env.PRISMA_STAGE}`,
    secret: process.env.PRISMA_SECRET,
    typeDefs: './build/gen/prisma/prisma.graphql'
  })

  resolvers: ResolversRequired = {
    Account: {
      accountId: (parent, args, context) => {
        if (!context.accountId) {
          throw new Error('Not logged in') // TODO proper error handling
        }
        return context.accountId
      },
      firstName: async (parent, args, context, info) => {
        if (!context.userId) {
          throw new Error('Not logged in') // TODO proper error handling
        }
        const user = await this.prismaBinding.query.user({ where: { id: context.userId } })
        return user.firstName
      },
      lastName: async (parent, args, context, info) => {
        if (!context.userId) {
          throw new Error('Not logged in') // TODO proper error handling
        }
        const user = await this.prismaBinding.query.user({ where: { id: context.userId } })
        return user.lastName
      },
      role: (parent, args, context) => {
        if (!context.role) {
          throw new Error('Not logged in') // TODO proper error handling
        }
        return context.role
      }
    },
    Affiliate: {
      agents: parent => prisma.affiliate({ id: parent.id }).agents() || [],
      brokerages: parent => prisma.affiliate({ id: parent.id }).brokerages() || [],
      defaultColorScheme: parent => prisma.affiliate({ id: parent.id }).defaultColorScheme(),
      featuredPropertySites: parent => prisma.affiliate({ id: parent.id }).featuredPropertySites(),
      mediaExports: parent => prisma.affiliate({ id: parent.id }).mediaExports(),
      permissionsAndSettings: parent => prisma.affiliate({ id: parent.id }).permissionsAndSettings(),
      processors: parent => prisma.affiliate({ id: parent.id }).processors() || [],
      regions: parent => prisma.affiliate({ id: parent.id }).regions(),
      tourColor: parent => prisma.affiliate({ id: parent.id }).tourColor(),
      usefulLinks: parent => prisma.affiliate({ id: parent.id }).usefulLinks(),
      user: parent => prisma.affiliate({ id: parent.id }).user(),
      whiteLabel: parent => prisma.affiliate({ id: parent.id }).whiteLabel()
    },
    Agent: {
      affiliate: parent => prisma.agent({ id: parent.id }).affiliate(),
      brokerage: parent => prisma.agent({ id: parent.id }).brokerage(),
      defaultColorScheme: parent => prisma.agent({ id: parent.id }).defaultColorScheme(),
      orders: parent => prisma.agent({ id: parent.id }).orders(),
      profilePicture: parent => prisma.agent({ id: parent.id }).profilePicture(),
      user: parent => prisma.agent({ id: parent.id }).user()
    },
    Brokerage: {
      agents: parent => prisma.brokerage({ id: parent.id }).agents() || [],
      offices: parent => prisma.brokerage({ id: parent.id }).offices() || []
    },
    File: {
      path: async parent => {
        const file = await prisma.file({ id: parent.id })
        return file ? getPublicUrl(file) : ''
      }
    },
    Mutation: {
      addDemoImages: async (obj, args, context, info) => {
        const { data, where } = args
        const newImages = data && data.images && data.images.filter(image => !image.id)
        const creatableImages = await Promise.all(newImages.map(image => saveFileToStorage(image.file)))
        const modifiedImages = data && data.images && data.images.filter(image => !!image.id && !!image.file)
        const filesToDeleteWhereInput = { AND: modifiedImages.map(({ id }) => ({ id })) }
        const filesToDelete = await prisma.files({ where: filesToDeleteWhereInput })
        const updateableImages = await Promise.all(modifiedImages.map(async image => ({
          data: await saveFileToStorage(image.file),
          where: { id: image.id }
        })))
        filesToDelete.forEach(({ path }) => { unlink(path) })
        const newCropImages = data && data.cropImages && data.cropImages.filter(image => !image.id)
        const creatableCropImages = await Promise.all(newCropImages.map(image => saveFileToStorage(image.file)))
        const addDemoImages = await prisma.updateDemoImages({
          data: {
            cropImages: {
              create: creatableCropImages
            },
            images: {
              create: creatableImages,
              updateMany: updateableImages
            }
          },
          where
        })
        return addDemoImages
      },
      checkWhiteLabel: async (obj, { data }) => {
        const { id, cname } = data
        const MAIN_DOMAIN = 'veewme.com'

        const status = await checkCname(cname, MAIN_DOMAIN)
        if (status === CnameStatus.SUCCESS) {
          await prisma.updateWhiteLabel({
            data: {
              customDomain: cname,
              enabled: true
            },
            where: {
              id
            }
          })
        }

        return status
      },
      createAffiliate: async (obj, args, context, info) => {
        const data = args.data
        let password
        try {
          password = hashPassword(data.user.password)
        } catch (error) {
          return error
        }
        const af = await prisma.createAffiliate({
          ...data,
          agents: { create: [] },
          brokerages: { create: [] },
          defaultColorScheme: { create: { b: 62 , g: 204 , r: 159 } },
          featuredPropertySites: { create: [] },
          mediaExports: { create: [] },
          orders: { create: [] },
          permissionsAndSettings: { create: {
            allowClientBillingAccess: true,
            allowClientMediaUpload: true,
            allowClientOrders: false,
            orderConfirmationEmailRider: false,
            sendWelcomeEmailsToNewClients: true
          }},
          processors: { create: [] },
          regions: { create: [{ label: 'Default Region' }] },
          status: { create: {
            activityStatus: 'SUSPENDED',
            confirmed: false,
            type: 'BASIC'
          }},
          tourColor: { create: { b: 204 , g: 100 , r: 9 } },
          usefulLinks: { create: {
            loginLink: '',
            propertySiteLink: '',
            signupLink: ''
          } },
          user: { create: {
            ...data.user,
            password,
            role: 'AFFILIATE'
          }},
          whiteLabel: { create: {
            customDomain: '',
            enabled: false
          }}
        })

        try {
          const result = await sendWelcomeEmail(data.user.email, `${data.user.firstName}`)
          if (result) {
            console.log('Welcome email sent', result)
          }
        } catch (_) {
          console.error('Cannot send welcome email, error:', _)
        }

        return af
      },
      createAgent: async (obj, { data }, context, info) => {
        const agent = await prisma.createAgent(await converter.convertToAgentCreateInput(data))
        return agent
      },
      createBrokerage: async (obj, args, context, info) => {
        const { regionId, ...data } = args.data
        const brokerage = await prisma.createBrokerage({
          ...data,
          agents: { create: [] },
          defaultColorScheme: { create: data.defaultColorScheme },
          offices: { create: [] },
          owner: { connect: { id: data.owner } },
          photoDownloadPresets: converter.convertToEnabledPhotoPresetCreateManyInput(data.photoDownloadPresets),
          region: { connect: { id: regionId } }
        })
        return brokerage
      },
      createDemoThing: forwardTo('prismaBinding'),
      createOffice: async (obj, args, context, info) => {
        const { data } = args
        const brokerage = { connect: { id: data.brokerageId } }
        delete data.brokerageId
        const owner = { connect: { id: data.ownerId } }
        delete data.ownerId
        const region = { connect: { id: data.regionId } }
        delete data.regionId
        const office = await prisma.createOffice({
          ...data,
          brokerage,
          owner,
          photoDownloadPresets: converter.convertToEnabledPhotoPresetCreateManyInput(data.photoDownloadPresets),
          region
        })
        return office
      },
      createProcessor: async (obj, { data }, context) => {
        const { affiliateId, regionId, user, ...processorData } = data

        let password
        try {
          // TODO: Change after pass generating will be ready
          password = hashPassword(user.password || 'password')
        } catch (error) {
          return error
        }

        if (context.accountId && context.role === 'AFFILIATE') {
          const processor = await prisma.createProcessor({
            ...processorData,
            affiliateId: {
              connect: { id: context.accountId }
            },
            regionId: { connect: { id: regionId } },
            user: {
              create: {
                ...user,
                password,
                role: 'PROCESSOR'
              }
            }
          })
          return processor
        }
        throw new AuthenticationError(context.accountId ? 'Only Affiliate can do this mutation.' : 'User should be logged in.')
      },
      createService: forwardTo('prismaBinding'),
      createTourBanner: async (obj, { data }, context, info) => {
        const tb = await prisma.createTourBanner({
          blackText: data.blackText,
          color: { create: {
            a: data.color.a,
            b: data.color.b,
            g: data.color.g,
            r: data.color.r
          }},
          label: data.label
        })
        return tb
      },
      deleteAffiliate: forwardTo('prismaBinding'),
      deleteAgent: forwardTo('prismaBinding'),
      deleteBrokerage: forwardTo('prismaBinding'),
      deleteOffice: forwardTo('prismaBinding'),
      deleteProcessor: forwardTo('prismaBinding'),
      deleteTourBanner: forwardTo('prismaBinding'),
      demoUpload: async (obj, { data }: { data: FileUpload }, context, info) => {
        const storedFile = await saveFileToStorage(data)
        const file = await prisma.createFile(storedFile)
        return getPublicUrl(file)
      },
      generateFauxVideo: async (obj, { data: { title } }, context, info) => {
        const video = await prisma.createVideo({
          status: 'INITIAL',
          title,
          type: 'FAUX'
        })
        return video
      },
      logIn: async (obj, { data }, context, info) => {
        const user = await prisma.user({ email: data.email })

        if (!user || comparePassword(user.password, data.password)) {
          throw new AuthenticationError('Bad credentials')
        }

        const accounts = await this.prismaBinding.query[accountQueries[user.role].list]({ where: { user: { email: data.email } } })

        if (context.request.session) {
          context.request.session.accountId = accounts[0].id
          context.request.session.role = user.role
          context.request.session.userId = user.id
        }

        return user
      },
      logOut: (obj, args, context) => {
        if (context.request.session) {
          context.request.session = undefined
        }

        return true
      },
      signUp: async (obj, { data }, context) => {
        const user = await prisma.createUser({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          password: data.password, // TODO hash it!
          role: data.role
        })

        // TODO: Email sending operation should be here, unless there are clarifications.
        // await sendWelcomeEmail(data.email, `${data.firstName}`)

        return user
      },
      signupAgent: async (obj, { data }, context) => {
        const agent = await prisma.createAgent(await converter.convertToAgentCreateInput(data))
        return agent
      },
      toggleBrokerageAcitivityStatus: async (obj, args, context, info) => {
        const brokerage = await prisma.updateBrokerage({
          data: args.data,
          where: { id: args.where }
        })
        return brokerage
      },
      updateAffiliate: async (obj, args, context, info) => {
        const af = await prisma.updateAffiliate({
          data: await converter.convertToPrismaAffiliateUpdateInput(args.data, args.where.id),
          where: args.where
        })

        return af
      },
      updateAgent: async (obj, args, context, info) => {
        const { where, data: { affiliateId, brokerageId, regionId, ...data } } = args
        const connectedAffiliate = await prisma.agent(where).affiliate()
        const connectedBrokerage = await prisma.agent(where).brokerage()
        const connectedProfilePicture = await prisma.agent(where).profilePicture()
        const connectedRegion = await prisma.agent(where).region()
        let affiliate, brokerage, companyPay, profilePicture, region
        if (affiliateId === undefined && connectedAffiliate && connectedAffiliate.id) {
          affiliate = { disconnect: true }
        } else if (affiliateId && (!connectedAffiliate || (connectedAffiliate && connectedAffiliate.id !== affiliateId))) {
          affiliate = { connect: { id: affiliateId } }
        }
        if (brokerageId === undefined && connectedBrokerage && connectedBrokerage.id) {
          brokerage = { disconnect: true }
        } else if (brokerageId && (!connectedBrokerage || (connectedBrokerage && connectedBrokerage.id !== brokerageId))) {
          brokerage = { connect: { id: brokerageId } }
          const updatedBrokerage = await prisma.brokerage({ id: brokerageId })
          companyPay = updatedBrokerage && updatedBrokerage.companyPay
        } else if (connectedBrokerage && connectedBrokerage.id) {
          companyPay = connectedBrokerage.companyPay
        }
        const profilePictureExists = !!((data && data.profilePicture) || connectedProfilePicture)
        const newProfilePictureFileFromUpload = data && data.profilePicture && data.profilePicture.file
        const oldProfilePictureFileWasUploaded = !!(data && data.profilePicture && (data.profilePicture.id || data.profilePicture.path))
        if (profilePictureExists) {
          const newProfilePicture = newProfilePictureFileFromUpload && await saveFileToStorage(data.profilePicture.file)
          if ((newProfilePictureFileFromUpload || !oldProfilePictureFileWasUploaded) && connectedProfilePicture) {
            unlink(connectedProfilePicture.path)
          }
          profilePicture = {
            create: !connectedProfilePicture && newProfilePicture ? newProfilePicture : undefined,
            delete: connectedProfilePicture && !newProfilePicture && !oldProfilePictureFileWasUploaded,
            update: connectedProfilePicture && newProfilePicture
          }
        }
        if (regionId && (!connectedRegion || (connectedRegion && connectedRegion.id !== regionId))) {
          region = { connect: { id: regionId } }
        }
        let password
        try {
          // TODO: Change after pass generating will be ready
          password = data.user && data.user.password && hashPassword(data.user.password)
        } catch (error) {
          return error
        }

        const agent = await prisma.updateAgent({
          data: {
            ...data,
            affiliate,
            brokerage,
            companyPay,
            defaultColorScheme: { update: data.defaultColorScheme },
            profilePicture,
            region,
            user: { update: {
              ...data.user,
              password
            }}
          },
          where
        })
        return agent
      },
      updateBrokerage: async (obj, args, context, info) => {
        const agentsConnectedWithBrokerage = await prisma.agents({ where: { brokerage: { id: args.where } } })
        const brokerage = await prisma.updateBrokerage({
          data: {
            ...converter.convertToBrokerageUpdateInput(args.data),
            agents: agentsConnectedWithBrokerage && { updateMany: agentsConnectedWithBrokerage.map(({ id }) => ({
              data: { companyPay: args.data.companyPay },
              where: { id }
            }))}
          },
          where: { id: args.where }
        })
        return brokerage
      },
      updateOffice: async (obj, args, context, info) => {
        const { data: { brokerageId, ownerId, regionId, ...data }, where } = args
        const connectedBrokerage = await prisma.office(where).brokerage()
        const connectedOwner = await prisma.office(where).owner()
        const connectedRegion = await prisma.office(where).region()
        let brokerage, owner, region
        if (brokerageId && (!connectedBrokerage || (connectedBrokerage && connectedBrokerage.id !== brokerageId))) {
          brokerage = { connect: { id: brokerageId } }
        }
        if (ownerId && (!connectedOwner || (connectedOwner && connectedOwner.id !== ownerId))) {
          owner = { connect: { id: ownerId } }
        }
        if (!regionId && connectedRegion && connectedRegion.id && connectedOwner && connectedOwner.id) {
          const availableRegions = await prisma.affiliate({ id: connectedOwner.id }).regions()
          if (availableRegions.length > 0) {
            region = { connect: { id: availableRegions[0].id } }
          } else {
            throw new Error('There\'s no regions connected with Office\'s owner.') // TODO proper error handling
          }
        } else if (regionId && (!connectedRegion || (connectedRegion && connectedRegion.id !== regionId))) {
          region = { connect: { id: regionId } }
        }
        const office = await prisma.updateOffice({
          data: {
            ...data,
            brokerage,
            owner,
            photoDownloadPresets: converter.convertToEnabledPhotoPresetUpdateManyInput(data.photoDownloadPresets),
            region
          },
          where
        })
        return office
      },
      updateProcessor: async (obj, args, context, info) => {
        const { where, data } = args
        let regionId
        if (data && data.regionId) {
          regionId = { connect: { id: data.regionId } }
        }
        let password
        try {
          // TODO: Change after pass generating will be ready
          password = data.user && data.user.password && hashPassword(data.user.password)
        } catch (error) {
          return error
        }

        const processor = await prisma.updateProcessor({
          data: {
            ...data,
            affiliateId: data && !!data.affiliateId ? { connect: { id: data.affiliateId } } : undefined,
            regionId,
            user: data.user && { update: {
              ...data.user,
              password
            }}
          },
          where
        })
        return processor
      },
      updateTourBanner: async (obj, args, context, info) => {
        const tb = await prisma.updateTourBanner({
          data: converter.convertToPrismaTourBannerUpdateInput(args.data),
          where: args.where
        })

        return tb
      }
    },
    Photographer: {
      region: parent => prisma.photographer({ id: parent.id }).region(),
      regionId: async parent => {
        const region = await prisma.photographer({ id: parent.id }).region()
        return region.id
      },
      user: parent => prisma.photographer({ id: parent.id }).user()
    },
    Processor: {
      affiliate: parent => prisma.processor({ id: parent.id }).affiliateId(),
      affiliateId: async parent => {
        const aff = await prisma.processor({ id: parent.id }).affiliateId()
        return aff.id
      },
      region: parent => prisma.processor({ id: parent.id }).regionId(),
      regionId: async parent => {
        const region = await prisma.processor({ id: parent.id }).regionId()
        return region.id
      },
      user: parent => prisma.processor({ id: parent.id }).user()
    },
    Query: {
      admin: forwardTo('prismaBinding'),
      admins: forwardTo('prismaBinding'),
      affiliate: async (obj, args, context, info) => {
        const affiliate = await this.prismaBinding.query.affiliate({ where: args.where })
        return affiliate
      },
      affiliates: forwardTo('prismaBinding'),
      agent: async (obj, args, context, info) => {
        const agent = await this.prismaBinding.query.agent({ where: args.where }, info)
        return agent
      },
      agents: async (obj, args, context, info) => {
        if (!context) {
          throw new Error('Not logged in') // TODO proper error handling
        }
        const affiliateLoggedInId = context && context.role === 'AFFILIATE' && context.accountId
        const affiliatePassedId = args.where && args.where.affiliate && args.where.affiliate.id
        const agents = await this.prismaBinding.query.agents({
          where: {
            ...args.where,
            affiliate: args.where ? {
              ...args.where.affiliate,
              id: affiliateLoggedInId || affiliatePassedId
            } : { id: affiliateLoggedInId }
          }
        }, info)
        return agents
      },
      brokerage: forwardTo('prismaBinding'),
      brokerages: (obj, args, context, info) => {
        if (!context.accountId && !args.where) {
          throw new Error('No fetch data provided') // TODO proper error handling
        }
        const ownerLoggedInId = context.role === 'AFFILIATE' && context.accountId
        const ownerPassedId = args.where && args.where.owner && args.where.owner.id
        return this.prismaBinding.query.brokerages({
          where: {
            ...args.where,
            owner: args.where ? {
              ...args.where.owner,
              id: ownerLoggedInId || ownerPassedId
            } : { id: ownerLoggedInId }
          }
        }, info)
      },
      demoImages: forwardTo('prismaBinding'),
      demoThings: forwardTo('prismaBinding'),
      developer: forwardTo('prismaBinding'),
      developers: forwardTo('prismaBinding'),
      me: async (obj, args, context, info) => {
        if (!context.accountId || !context.role) {
          throw new Error('Not logged in') // TODO proper error handling
        }
        const account = await this.prismaBinding.query[accountQueries[context.role].item]({ where: { id: context.accountId } }, info)
        return {
          accountId: account.id,
          ...account.user
        }
      },
      office: forwardTo('prismaBinding'),
      offices: forwardTo('prismaBinding'),
      orders: forwardTo('prismaBinding'),
      pendingOrders: forwardTo('prismaBinding'),
      photographer: forwardTo('prismaBinding'),
      photographers: forwardTo('prismaBinding'),
      processor: forwardTo('prismaBinding'),
      processors: forwardTo('prismaBinding'),
      serviceCategories: forwardTo('prismaBinding'),
      services: forwardTo('prismaBinding'),
      tourBanner: forwardTo('prismaBinding'),
      tourBanners: forwardTo('prismaBinding'),
      videos: forwardTo('prismaBinding')
    },
    Upload: GraphQLUpload
  }

  typeDefs = importSchema('src/lib/graphql/schema.graphql')

  schema = applyMiddleware(
    makeExecutableSchema({
      // XXX: cast resolvers to any due to incompatibility with types generated by graphql-code-generator
      // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/21359
      resolvers: this.resolvers as any,
      resolverValidationOptions: {
        requireResolversForResolveType: false
      },
      typeDefs: this.typeDefs
    })
  )

  apolloServer: ApolloServer = new ApolloServer({
    context: ({ req }: { req: Request }): Context => {
      return {
        accountId: req.session && req.session.accountId,
        prismaBinding: this.prismaBinding,
        request: req,
        role: req.session && req.session.role,
        userId: req.session && req.session.userId
      }
    },
    formatError: (error: Error) => {
      // TODO stack trace should not be passed to client
      console.log(error)
      return error
    },
    formatResponse: (response: ExecutionResult) => {
      const formatResolver: (resolver: ExecutionResult['data']) => ExecutionResult['data'] = resolver => {
        for (const key in resolver) {
          if (key in resolver) {
            if (resolver[key] === null) { resolver[key] = undefined }
            if (typeof resolver[key] === 'object') { resolver[key] = formatResolver(resolver[key]) }
          }
        }
        return resolver
      }
      const formattedResponse = { ...response }
      if (formattedResponse && formattedResponse.data) {
        formattedResponse.data = formatResolver(formattedResponse.data)
      }
      return response
    },
    schema: this.schema,
    ...process.env.GRAPHQL_MOCKS ? { mocks } : {}
  })

  applyMiddleware (app: Application) {
    this.apolloServer.applyMiddleware({ app, path: process.env.GRAPHQL_ENDPOINT })
  }
}

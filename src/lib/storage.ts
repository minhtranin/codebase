import { Storage } from '@google-cloud/storage'
import fs from 'fs'
import mime from 'mime-types'
import fsPath from 'path'
import * as ps from 'promise-streams'
import { Stream } from 'stream'
import uuidv4 from 'uuid/v4'
import { File, FileCreateInput } from '../../build/gen/prisma/index'

function getFullPath (path: string): string {
  return process.env.STORAGE_PREFIX
    ? `${process.env.STORAGE_PREFIX}/${path}`
    : path
}

export function getPublicUrl (file: File): string {
  const fullPath = getFullPath(file.path)
  if (process.env.STORAGE_TYPE === 'local') {
    return `/storage/${fullPath}`
  } else if (process.env.STORAGE_TYPE === 'gcloud') {
    return `https://storage.googleapis.com/${process.env.GCLOUD_BUCKET}/${fullPath}`
  } else {
    throw new Error('Unknown storage type.')
  }
}

export function createWriteStream (path: string): Stream {
  const fullPath = getFullPath(path)
  if (process.env.STORAGE_TYPE === 'local') {
    fs.mkdirSync('tmp/storage', { recursive: true })
    return fs.createWriteStream(`tmp/storage/${fullPath}`)
  } else if (process.env.STORAGE_TYPE === 'gcloud') {
    const storage = new Storage({
      keyFilename: 'build/gcloud-key.json',
      projectId: process.env.GCLOUD_PROJECT
    })
    const bucket = storage.bucket(process.env.GCLOUD_BUCKET || '')
    const file = bucket.file(fullPath)
    return file.createWriteStream()
  } else {
    throw new Error('Unknown storage type.')
  }
}

export type FileUpload = Promise<{
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => fs.ReadStream;
}>

type FileInput = Pick<FileCreateInput, 'filename' | 'path'>

export async function saveFileToStorage (fileUpload: FileUpload): Promise<FileInput> {
  const { filename, mimetype, createReadStream } = await fileUpload
  const ext = mime.extension(mimetype) || 'bin'
  const path = `${uuidv4()}.${ext}`
  const src = createReadStream()
  const sink = createWriteStream(path)
  return ps.pipe(src, sink).then(() => ({ filename, path }))
}

export function unlink (path: string): void {
  const fullPath = process.env.STORAGE_TYPE === 'local' ? `tmp/storage/${path}` : path
  if (fs.existsSync(fullPath)) {
    return fs.unlink(fullPath, (unlinkErr: Error | null) => {
      if (unlinkErr) { throw unlinkErr }
    })
  }
}

export function removeAllFilesFromStorage (directory: string = 'tmp/storage/'): void {
  fs.readdir(directory, (err: Error | null, files: string[]) => {
    if (err) throw err

    for (const file of files) {
      fs.unlink(fsPath.join(directory, file), (unlinkErr: Error | null) => {
        if (err) throw err
      })
    }
  })
}

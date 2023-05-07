import client from '../lib/client'
import { UploadParams, UploadResult } from './types'

const Upload = {
  async file({ formData, path }: UploadParams) {
    const response = await client.post<UploadResult>(
      `/upload?path=${path}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    return response.data
  },
}

export default Upload

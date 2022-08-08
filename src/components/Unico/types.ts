export type UnicoSuccess = {
  base64: string
  encrypted: string
}

export type UnicoError = {
  code: number
  message: string
  type: string;
  stack?: any
}

export type UnicoSupport = {
  code: number
  message: string
  type: string
  stack: [
    {
      message: string
      listBrowsersSupport: string[]
    }
  ]
}
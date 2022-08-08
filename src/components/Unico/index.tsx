import React, { useCallback, useEffect, useMemo, useState } from 'react'
// import * as acessoWebFrame  from '../../js/unico-webframe.min'
import * as acessoWebFrame  from 'unico-webframe'

import { configurations, layout } from './config'
import { UnicoError, UnicoSuccess, UnicoSupport } from './types'
import { handleUnicoError } from './utils'

// import { useNavigate } from 'react-router-dom'

type CameraFacingMode = 'user' | 'environment'

type OwnProps = {
  mode: CameraFacingMode
}



function Unico({ mode }: OwnProps) {
  const [imageURL, setImageURL] = useState('')
  const [imageBase64, setImageBase64] = useState('')
  const [imageCapture, setImageCaptured] = useState(false)
  // const navigate = useNavigate();

  const callback = useMemo(
    () => ({
      on: {
        success(obj: UnicoSuccess) {
          setImageURL(obj.base64)
          setImageBase64(obj.base64)
          setImageCaptured(true)
        },
        error(error: UnicoError) {
          handleUnicoError(error)
          // navigate(-1);
        },
        support(error: UnicoSupport) {
          console.log(error)
        }
      }
    }),
    []
  )

  const initCamera = useCallback(
    (cameraMode: CameraFacingMode) => {
      console.log({ acessoWebFrame});
      
      if (cameraMode === 'user') {
        acessoWebFrame.initCamera(configurations, callback, layout)
      } else {
        acessoWebFrame.initDocument(configurations, callback, layout)
      }
    },
    [callback]
  )

  useEffect(() => {
    initCamera(mode)

    return () => {
      acessoWebFrame.closeCamera()
    }
  }, [initCamera, mode])

  const cancel = useCallback(() => {
    setImageCaptured(false)

    setTimeout(() => {
      initCamera(mode)
    }, 200)
  },[initCamera,mode])

  return (
    <div className='unico-container'>
      {imageCapture 
        ? (
            <>
              <button 
                onClick={()=>{
                  setImageBase64('')
                  setImageURL('')
                  setImageCaptured(false)
                }}
              >Tirar nova foto</button>
              <img src={imageURL} alt="" />
            </>
          )
        : <div id="box-camera"/>
      }
    </div>
  )
}

export default Unico
"use client"
import { convertFileToUrl } from '@/lib/utils'
import Image from 'next/image'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

type FileUploaderProps = {
    files: File[] | undefined,
    onChange: (files: File[]) => void
}
const FileUploader = ({ files, onChange }: FileUploaderProps) => {

    const onDrop = useCallback((acceptedFiles: File[]) => {
        onChange(acceptedFiles)
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} className='file-upload'>
            <input {...getInputProps()} />
            {
                files && files.length > 0 ? (
                    <Image
                        src={convertFileToUrl(files[0])}
                        width={1000}
                        height={1000}
                        alt='uploade img'
                        className='max-h-[400px] overflow-hidden object-cover'
                    />
                ) : (
                    <>
                        <Image
                            src='/assets/icons/upload.svg'
                            alt='uploader'
                            width={40}
                            height={40}
                        />
                        <div className="file-upload_label">
                            <p className="text-14-regular">
                                <span className="text-green-500">برای آپلود کلیک کنید </span>
                                یا فایل را بکشید و رها کنید
                            </p>
                            <p className="text-12-regular">
                                SVG، PNG، JPG یا GIF (حداکثر 800x400 پیکسل)
                            </p>
                        </div>
                    </>

                )
            }
        </div>
    )
}

export default FileUploader
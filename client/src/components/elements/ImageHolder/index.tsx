import { useState } from 'react'

const ImageHolder = ({
  imageAddress,
  fallbackImage,
  altName
}: {
  imageAddress: string
  fallbackImage: string
  altName: string
}) => {
  const [image, setImage] = useState(imageAddress)

  function handleImageError() {
    setImage(fallbackImage)
  }

  return image ? (
    <img onError={handleImageError} src={image} alt={altName} />
  ) : (
    <></>
  )
}

export default ImageHolder

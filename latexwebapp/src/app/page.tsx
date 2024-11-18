import './globals.css';
import { images } from './db/schema'
import { newImage, createImage } from './queries/insert'

export default function UploadImagePage() {
  function imageHandler() {
    const imageUploads = document.getElementById("image") as HTMLInputElement
    const images = imageUploads.files
    if (images !== null) {
      for (let i = 0; i < images.length; i++) {
        const image = images[0]
        const sample_user_id = 3
        const i: newImage = { 
          user_id: sample_user_id, image_url: "sample_url", file_size: image.size, file_type: image.type }
        createImage(i)
      }
    }
  }

  return (
    <form action={imageHandler}>
      <div>
        <input type="image" accept=".png, .jpg, .jpeg" multiple />
      </div>
      <div>
        <button type="submit" />
      </div>
    </form>
  );
}
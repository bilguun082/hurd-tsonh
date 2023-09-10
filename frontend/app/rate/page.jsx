"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { storage } from "../firebase.config";

export default function Home() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadUrls, setDownloadUrls] = useState([]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    setSelectedImages(files);
    // console.log(selectedImages);
  };

  const handleUpload = async () => {
    // console.log(selectedImages);
    try {
      for (const image of selectedImages) {
        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);

            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            message.error(error.message);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              //url is download url of file
              // setDownloadUrls(url);
              setDownloadUrls((prevUrls) => [...prevUrls, url]);
            });
          }
        );
      }

      Promise.all(uploadPromises).then((downloadUrls) => {
        // Do something with the download URLs (e.g., save to a database)
        console.log("Uploaded URLs:", downloadUrls);
      });
    } catch (error) {
      console.error(error);
    }
  };
  // console.log(downloadUrls);
  return (
    <div className="w-full h-3/4 flex items-center justify-center flex-col">
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
      <button onClick={handleUpload}>Upload</button>
      <progress value={uploadProgress} max="100"></progress>
      {downloadUrls?.map((url, i) => (
        <img
          key={i}
          style={{ width: "500px", marginBottom: "10px" }}
          src={url}
          alt="firebase-image"
        />
      ))}
    </div>
  );
}

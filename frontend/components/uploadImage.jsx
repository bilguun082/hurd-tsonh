"use client";
import React from "react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button"; // Replace with your button library
import { Progress } from "@nextui-org/react"; // Import your Progress component
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/app/firebase.config";

export default function FileUploadSection({
  selectedImages,
  setSelectedImages,
  downloadUrls,
  setDownloadUrls,
}) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const handleImageChange = (e) => {
    const files = e.target.files;
    setSelectedImages(files);
    // console.log(selectedImages);
  };

  const handleUpload = async () => {
    console.log(selectedImages);
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
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFile = () => setImageFile(undefined);
  return (
    <div>
      <Input
        type="file"
        placeholder="Select file to upload"
        accept="image/*"
        multiple
        className="mb-5"
        onChange={handleImageChange}
      />

      <div>
        {selectedImages && (
          <>
            <div
              extra={[
                <Button
                  key="btnRemoveFile"
                  onClick={handleRemoveFile}
                  type="text"
                  icon={<i className="fas fa-times"></i>}
                />,
              ]}
            ></div>
            <Progress value={uploadProgress} />

            <div className="text-right mt-3">
              <Button
                // loading={isUploading}
                type="primary"
                onClick={handleUpload}
              >
                Upload
              </Button>
            </div>
          </>
        )}

        {downloadUrls && (
          <>
            {downloadUrls?.map((url, i) => (
              <img
                key={i}
                style={{ width: "500px", marginBottom: "10px" }}
                src={url}
                alt="firebase-image"
              />
            ))}
            {/* <p className="mt-5 mb-5">{downloadURL}</p> */}
          </>
        )}
      </div>
    </div>
  );
}

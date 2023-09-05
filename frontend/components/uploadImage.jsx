import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React, { useState } from "react";
import { storage } from "@/app/firebase.config";
import { Progress } from "./ui/progress";

const UploadImageToStorage = ({ onImageSelect }) => {
  const [imageFile, setImageFile] = useState();
  const [downloadURL, setDownloadURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [progressUpload, setProgressUpload] = useState(0);

  const handleSelectedFile = (files) => {
    if (files && files[0].size < 10000000) {
      setImageFile(files[0]);

      console.log(files[0]);
    } else {
      message.error("File size to large");
    }
  };

  const handleUploadFile = () => {
    if (imageFile) {
      const name = imageFile.name;
      const storageRef = ref(storage, `image/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setProgressUpload(progress); // to show progress upload

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
            onImageSelect(url);
            setDownloadURL(url);
          });
        }
      );
    } else {
      message.error("File not found");
    }
  };

  const handleRemoveFile = () => setImageFile(undefined);

  return (
    <div className="container mt-5">
      <div className="col-lg-8 offset-lg-2">
        <Input
          type="file"
          placeholder="Select file to upload"
          accept="image/png"
          onChange={(files) => handleSelectedFile(files.target.files)}
        />

        <div className="mt-5">
          <div>
            {imageFile && (
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
                >
                  <div
                    title={imageFile.name}
                    description={`Size: ${imageFile.size}`}
                  />
                </div>

                <div className="text-right mt-3">
                  <Button
                    loading={isUploading}
                    type="primary"
                    onClick={handleUploadFile}
                  >
                    Upload
                  </Button>

                  <Progress value={progressUpload} />
                </div>
              </>
            )}

            {downloadURL && (
              <>
                <img
                  src={downloadURL}
                  alt={downloadURL}
                  style={{ width: 200, height: 200, objectFit: "cover" }}
                />
                {/* <p>{downloadURL}</p> */}
              </>
            )}
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadImageToStorage;

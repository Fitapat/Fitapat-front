'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button, Box } from '@mui/material';
import styles from './page.module.css';

export default function SelectPic() {
  const [selectedImage, setSelectedImage] = useState();
  const fileInputRef = React.createRef();

  const handleImageUpload = (event) => {
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <Box className={styles.container}>
      {selectedImage && (
        <Box className={styles.imageBox}>
          <Image
            src={selectedImage}
            alt="Uploaded"
            layout="fill"
            objectFit="contain"
          />
        </Box>
      )}

      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className={styles.hiddenInput}
          ref={fileInputRef}
        />
        <Button component="label" variant="outlined" onClick={triggerFileInput}>
          이미지를 업로드 하고, 오운완 사진을 꾸며보세요!
        </Button>
      </div>
    </Box>
  );
}

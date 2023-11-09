'use client';

import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { Button, Box, Container } from '@mui/material';

export default function Test() {
  const [selectedImage, setSelectedImage] = useState();
  const fileInputRef = React.createRef();

  const handleImageUpload = event => {
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      {selectedImage && (
        <Box
          style={{
            position: 'relative',
            height: '80vh',
            width: '80vw',
            margin: '2vh',
          }}
        >
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
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        <Button component="label" variant="outlined" onClick={triggerFileInput}>
          이미지를 업로드 하고, 오운완 사진을 꾸며보세요!
        </Button>
      </div>
    </Box>
  );
}

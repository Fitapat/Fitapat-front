'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button, Box } from '@mui/material';
import styles from './page.module.css';
import Link from 'next/link';

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
          {selectedImage ? '다른 이미지로 교체하기' : '이미지 업로드'}
        </Button>
        {selectedImage && (
          <Button
            className={styles.nextButton}
            component="label"
            variant="outlined"
          >
            <Link
              href={{
                pathname: `/canvas`, // 라우팅
                query: { img: JSON.stringify(selectedImage) }, // props
              }}
            >
              다음
            </Link>
          </Button>
        )}
      </div>
    </Box>
  );
}

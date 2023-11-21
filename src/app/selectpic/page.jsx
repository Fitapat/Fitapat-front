'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button, Box } from '@mui/material';
import styles from './page.module.css';
import Link from 'next/link';

export default function SelectPic() {
  const [selectedImage, setSelectedImage] = useState();
  const [base64Image, setBase64Image] = useState();
  const [isUploading, setIsUploading] = useState(false); // 이미지 업로드 중 여부
  const fileInputRef = React.createRef();

  const handleImageUpload = async (event) => {
    // 파일 크기 제한 (예: 3MB)
    const selectedFile = event.target.files[0];
    const maxSize = 3 * 1024 * 1024; // 3MB
    if (selectedFile.size > maxSize) {
      alert('이미지 파일 크기는 3MB 이하여야 합니다.');
      return;
    }
    setIsUploading(true);
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
    // base64로 변환
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = () => {
      setBase64Image(reader.result);
      setIsUploading(false);
      localStorage.setItem('img', reader.result);
    };
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: 1,
        position: 'relative',
      }}
    >
      {selectedImage && (
        <Box
          sx={{
            width: 1,
            height: 0.8,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <Image
            src={selectedImage}
            alt="Uploaded"
            fill={true}
            style={{ objectFit: 'contain' }}
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
        {selectedImage && !isUploading && (
          <Link href="/canvas">
            <Button
              className={styles.nextButton}
              component="label"
              variant="outlined"
            >
              다음
            </Button>
          </Link>
        )}
      </div>
    </Box>
  );
}

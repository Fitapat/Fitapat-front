import * as React from 'react';
import { fabric } from 'fabric';
import styles from './page.module.css';
import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import OverlayButtons from './overlayButtons';
import DownSideButtons from './downsideButtons';

export default function FabricCanvas() {
  const [isClient, setIsClient] = useState(false);
  const [isCanvasInit, setIsCanvasInit] = useState(false);
  const [canvas, setCanvas] = useState();
  const [backgroundId, setBackgroundId] = useState();
  const [triggerBgDelete, setTriggerBgDelete] = useState(false);

  // SSR 대응, 클라이언트에서만 실행되도록 하는 코드
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 초기 캔버스 세팅
  useEffect(() => {
    const newCanvas = new fabric.Canvas('myCanvas', {
      backgroundColor: 'black',
    });

    setCanvas(newCanvas);
    setIsCanvasInit(true);
  }, [isClient]);

  // 캔버스가 초기화 되면 실행
  useEffect(() => {
    // 캔버스가 초기화 되지 않았으면 실행하지 않음
    if (!isCanvasInit) return;
    if (!canvas) return;

    // 캔버스의 크기 조정
    if (window.innerWidth < 430) {
      canvas.setWidth(window.innerWidth);
      canvas.setHeight(window.innerWidth * 1.78);
    } else {
      canvas.setWidth(window.innerHeight * 0.9 * 0.56);
      canvas.setHeight(window.innerHeight * 0.9);
    }

    console.log(window.innerWidth / window.innerHeight);

    // 윈도우의 화면비가 9:16 이라면 캔버스의 크기를 윈도우에 맞춘다.
    if (
      (window.innerWidth / window.innerHeight).toFixed(2) === (0.56).toFixed(2)
    ) {
      canvas.setWidth(window.innerWidth - 30);
      canvas.setHeight((window.innerWidth - 30) * 1.78);
    }

    // 로컬 스토리지의 base64 img를 가지고 온다.
    const img = localStorage.getItem('img');
    // img가 있으면 캔버스에 추가
    if (img) {
      fabric.Image.fromURL(img, function (oImg) {
        if (oImg.height > oImg.width) {
          oImg.scaleToHeight(canvas.getHeight());
        }
        if (oImg.height <= oImg.width) {
          oImg.scaleToWidth(canvas.getWidth());
        }
        oImg.set({
          left: canvas.getWidth() / 2,
          top: canvas.getHeight() / 2,
          originX: 'center',
          originY: 'center',
          id: 'background',
        });

        canvas.add(oImg);
        // oImg의 id를 저장
        setBackgroundId(oImg.id);
      });
    }

    canvas.selection = false;

    canvas.renderAll();
  }, [canvas, isCanvasInit]);

  const handleBgErrorOpen = () => {
    setTriggerBgDelete(true);
  };

  const handleBgErrorClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setTriggerBgDelete(false);
  };

  function handleImage(e) {
    var objects = canvas.getObjects();
    for (var i in objects) {
      objects[i].remove();
    }
    var reader = new FileReader();
    reader.onload = function (event) {
      var img = new Image();
      img.onload = function () {
        var imgInstance = new fabric.Image(img, {
          selectable: 1,
        });
        canvas.add(imgInstance);
        canvas.discardActiveObject().renderAll();
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  function handleDeleteButton(e) {
    var activeObject = canvas.getActiveObject();
    if (activeObject.id === 'background') {
      handleBgErrorOpen();
      return;
    }
    if (activeObject) {
      canvas.remove(activeObject);
    }
  }

  function handleSaveImage(e) {
    canvas.discardActiveObject().renderAll();
    var link = document.createElement('a');
    link.download = 'fitapat.png';
    link.href = canvas.toDataURL({
      format: 'png',
      quality: 1.0,
    });
    link.click();
  }

  return (
    <Box
      sx={{
        width: 1,
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Box // canvas
        sx={{
          width: '1',
          height: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {isClient && (
          <Box
            sx={{
              position: 'fixed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <canvas className={styles.design} id="myCanvas" />
            <OverlayButtons
              handleDeleteButton={handleDeleteButton}
              handleBgErrorClose={handleBgErrorClose}
              triggerBgDelete={triggerBgDelete}
            />
            <DownSideButtons handleSaveImage={handleSaveImage} />
          </Box>
        )}
      </Box>
    </Box>
  );
}

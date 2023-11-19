import React from 'react';
import { fabric } from 'fabric';
import styles from './page.module.css';
import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';

export default function FabricCanvas() {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // SSR 대응, 클라이언트에서만 실행되도록 하는 코드
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 초기 캔버스 세팅
  useEffect(() => {
    let canvas = new fabric.Canvas('myCanvas');

    canvas.setBackgroundColor('white');

    if (window.innerWidth < 430) {
      canvas.setWidth(window.innerWidth);
      canvas.setHeight(window.innerWidth * 1.78);
    } else {
      canvas.setWidth(window.innerHeight * 0.5625 * 0.9);
      canvas.setHeight(window.innerHeight * 0.9);
    }

    console.log(window.innerWidth, window.innerHeight);
    canvas.setBackgroundColor('white');

    // 주소창에 쿼리를 받아온다.
    const query = router.query;

    // 쿼리가 있으면
    if (query) {
      // 쿼리를 JSON으로 변환한다.
      const img = JSON.parse(query.img);
      // 쿼리로 받아온 이미지를 캔버스에 추가한다.
      fabric.Image.fromURL(img, function (oImg) {
        oImg.scaleToWidth(canvas.width);
        canvas.add(oImg);
      });
    }

    canvas.renderAll();
    console.log('canvas rendered', canvas);

    // let imageLoader = document.getElementById('imageLoader');
    // imageLoader.addEventListener('change', handleImage, false);

    const imageSaver = document.getElementById('lnkDownload');
    imageSaver.addEventListener('click', saveImage, false);
  }, [isClient]);

  function handleImage(e) {
    const canvas = document.getElementById('myCanvas');
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
        canvas.deactivateAll().renderAll();
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  function saveImage(e) {
    const canvas = document.getElementById('myCanvas');
    this.href = canvas.toDataURL({
      format: 'png',
      quality: 1.0,
    });
    this.download = 'fitapat.png';
  }

  return (
    <div>
      {isClient ? <canvas className={styles.design} id="myCanvas" /> : null}
      <Button variant="outlined">
        <a id="lnkDownload" href="#">
          Save image
        </a>
      </Button>
    </div>
  );
}

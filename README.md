# FitaPat
## 프로젝트 소개
오운완 사진 편집 앱인 FitaPat입니다.

## 기능
### 온보딩페이지
![image](https://github.com/Fitapat/Fitapat-front/assets/84117653/e39e4ab1-6c6c-408d-b701-ba35418258e0)
### 운동 투두(기록) 관리
![image](https://github.com/Fitapat/Fitapat-front/assets/84117653/6b8bbba0-bdbf-48e8-8cb0-1b20ddb79f01)
### 오운완 사진 업로드
![image](https://github.com/Fitapat/Fitapat-front/assets/84117653/4567ebf9-e0cb-417e-87d8-59827a2145c7)
### 운동 기록 불러오기
![image](https://github.com/Fitapat/Fitapat-front/assets/84117653/27c6655d-a204-467a-a49e-1c8bcbf914e8)
### 오운완 사진 편집
![image](https://github.com/Fitapat/Fitapat-front/assets/84117653/b505020f-bcd0-4a18-b6e7-178f580a2bf2)
![image](https://github.com/Fitapat/Fitapat-front/assets/84117653/31790874-e790-4f49-b657-9bf928c35d1b)
### 오운완 사진 다운로드
![image](https://github.com/Fitapat/Fitapat-front/assets/84117653/549d5c91-78e4-4c86-98ba-8fb7579a30d7)


## 시작하기

프로젝트 배포 전, 개발 서버 실행은 다음을 따릅니다.

```bash
npm install
npm run dev
```

[http://localhost:3000/login](http://localhost:3000/login) 를 브라우저로 열면 개발 서버가 실행됩니다.

## git 협업 전략
### Branch
- main
    - 운영 환경의 브랜치입니다.
- develop
    - 개발 환경의 브랜치입니다.
    - main 브랜치로부터 생성됩니다.
- feat/**
    - 새로운 기능 추가/개발할 때 사용됩니다.
    - develop 브랜치로부터 생성됩니다.
    - develop에 merge합니다.
### Commit
- **feat: 새로운 기능, 페이지 추가**
- **fix: 버그 수정**
- **chore: 자잘한 수정 (디펜던시…)**
- **design : css 등 스타일링**
- docs: 문서 관련 수정
- refactor: 리팩토링

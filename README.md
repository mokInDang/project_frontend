# 동네줍깅 - 프론트엔드

<div align="center">
    <img src="https://github.com/mokInDang/project_frontend/assets/76846986/aaf825ae-7525-4e92-b9d5-fc7db4f07fad" width=50%/>
  </br></br>
  <a href='https://www.youtube.com/watch?v=006xRsKHYNo'>
    <img src="https://github.com/mokInDang/project_frontend/assets/76846986/d15568a1-eb8a-411f-beca-5f062096e260" width=80%/>
  </a>
  <p>
    ▲ 클릭 시 안내 영상으로 이동합니다!
  </p>
</div>
</br>

동네줍깅은 지역 인증 기반 서비스로 함께 플로깅 활동을 할 동네 친구들을 모집하는 웹서비스입니다.</br>
유저는 자신의 지역을 인증하고, 같은 지역 내에서 플로깅 활동 인원 모집 게시글을 작성할 수 있습니다.</br>
활동 이후 플로깅 인증을 통해 내가 한 플로깅 활동을 공유하고, 다른 사람들의 플로깅 활동을 확인할 수 있습니다.


## 기술 스택

### 프론트엔드
<div>
  <img src="https://img.shields.io/badge/react 18-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">
  <img src="https://img.shields.io/badge/react router dom-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white">
  <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/Styled Components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">
</div>

### DevOps

<div>
  <img src="https://img.shields.io/badge/aws s3-569A31?style=for-the-badge&logo=amazons3&logoColor=white">
  <img src="https://img.shields.io/badge/aws cloudfront-8C4FFF?style=for-the-badge&logo=amazonaws&logoColor=white">
  <img src="https://img.shields.io/badge/GitHub Actions-2088FF?style=for-the-badge&logo=amazonaws&logoColor=white">
</div>

### Collaboration & Tool

<div>
  <img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white">
  <img src="https://img.shields.io/badge/vscode-007ACC?style=for-the-badge&logo=redux&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/sourcetree-0052CC?style=for-the-badge&logo=sourcetree&logoColor=white">
</div>

<h2>설치 및 실행</h2>
<h3>요구사항</h3>

- Node.js 18.13.0
- Npm 8.19.3

<h3>Installation</h3>

```
$ git clone https://github.com/mokInDang/project_frontend
$ cd project_frontend
```

<h3>Run Application</h3>

```
$ cd project_frontend
$ npm install
$ npm start
```

<h2>주요 기능</h2>
<h3>✅ 카카오 소셜 로그인</h3>

- 카카오 로그인을 통해 서비스 회원가입 및 로그인 가능

<h3>🏃🏻 플로깅 인원 모집 게시판</h3>

- 전체 지역의 플로깅 모집글을 메인 화면에서 카드 형식으로 확인 가능
- 모집 완료되거나 모집 기한이 지난 게시글은 마감 도장으로 표시
- 또한 모집글 작성이 가장 활성화된 지역 랭킹 확인 가능
1- 사용자는 위치 인증 후 자신의 지역에서 생성된 모집글을 열람하고 댓글로 참여할 수 있음
- 해당 지역의 사용자가 아니면 모집 게시글에 댓글을 작성할 수 없음

<h3>📍 모집 게시글 지도</h3>

- 내비게이션 바 상단의 지역구 버튼을 누르면 해당 지역의 지도 페이지로 연결
- 해당 지역에서 작성된 모집 게시글을 마커로 표시해 한 눈에 확인할 수 있음
- 마커를 클릭하면 게시글 제목과 플로깅할 위치를 말풍선으로 띄우고, 말풍선 클릭 시 해당 게시글 페이지로 이동

<h3>🤳🏻 플로깅 인증 게시판</h3>

- 사용자가 작성한 인증 게시글을 갤러리 형태로 표시
- 인증 게시글 상세 페이지에서는 이미지 여러 장을 슬라이드 형식으로 표시

<h3>✍🏻 모집 게시글 및 플로깅 인증 게시글 작성</h3>

- 직접 모집글을 작성할 수 있음
- 모집 게시글 작성 시 지도에서 상세 위치를 검색하고 지정
- 모집 인원 및 플로깅 유형, 시작 예정일 등 정보를 입력하고 위지윅 에디터로 본문 작성
- 인증 게시글 작성 시 사진 첨부 기능
  
<h3>⚙️ 회원 정보 수정</h3>

- 사용자는 마이페이지에서 지역 인증이 가능
- 내 정보 수정 페이지에서 프로필 사진 및 별명 수정

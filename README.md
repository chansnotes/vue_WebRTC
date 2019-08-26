# Vue + webRTC 

```
.
├── app.js      --> 앱 실행 파일
├── bin
│   └── www
├── package.json
├── public      --> 이미지, 스타일등을 보관
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes      --> URL 경로별 라우트 구현
│   ├── index.js
│   └── users.js
└── views       --> 템플릿 엔진을 통한 화면 구현
    ├── error.pug
    ├── index.pug
    └── layout.pug
```

----

## Streaming webCam (mediaDevices)

* `autoplay` 없으면, 재생이안되고 한 프레임만 캡쳐되서 나옴
* `getUserMedia()` 
    * 웹에서 유저가 카메라 사용을 허용하도록 prompt를 띄움
    * 허용 혹은 거절 가능
    * 허용시 `MediaStream` 객체가 반환되고, `srcObject` 속성을 통해서 이 객체에 접근이 가능
        * `video.srcObject = mediastream`
* `MediaTrackConstraints` = media와 사용이 가능한 제한요소들
    * 만약 제한요소가 현재 유저의 시스템과 맞지 않으면, `OverconstrainedError`를 반환하고, 카메라에 접근이 취소됨



#### Best Practices
* Video 엘리먼트가 지정한 container 크기를 넘어서지 않도록 설정 방법

```css
video {
    max-width: 100%;
    width: 600px;
}
```

#### Vue 코드 예시1

```html
<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
    <video  autoplay playsinline ref="video" id="video" width="300" height="200"></video>
    <span> Video Player </span>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    video: {}
  }),
  method: {

  },
  // Vue component가 mount되면 실행
  mounted() {
      // refs가 video인 html element를 data property의 video에 저장
    this.video = this.$refs.video;

    // mediaDevice 요청해서 있으면 실행
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({video:true}).then(stream => {
          // stream object는 뭐지???
          this.video.srcObject = stream;
          this.video.play();
      }).catch(error => {console.log('navigator.getUserMedia error: ', error )})
    }
  }
};
</script>

```

----

## RTCPeerConnection

* WebRTC를 이용해서 P2P (유저 대 유저)의 통신을 가능하게하고
* 추가적으로 video, audio, 및 기타 데이터들을 stream 가능

### `adapter` 관련


#### Vue 코드 예시2
* Stream하는 video 데이터를 같은 페이지에서 P2P 커넥션을 통해 remotely 보여주기 

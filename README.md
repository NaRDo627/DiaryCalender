# JusoheReactNativeExample
react-native-cli 앱으로 안드로이드 폰에 직접, 혹은 에뮬레이터로 같이 올린 파이썬 Flask 웹 서버와 통신할 수 있습니다.

## 설치법 (ReactNative)
Android Studio 및 Android SDK, npm이 설치되어 있다고 가정합니다.
1. `npm install -g react-native-cli` 실행
2. `git clone https://github.com/NaLDo627/DiaryCalender.git` 혹은 zip파일 다운로드 후, 설치 디렉토리로 이동
3. `npm install` 실행 후, `react-native run-android` (이때, 안드로이드 에뮬레이터가 켜져있거나, USB 디버깅이 활성화된 안드로이드 폰이 연결되어 있어야 함)
4. (중요) 프로젝트경로/src/screens/InputScreen/index.js 안 16번 줄, 서버 주소 변경
(const SERVER_URL = 'http://현재_주소:5000/';)
(현재 주소 아는 법 : 명령 프롬프트 -> ipconfig -> 현재 어댑터의 IPv4 주소)

## 예제 서버 구동법 (Python3)
pip가 설치되어 있다고 가정합니다. (Anaconda 등 가상 환경에서 실행하는 것을 권장)
1. webserver 폴더로 이동
2. `pip install -r requirements.txt` 실행
3. `python flask_server.py` 실행

## 사용법 
서버와 모바일이 같은 네트워크에 속해 있어야 합니다.
1. 메인 화면 우측 상단에 Add 버튼 클릭
2. 텍스트 창에 메모를 입력
3. 메모가 추가되었다는 알림창과 함께 메모가 등록됨, 이때 메모가 긍정이라고 판단되면 초록, 부정이라고 판단되면 분홍색 (회색이라면 감정 판별된 내용이 없음 - 웹 서버와 연결이 되지 않음)
4. 수정하려면 메모 클릭 후 수정

*구동한 flask_server.py와 통신할 때, 입력한 메모 안에 "bad" 혹은 "부정" 이라는 단어가 들어가 있다면 이 단어는 부정, 그 외에는 긍정으로 처리합니다. 그 내용을 flask_server.py안에 훈련된 모델을 predict 하여 긍/부정을 판별하는 내용으로 치환하면 됩니다. 

## Trouble shooting
- Android 스튜디오와 SDK 설치는 필수입니다! <https://yuddomack.tistory.com/entry/1React-Native-%EC%84%A4%EC%B9%98%EC%99%80-%EC%8B%A4%ED%96%89hello-world>
- Library License Agree 관련 이슈, 에뮬레이터 관련 이슈 : <https://suyou.tistory.com/154>
- 그 밖에 문의나 오류 발생 시 메일 주시기 바랍니다 : hygoogi@hints.or.kr

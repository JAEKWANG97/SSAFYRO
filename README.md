
![image.png](./img/image.png)
# SSAFYRO - SSAFY로 가기 위한 이정표

---

삼성 청년 소프트웨어 아카테미 (SSAFY) 입과 준비를 위한 사이트입니다.

각 전형 별 가이드 제공 및 면접 스터디를 제공하고, 피드백을 통해 부족한 부분을 보완하는 프로젝트 입니다.

[커밋 횟수 등등 정보 있으면 좋을 듯]

# 기획 배경

---

- SSAFY 시험, 잘 모르겠어!
- 시험 문제는? 방식은? 난이도는?
- 면접의 형태와 주제는?
- 지방인데 면접 스터디는?

SSAFY에 입과하기 위해 필요한 정보들을 얻기 위해 오픈 카카오톡방을 찾아 들어가도, 대외비로 인해 많은 정보를 찾기 힘든 문제가 있었습니다. 그래서 입과를 준비하는 사람들을 위해 

# 프로젝트 주요 기능

---

## 에세이(자기소개서) 첨삭

## 인터뷰(면접) 준비 시스템

OpenVidu(WebRTC)를 사용하여 웹 환경에서 최대 3명까지의 면접 스터디원을 모집하여 서로 피드백을 주고 받을 수 있는 면접 준비가 가능합니다.

### 면접 순서 자동화

면접 순서를 사용자가 정하지 않습니다. 주어진 시간동안 질의응답을 하고, 면접자는 답변 제출 버튼을, 면접관은 각 답변과 전체 면접에 대한 채점만 하면 됩니다. 필요한 질문과 면접자 역할의 순환은 시스템이 자동으로 지정해주며, 동기화됩니다.

### 답변 데이터

사용자의 답변 내용은 Web Speech API의 STT 기능을 이용하여 자동으로 텍스트로 변환되어, 답변 제출시 저장됩니다. 동시에, 발음 평가 점수와 표정 데이터 또한 분석할 수 있습니다.

## 활동 데이터 분석

# 기술 스택

---

![image.png](./img/image3.png)


### Frontend

- React
- React Router
- Tailwind CSS
- STOMP.js
- Axios
- face-api.js (표정 분석 모델)
- Web Speech API (Sound-to-Text)

### Backend

- SpringBoot
- Spring Data Jpa
- Spring Ai
- Spring Rest Docs
- Redis
- RabbitMQ
- MySQL
- ElasticSearch
- Stomp Web Socket
- LLama

### Infra

- AWS ec2
- NginX
- Docker
- Jenkins

### Project Management, Version Control

- git
- gitLab
- JIRA

# 제작 기간

---

2024.07.02. - 2024.08.16.

# 팀원 소개

---

최민규

- 팀장 및 PM
- Frontend 개발
- CI 로고 디자인, Promotion Video(UCC) 기획 및 제작
- 프레젠테이션 디자인 및 최종 발표 담당

이정준

- Frontend 개발
- WebSocket(STOMP.js) 담당
- UCC 출연

고도연

- Frontend 파트장
- UI 디자인 검수

김두열

- Backend 파트장
- CI/CD 및 인프라
- UCC 출연, 중간 발표 담당

유재광

- Fullstack 개발
- GPT → LLaMA Migration 담당

박지훈

- Backend 개발
- 프레젠테이션 디자인 참여
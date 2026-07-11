# SSAFYRO 프로젝트 기술 분석 및 포트폴리오 연계 가이드

## 1. 프로젝트 개요
- 프로젝트 한 줄 요약: SSAFY 준비생을 위한 모의면접·에세이 첨삭·면접 결과 분석 서비스를 Spring Boot 기반 백엔드로 구현한 프로젝트입니다.
- 어떤 문제를 해결하는 서비스인지: SSAFY 지원 과정에서 필요한 에세이 작성, 면접 연습, 피드백, 우수 답변 참고를 한 서비스 안에서 제공하려는 목적이 보입니다. 저장소 기준으로는 에세이 첨삭, 면접방 생성/입장, 면접 진행 제어, 면접 결과 리포트, 유사 답변 추천 API가 구현되어 있습니다.
- 백엔드 관점에서 이 프로젝트가 왜 의미 있는지: 단순 CRUD 수준을 넘어 인증, 실시간 상태 동기화, Redis 기반 임시 상태 저장, RabbitMQ 기반 매칭 큐, Elasticsearch 기반 검색/추천, Querydsl 기반 통계 조회, Spring AI 연동까지 한 프로젝트 안에서 함께 다룹니다. 포트폴리오에서는 "실시간 서비스 + 분석/검색 + AI 통합" 경험을 한 번에 설명할 수 있는 백엔드 사례로 활용 가치가 있습니다.

## 2. 백엔드 아키텍처 요약
- 서버 구성: `Spring Boot 3.3.2`, `Java 17` 기반이며, `spring-boot-starter-web`, `spring-boot-starter-security`, `spring-boot-starter-websocket`, `spring-boot-starter-validation`을 사용합니다. 패키지 구조도 `api/controller`, `api/service`, `domain`, `config`, `security`, `error`로 나뉘어 책임이 분리되어 있습니다.
- 저장소/캐시/메시징/외부 API: 영속 저장은 JPA 기반 엔티티와 리포지토리로 구성되어 있고, 빌드 설정상 MySQL 드라이버를 사용합니다. 실시간 상태는 Redis에 `RoomRedis`, `InterviewRedis` 형태로 저장하고, 빠른 입장 로직은 RabbitMQ 큐를 사용합니다. 면접 결과 추천은 Elasticsearch 문서 저장 및 검색으로 처리합니다. 외부 연동은 OAuth2, Spring AI `ChatClient`, LiveKit 토큰 발급 SDK, KoMorAn 형태소 분석기가 확인됩니다.
- 서비스 분리 여부와 책임: 컨트롤러는 REST/STOMP 엔드포인트를 노출하고, 서비스는 비즈니스 로직을 수행하며, 도메인/리포지토리는 저장 모델과 조회를 담당합니다. 특히 `ReportQueryRepositoryImpl`은 Querydsl 통계 조회, `InterviewResultDocumentOperationRepositoryImpl`은 Elasticsearch 검색, `RoomService`는 Redis/RabbitMQ 기반 방 로직, `InterviewService`는 면접 진행 상태 로직으로 역할이 분명합니다.
- 배포/운영 방식: 저장소에서 확인되는 배포 방식은 Docker 기반 JAR 실행입니다. `backend/Dockerfile`은 `ssafyro.jar`를 `develop` 프로필, `9999` 포트, `Asia/Seoul` 타임존으로 실행합니다. API 문서는 Spring REST Docs + Asciidoctor로 생성되어 `bootJar`에 `static/docs`로 포함됩니다. 반면 Jenkins/GitHub Actions/GitLab CI 같은 CI/CD 설정 파일은 저장소에서 확인되지 않았습니다.

## 3. 핵심 기술 분석
### A. OAuth2 로그인과 JWT 기반 Stateless 인증
- 무엇을 구현했는지: `SecurityConfig`에서 세션을 `STATELESS`로 두고, `JwtAuthenticationTokenFilter`를 `UsernamePasswordAuthenticationFilter` 앞에 배치해 `/api/**` 보호 API를 인증 대상으로 설정했습니다. OAuth2 로그인 성공 시 `OAuth2AuthenticationSuccessHandler`가 사용자 정보를 저장/조회한 뒤 JWT를 발급해 프론트 URL로 리다이렉트합니다.
- 왜 중요한지: 실시간 서비스나 SPA 환경에서는 세션보다 토큰 기반 인증이 API 서버 구조에 더 잘 맞습니다. 이 프로젝트는 소셜 로그인과 자체 JWT 인증을 연결해 초기 로그인과 이후 API 접근을 분리한 구조를 갖고 있습니다.
- 코드 근거: `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/config/SecurityConfig.java`, `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/security/Jwt.java`, `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/security/JwtAuthenticationTokenFilter.java`, `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/security/OAuth2AuthenticationSuccessHandler.java`, `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/security/CustomOAuth2UserService.java`

### B. Redis와 RabbitMQ를 이용한 면접방 상태 관리와 빠른 입장 로직
- 무엇을 구현했는지: 면접방은 DB 엔티티 `Room`과 별도로 Redis 모델 `RoomRedis`로 관리됩니다. 방 생성 시 Redis에 저장하고 동시에 RabbitMQ 큐에 roomId를 적재합니다. 빠른 입장 API는 큐에서 roomId를 꺼내 Redis 상태를 확인해 입장 가능한 방을 찾고, 남은 roomId는 다시 큐로 되돌립니다.
- 왜 중요한지: 실시간 방 상태는 빈번히 바뀌므로 RDB보다 Redis에 두는 편이 자연스럽고, 매칭 후보 탐색은 메시지 큐로 분리하면 빠른 입장 시 탐색 비용을 단순화할 수 있습니다. 이 구조는 "영속 데이터"와 "실시간 임시 상태"를 분리한 설계 사례로 설명하기 좋습니다.
- 코드 근거: `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/api/service/room/RoomService.java`, `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/domain/room/redis/RoomRedisRepository.java`, `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/domain/room/redis/RoomRedis.java`, `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/domain/room/rabbitmq/RoomRabbitMqRepository.java`, `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/config/rabbitmq/RabbitMqConfig.java`

### C. STOMP WebSocket 기반 면접 진행 제어와 동기화
- 무엇을 구현했는지: `WebSocketConfig`에서 `/ssafyro-chat` 엔드포인트를 열고 `/topic` 브로커, `/chat`, `/interview` destination prefix를 설정했습니다. `InterviewWebSocketController`는 면접 시작, 종료, 턴 변경, 퇴장 메시지를 STOMP 메시지로 받아 같은 room topic으로 전파합니다. `InterviewService`는 `Stage`와 `RoomRedis` 상태를 기준으로 현재 면접자 순서를 계산합니다.
- 왜 중요한지: 다자간 면접 스터디 서비스에서는 REST polling보다 실시간 이벤트 전파가 핵심입니다. 이 프로젝트는 단순 채팅이 아니라 "면접 진행 상태"를 서버가 제어하고 브로드캐스트하는 구조라서 실시간 협업 서버의 성격이 분명합니다.
- 코드 근거: `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/config/WebSocketConfig.java`, `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/api/controller/interview/InterviewWebSocketController.java`, `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/api/service/interview/InterviewService.java`, `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/domain/room/Stage.java`, `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/error/GeneralWebSocketExceptionHandler.java`

### D. Elasticsearch와 Querydsl을 이용한 추천/검색/통계 분석
- 무엇을 구현했는지: 면접 종료 후 `InterviewResultDocument`를 Elasticsearch 인덱스 `interview-results`에 저장하며, 질문/답변 태그와 발음 점수, 평가 점수, 감정값을 함께 보관합니다. 추천 조회는 `questionTags` 기반 검색과 `_score` 정렬로 처리합니다. 통계는 `ReportQueryRepositoryImpl`에서 Querydsl로 평균 점수, 발음 평균, 표정 평균을 직접 조회합니다.
- 왜 중요한지: 단순 저장을 넘어서 "유사한 질문에 대한 우수 답변 추천"과 "개인/전체 통계 리포트"를 분리 구현한 점이 의미 있습니다. 검색은 Elasticsearch, 집계는 Querydsl/JPA로 나눠 사용하는 구조는 포트폴리오에서 기술 선택 이유를 설명하기 좋습니다.
- 코드 근거: `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/domain/interviewresult/InterviewResultDocument.java`, `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/domain/interviewresult/InterviewResultDocumentRepository.java`, `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/domain/interviewresult/InterviewResultDocumentOperationRepositoryImpl.java`, `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/api/service/interviewresult/InterviewResultService.java`, `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/domain/report/ReportQueryRepositoryImpl.java`

### E. Spring AI 기반 에세이 첨삭·면접 피드백·PT 기사 생성
- 무엇을 구현했는지: `AIResponseGenerator` 인터페이스 뒤에 `ChatGptResponseGenerator`를 두고, `ChatClient`를 통해 면접 답변 피드백, 에세이 첨삭, PT 면접용 기사와 질문 생성을 수행합니다. `EssayService`, `InterviewService`, `ReportService`가 이 AI 추상화를 사용합니다. 형태소 기반 태그 생성은 KoMorAn으로 분리되어 있습니다.
- 왜 중요한지: AI 호출이 컨트롤러에 직접 붙지 않고 서비스 계층과 인터페이스 뒤로 감춰져 있어 교체 가능성과 테스트 용이성이 높습니다. 실제로 `OllamaResponseGenerator` 구현도 존재하지만 비활성화되어 있어, 제공자 교체를 염두에 둔 구조로 볼 수 있습니다.
- 코드 근거: `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/api/service/ai/AIResponseGenerator.java`, `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/api/service/ai/ChatGptResponseGenerator.java`, `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/api/service/ai/OllamaResponseGenerator.java`, `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/config/ChatClientConfig.java`, `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/api/service/essay/EssayService.java`, `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/api/service/report/KoMorAnGenerator.java`

### F. 테스트와 Spring REST Docs 기반 API 문서화
- 무엇을 구현했는지: Gradle에서 Asciidoctor와 Spring REST Docs를 설정하고, `bootJar`에 문서를 포함합니다. 저장소 기준 테스트 파일은 38개가 확인되며, 서비스 테스트, 컨트롤러 테스트, WebSocket STOMP 테스트, REST Docs 테스트가 존재합니다.
- 왜 중요한지: 포트폴리오에서 "기능 구현"만큼 중요한 것이 검증과 문서화입니다. 특히 WebSocket 컨트롤러 테스트가 실제 `WebSocketStompClient`로 구동된다는 점은 단순 단위 테스트보다 한 단계 더 강한 근거가 됩니다.
- 코드 근거: `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/build.gradle`, `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/docs/asciidoc/index.adoc`, `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/test/java/com/ssafy/ssafyro/docs/RestDocsSupport.java`, `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/test/java/com/ssafy/ssafyro/api/service/room/RoomServiceTest.java`, `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/test/java/com/ssafy/ssafyro/api/controller/interview/InterviewWebSocketControllerTest.java`, `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/test/java/com/ssafy/ssafyro/api/service/report/ReportServiceTest.java`

## 4. 포트폴리오용 프로젝트 소개
SSAFYRO는 SSAFY 준비생을 위한 모의면접·에세이 첨삭 서비스로 보이지만, 백엔드 관점에서는 인증, 실시간 상태 관리, 검색/통계, AI 연동이 동시에 들어간 복합 서비스에 가깝습니다. 사용자는 OAuth2 로그인 후 JWT로 보호 API에 접근하고, 면접방은 Redis와 RabbitMQ를 통해 생성·조회·빠른 입장 흐름을 처리하며, 실제 면접 진행은 STOMP WebSocket으로 동기화됩니다.

면접이 종료되면 임시로 저장된 인터뷰 데이터를 바탕으로 JPA 리포트, 상세 피드백, Elasticsearch 검색 문서를 함께 생성합니다. 이를 통해 개인 리포트 조회뿐 아니라 질문 태그 기반의 유사 답변 추천과 점수/표정 통계까지 제공하는 구조를 확인할 수 있습니다. 여기에 Spring AI 기반 에세이 첨삭과 면접 피드백까지 포함되어 있어, 단순 CRUD가 아니라 실시간 서비스와 분석형 서비스가 결합된 백엔드 프로젝트로 설명하기 적합합니다.

## 5. 포트폴리오용 내 기여/기술적 의사결정
- 본인이 실제 담당했다면, Redis에 면접방과 인터뷰 진행 상태를 두고 RDB에는 최종 결과만 저장하는 식으로 "실시간 상태"와 "영속 데이터"를 분리한 점을 핵심 설계 결정으로 설명하는 것이 좋습니다.
- RabbitMQ 큐를 이용해 빠른 입장 로직을 구현하고, Redis 상태 검증 후 재적재하는 방식으로 즉시성 있는 매칭 흐름을 만든 점은 실시간 서비스 설계 경험으로 정리할 수 있습니다.
- OAuth2 로그인 이후 JWT 기반 stateless 인증으로 보호 API 접근을 처리한 점은 인증/인가 설계 경험으로 정리하기 좋습니다.
- 면접 종료 후 결과를 JPA 리포트와 Elasticsearch 검색 문서로 분리 저장하고, Querydsl로 통계 조회를 분리한 점은 "저장 모델과 조회 모델을 목적별로 나눴다"는 설명이 가능합니다.
- Spring AI를 서비스 계층 뒤에 인터페이스로 감싸 에세이 첨삭, 면접 피드백, 기사 생성에 재사용한 구조는 AI 기능을 백엔드 서비스에 안전하게 통합한 사례로 정리할 수 있습니다.

## 6. 이력서에 쓸 수 있는 bullet 초안
- Spring Boot 기반 모의면접 플랫폼 백엔드에서 OAuth2 로그인, JWT 인증 필터, 보호 API 보안 체계를 구현
- Redis·RabbitMQ·STOMP WebSocket을 활용해 실시간 면접방 생성, 빠른 입장, 턴 전환, 퇴장 동기화 로직 구현
- 면접 종료 데이터를 JPA 리포트와 Elasticsearch 검색 문서로 이원 저장하고, Querydsl 통계 조회 및 태그 기반 유사 답변 추천 API 구현

## 7. 면접에서 강조할 기술 포인트
- 왜 방 상태와 면접 진행 상태를 RDB가 아니라 Redis에 두었는지, 그리고 최종 결과만 JPA로 영속화했는지 설명할 수 있어야 합니다.
- RabbitMQ를 빠른 입장 큐로 둔 이유와, 큐의 roomId와 Redis 실제 상태를 함께 검증하는 흐름을 설명할 수 있어야 합니다.
- WebSocket으로 어떤 이벤트를 브로드캐스트했고, REST와 STOMP를 어떻게 역할 분리했는지 말할 수 있어야 합니다.
- Elasticsearch 문서에 질문/답변 태그와 감정값을 저장한 이유, 추천 조회와 통계 조회를 왜 서로 다른 저장소/조회 방식으로 나눴는지 설명할 수 있어야 합니다.
- Spring AI 연동을 컨트롤러가 아니라 인터페이스 기반 서비스 뒤로 숨긴 이유와, 테스트 시 `AIResponseGenerator`를 mock 처리한 구조를 설명할 수 있어야 합니다.

## 8. 확인 필요 사항 / 과장 금지 포인트
- README에는 OpenVidu 기반이라고 적혀 있지만, 실제 토큰 발급 코드는 `io.livekit:livekit-server`와 `AccessToken`을 사용합니다. README와 실제 구현이 일치하지 않으므로 포트폴리오에는 코드 기준으로 적는 것이 안전합니다.
- `application.yml` 또는 프로필별 설정 파일이 저장소에서 확인되지 않아, 실제 운영 DB/Redis/RabbitMQ/Elasticsearch 접속 정보와 프로필 구성은 코드만으로 확정할 수 없습니다.
- `backend/src/main/java`에서 `@SpringBootApplication` 메인 클래스 소스를 확인하지 못했습니다. Dockerfile은 JAR 실행을 전제로 하지만, 부트스트랩 소스는 저장소에 없습니다.
- `RedisConfig`에서 `RedisProperties`를 참조하지만 해당 소스는 저장소에서 찾지 못했습니다. 설정 클래스 일부가 누락되었을 가능성이 있습니다.
- 테스트는 다수 존재하지만 `IntegrationTestSupport`의 Testcontainers 설정은 주석 처리되어 있습니다. 따라서 Redis/RabbitMQ 연동 테스트가 현재 저장소만으로 완전 자동화되어 있다고 단정하면 과장입니다.
- CI/CD 설정 파일은 저장소에서 확인되지 않았습니다. README에 인프라로 Jenkins가 언급되더라도, 실제 파이프라인 설정을 근거로 말하기는 어렵습니다.
- 일부 조회 API는 인증 principal 대신 request parameter로 userId를 받습니다. 예를 들어 report/essay 조회는 보안 설계 일관성 측면에서 추가 확인이 필요합니다.

## 9. 참고한 핵심 파일
- `/Users/yujaegwang/Documents/projects/SSAFYRO/README.md`
- `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/build.gradle`
- `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/Dockerfile`
- `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/config/SecurityConfig.java`
- `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/security/Jwt.java`
- `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/security/JwtAuthenticationTokenFilter.java`
- `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/security/OAuth2AuthenticationSuccessHandler.java`
- `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/config/WebSocketConfig.java`
- `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/api/service/room/RoomService.java`
- `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/domain/room/redis/RoomRedisRepository.java`
- `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/domain/room/rabbitmq/RoomRabbitMqRepository.java`
- `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/api/controller/interview/InterviewWebSocketController.java`
- `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/domain/interview/InterviewRedisRepository.java`
- `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/api/service/report/ReportService.java`
- `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/domain/interviewresult/InterviewResultDocumentOperationRepositoryImpl.java`
- `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/domain/report/ReportQueryRepositoryImpl.java`
- `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/api/service/ai/ChatGptResponseGenerator.java`
- `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/main/java/com/ssafy/ssafyro/api/service/essay/EssayService.java`
- `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/docs/asciidoc/index.adoc`
- `/Users/yujaegwang/Documents/projects/SSAFYRO/backend/src/test/java/com/ssafy/ssafyro/api/controller/interview/InterviewWebSocketControllerTest.java`

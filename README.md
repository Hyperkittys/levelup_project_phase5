# levelup_project
<이 repo는 학습용 목적으로 일체 상업적 목적을 포함하고 있지 않습니다. >
<이 프로젝트는 Cursor AI와 Postman과 함께합니다> 

# 생성 동기 
주니어 devops를 준비하면서 추가적인 벡엔드 개발 및 추가적인 공부가 필요하였고 
그 과정을 기록하는 용도 와 테크니컬 라이팅 스킬을 향상시키기 위하여 이 repo를 생성하게 되었습니다. 

# 1차 목표 과정 
1단계: 기초 웹 개발 및 백엔드 구축

	•	목표: 기본적인 백엔드 및 데이터베이스 연동 기능 익히기
	•	주요 내용:
	•	Node.js와 Express.js를 이용한 웹 서버 구축
	•	REST API 설계와 구현
	•	SQLite 또는 MongoDB와 같은 경량 DB를 사용하여 CRUD 기능 구현
	•	실습: 간단한 웹 애플리케이션을 만들어서 API 요청을 받아 DB에 데이터를 저장하고, 불러오고, 삭제하는 CRUD 애플리케이션 만들기

=> 로컬 환경에서 Node.js로 웹 애플리케이션을 만들어서 localhost로 실제로 구동시켜 봤는데 csp라는 보안헤더를 붙이지 않으면 브라우저에서 연결을 거부했었습니다. 
그래서 helmet라이브러리를 추가로 설치해서 메인 스크립트에 csp설정하는 코드를 추가시켜서 해결했습니다.
그리고 이 스크립트는 서버에서 동작하는 코드이고, 실제로 눈에 보이는건 index.html같은 파일로 프론트엔드도 구현은 해줘야 어느정도 확인이 가능했었습니다.

2단계: 사용자 인증 및 권한 관리

	•	목표: 사용자 인증 시스템을 구축하여 기본적인 보안 기능 추가
	•	주요 내용:
	•	JWT (JSON Web Token) 또는 OAuth를 이용한 사용자 인증
	•	사용자 세션 관리 및 비밀번호 암호화 처리 (bcrypt)
	•	권한 관리(Authorization) 시스템 추가
	•	실습: 로그인, 회원가입 기능을 구현하고, 인증된 사용자만이 접근할 수 있는 보호된 라우팅 설정

=> 기존에는 처음 만든 스크립트를 확장하려 했는데 cursor는 아예 새로 만들어버려서 기존 스크립트는 주석처리해놓고 새로 구성하게 되었고 
그리고 인증기능을 구현할때 authentication.js 라는 인증기능을 구현해놓은 파일을 따로 만들었는데 
애플리케이션에서는 이 파일을 import하는 방식이 아니라 app.js안에 authenticateToken 함수를 만들어서 미들웨어로 구성을 했지만 파일을 분리할 경우에는 유지보수성이 높아집니다.


3단계: 컨테이너화 및 클라우드 배포

	•	목표: 애플리케이션을 컨테이너화하고 클라우드 환경에 배포하는 과정 익히기
	•	주요 내용:
	•	Docker 기본 사용법 익히기 (Dockerfile 작성, 이미지 빌드 및 실행)
	•	Docker로 만든 애플리케이션을 AWS ECS 또는 AWS Fargate에 배포하기
	•	AWS CLI 및 IAM Role 설정 방법
	•	ECS에서 오토 스케일링 설정 및 모니터링
	•	실습: 2단계에서 만든 인증 기능이 포함된 애플리케이션을 Docker로 컨테이너화하고, ECS 또는 Fargate에 배포해보기

=> 2단계에서 만들었던 애플리케이션을 Docker를 사용해서 컨테이너화 시키고 Terraform으로 AWS 인프라를 구성했는데 작업하는데 꽤나 많은 오류가 발생했었습니다. 
해결한 내용만 적어보자면 먼저 기존에사용했던 dotenv모듈을 ECS환경에서는 사용할 수 없어 제거 시켰고, ECS의 CPU와 메모리 할당량을 늘렸고, main.tf의 ECS 태스크 정의 부분을 수정하였고, 
마지막으로 도커 이미지를 새로 빌드하였는데 이부분에서 의존성 패키지들을 다시 정의 시키고 프로덕션 환경만 설치하여 다시 빌드시켜서 해결했습니다. 
다음에 IAC를 진행할 때에는 main.tf에 하드코딩하는것이 아닌 모듈화를 진행시켜볼 예정입니다.

4단계: AI 모델 구현 및 최적화

	•	목표: TensorFlow.js를 이용해 간단한 AI 모델을 구현하고 이를 웹 애플리케이션과 연동하기
	•	주요 내용:
	•	ResNet 또는 비슷한 간단한 모델을 TensorFlow.js로 구현
	•	AI 모델 추론 과정에 필요한 프론트엔드 연동 (브라우저에서 모델 로드 및 추론)
	•	Docker로 AI 모델 컨테이너화
	•	GPU 사용을 고려한 Docker 설정 (필요시)
	•	실습: TensorFlow.js로 ResNet 모델을 구현하고, 이를 도커로 컨테이너화해서 간단한 AI 서비스 제공

=> 우선 ResNet 대신 MobileNet모델을 사용하였습니다.(이 모델이 좀더 성능이 좋다고 합니다. AI피셜) 
구축 할때에 Tensorflow설치 오류가 있었는데 기존 최신버전 Nodejs를 nvm을 사용하여 18LTS버전으로 다운그레이드 시켰고 아예** PC를 재부팅후 다시 설치하니 해결** 됬습니다..
그리고 Tensorflow가 윈도우 환경에서는 제대로 작동을 안하는것 같아(계속 네이티브 모듈을 불러오지 못함) Docker로 컨테이너화를 시켜서 해결하였고,
파일타입 에러가 나서 계속 이미지 디코딩을 못해 벡터를 추출하지 못하는 에러가 있었는데 filetype패키지를 추가하여 해결하였습니다. 
(원인은 AI가 할루시네이션 코드{가짜코드}를 제공한것으로 추정하고 있습니다.)
또 이번에는 기존 app.js에 모든 기능을 구현하는것이 아닌 기능별로 파일을 분리시켜 모듈화를 진행하였습니다. 확실히 이렇게 하니 유지보수성이 높아진것 같았습니다. 

5단계: IaC를 활용한 CI/CD 및 DevOps 구축

	•	목표: 애플리케이션 개발 및 배포,인프라 구성 자동화 과정 익히기
	•	주요 내용:
	•	CI/CD 파이프라인 구축 (GitHub Actions, Jenkins 등)
        •	Terraform을 이용한 인프라 자동화
	•	인프라를 코드로 관리 및 코드 변경 시 자동으로 Docker 이미지 빌드 및 ECS/Fargate에 배포
	•	AWS CloudWatch로 애플리케이션 상태 모니터링 및 로그 관리
 	•	IaC를 통한 버전 관리와 복구 용이성 확보
	•	Slack 연동: 팀 슬랙 채널과 연동하여 신규 가입자 알림, 오토스케일링 이벤트 알림을 Slack 메시지로 띄우기
	•	실습: Terraform 또는 CloudFormation을 사용해 ECS와 API Gateway를 포함한 전체 인프라를 코드로 구성하고
 		AWS CodePipeline을 사용하여 자동배포 구성, AWS CloudWatch 알림을 Slack으로 전달받기

6단계: API Gateway 및 사용량 기반 과금 시스템

	•	목표: API Gateway를 통해 사용량 기반의 SaaS 과금 시스템 구현
	•	주요 내용:
	•	AWS API Gateway 설정 및 기본 구성
	•	사용량 한도 설정 (Throttle, Rate Limit) 및 요금 청구 설정
	•	API Gateway와 Lambda, CloudWatch 연동
	•	사용량 기반의 결제 시스템 구현 (Stripe 등 결제 API 연동)
	•	실습: API Gateway를 통해 특정 요청에 대해 사용량 기반 과금 시스템 구현

8단계: 최종 프로젝트: 구독형 SaaS 개발 및 포트폴리오

	•	목표: 앞서 배운 모든 기술을 통합하여 포트폴리오용 구독형 SaaS 서비스 개발
	•	주요 내용:
	•	구독형 모델 설계 (회원제, 트라이얼 기간, 플랜별 차별화)
	•	전체 서비스를 종합한 AI 추론 서비스 제공
	•	API Gateway로 사용량 기반 요금 청구 및 사용자 관리
	•	IaC로 인프라 관리
	•	Slack 연동을 통해 팀 알림 및 오토스케일링 상태 모니터링
	•	실습: 구독형 AI SaaS 서비스를 구축하고, 사용량에 따른 과금, 인프라 관리, 슬랙 알림 시스템까지 완성하여 포트폴리오 작성

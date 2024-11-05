# 프로젝트 설치 및 초기 설정

## 필수 패키지 설치
프로젝트 시작 전, 아래의 필수 패키지를 설치하세요.

```bash
# React Router 설치
npm install react-router-dom

# Axios 설치
npm install axios

# React Icons 설치
npm install react-icons

# 파일 네이밍 규칙

프로젝트의 역할에 따라 컴포넌트 파일명을 명확하게 구분하기 위해 파일 앞에 다음과 같은 접두사를 붙입니다.

## 네이밍 규칙
- 유저 관련 파일: `User` 접두사를 붙입니다.
  - 예: `UserProfile.jsx`, `UserSettings.jsx`
- 업체 관련 파일: `Vendor` 접두사를 붙입니다.
  - 예: `VendorList.jsx`, `VendorDashboard.jsx`
- 관리자 관련 파일: `Admin` 접두사를 붙입니다.
  - 예: `AdminPanel.jsx`, `AdminSettings.jsx`

##CSS 예시
src/
├── components/
│   ├── user/
│   │   ├── UserProfile.jsx
│   │   └── UserSettings.jsx
│   ├── vendor/
│   │   ├── VendorList.jsx
│   │   └── VendorDashboard.jsx
│   └── admin/
│       ├── AdminPanel.jsx
│       └── AdminSettings.jsx



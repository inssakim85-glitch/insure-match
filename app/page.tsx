"use client";

import React, { useState, useRef } from "react";
import {
  Shield,
  Target,
  LogOut,
  Building2,
  RefreshCw,
  Lock,
  UserCheck,
  Search,
  Filter,
  TrendingUp,
  Award,
  FileText,
  Link2,
  Inbox,
  Check,
  PhoneCall,
  Headphones,
  Printer,
  X,
  LayoutDashboard,
  Sparkles,
  MessageSquare,
  BarChart3,
  Megaphone
} from "lucide-react";

// ==========================================
// MOCK DATA : GA 상세 리스트
// ==========================================
const MOCK_GA_FULL_LIST = [
  {
    id: 1,
    rank: "#1 TOP",
    name: "서밋 웰스 파트너스 GA",
    branch: "강남 테헤란 본부",
    totalCommission: "최대 93.5%",
    guaranteedCommission: "최소 88.0% 보장 (경력·실적별 최대 93.5%까지)",
    lifeCommission: "생보 92.0% (12개사 연동)",
    nonLifeCommission: "손보 95.0% (10개사 연동)",
    settlement: "최대 1,500만원 (초기 3개월 지급)",
    dbSupport: "월 30개 무료 지원 (재무상담/보장분석 고품질 DB)",
    retention: "13회차 94.2%",
    rating: "4.9",
    features: [
      "초기 3개월 정착지원금 100% 보장",
      "손보 장기/인보험 수수료 업계 최고 수준 (95%)",
      "강남역 도보 3분 단독 오피스 제공",
      "전문 손해사정사 & 세무사 상주 지원"
    ],
    tags: ["강남권", "단독석제공", "DB무료지원", "초기정착금"]
  },
  {
    id: 2,
    rank: "#2 TOP",
    name: "프리미어 쉴드 GA",
    branch: "서초 지점",
    totalCommission: "최대 91.5%",
    guaranteedCommission: "최소 85.0% 보장 (경력·실적별 최대 91.5%까지)",
    lifeCommission: "생보 90.5% (전 생보사 연동)",
    nonLifeCommission: "손보 92.5% (장기/자동차 수수료 우수)",
    settlement: "최대 1,200만원 지원",
    dbSupport: "월 50개 제공 (퍼널 맞춤형 DB)",
    retention: "13회차 91.8%",
    rating: "4.8",
    features: [
      "디지털 마케팅 DB 전액 지원 정책",
      "당일 수수료 산정 및 익월 10일 정시 지급",
      "초보 설계사 1:1 전담 코칭 시스템"
    ],
    tags: ["서초/교대", "DB최다", "수수료당일지급"]
  },
  {
    id: 3,
    rank: "#3",
    name: "에이스 자산관리 GA",
    branch: "여의도 금융 센터",
    totalCommission: "최대 92.0%",
    guaranteedCommission: "최소 86.0% 보장 (경력·실적별 최대 92.0%까지)",
    lifeCommission: "생보 93.0% (종신/변액 특화)",
    nonLifeCommission: "손보 91.0%",
    settlement: "최대 1,000만원 (일시 정착금 선택 가능)",
    dbSupport: "월 25개 지원 (법인/VIP DB 지원)",
    retention: "13회차 92.5%",
    rating: "4.7",
    features: [
      "법인 컨설팅 및 VIP 영업 전문 지원",
      "변액보험 및 연금 수수료 최고 비율"
    ],
    tags: ["여의도", "법인컨설팅", "VIP DB"]
  }
];

// ==========================================
// MOCK DATA : AI·전문가 매칭 (내 프로필 기반 추천 점수)
// ==========================================
const MOCK_AI_MATCHES = [
  {
    gaId: 1,
    matchScore: 96,
    matchReasons: [
      "희망 근무 지역(강남)과 정확히 일치",
      "손해보험 장기·인보험 전문 조건과 부합",
      "정착지원금 1,000만원 이상 조건 충족"
    ]
  },
  {
    gaId: 2,
    matchScore: 91,
    matchReasons: [
      "희망 근무 지역(서초)과 인접",
      "초기 정착지원금 100% 보장 조건 부합",
      "수수료 당일 산정·정시 지급 정책"
    ]
  },
  {
    gaId: 3,
    matchScore: 84,
    matchReasons: ["손해보험 전문 경력과 부합", "법인·VIP 영업으로 확장 시 유리한 조건"]
  }
];

// ==========================================
// MOCK DATA : 국내 전체 손해보험사 / 생명보험사 상세 전산 & 수수료표
// ==========================================
const MOCK_INSURERS_DETAIL = {
  life: [
    { name: "신한라이프", code: "L01", phone: "1588-5580", inCall: "1522-2285", fax: "가상번호 부여", status: "연동완료", maxCommission: "92.5%", firstMonth: "585%", total12: "1150%" },
    { name: "미래에셋생명", code: "L02", phone: "1588-6363", inCall: "1588-6363", fax: "가상번호 부여", status: "연동완료", maxCommission: "93.0%", firstMonth: "590%", total12: "1160%" },
    { name: "한화생명", code: "L03", phone: "1588-6363", inCall: "1800-6633", fax: "가상번호 부여", status: "연동완료", maxCommission: "92.0%", firstMonth: "590%", total12: "1140%" },
    { name: "삼성생명", code: "L04", phone: "1588-3114", inCall: "1588-3115", fax: "가상번호 부여", status: "연동완료", maxCommission: "91.5%", firstMonth: "580%", total12: "1120%" },
    { name: "교보생명", code: "L05", phone: "1588-1001", inCall: "1588-1636", fax: "가상번호 부여", status: "연동완료", maxCommission: "90.8%", firstMonth: "570%", total12: "1110%" },
    { name: "흥국생명", code: "L06", phone: "1588-2288", inCall: "1577-7006", fax: "가상번호 부여", status: "연동완료", maxCommission: "92.5%", firstMonth: "600%", total12: "1150%" },
    { name: "푸본현대생명", code: "L07", phone: "1577-3311", inCall: "1577-3311", fax: "0505-106-0311", status: "연동완료", maxCommission: "91.0%", firstMonth: "580%", total12: "1120%" },
    { name: "iM라이프", code: "L08", phone: "1588-4770", inCall: "1588-4770", fax: "0505-083-5420", status: "연동완료", maxCommission: "91.5%", firstMonth: "585%", total12: "1125%" },
    { name: "KDB생명", code: "L09", phone: "1588-4040", inCall: "1588-4040", fax: "02-2669-7939", status: "연동완료", maxCommission: "91.2%", firstMonth: "580%", total12: "1120%" },
    { name: "KB라이프", code: "L10", phone: "1588-3374", inCall: "1566-2730", fax: "02-6220-9912", status: "연동완료", maxCommission: "93.0%", firstMonth: "610%", total12: "1160%" },
    { name: "DB생명", code: "L11", phone: "1588-3131", inCall: "1588-3131", fax: "가상번호 부여", status: "연동완료", maxCommission: "92.0%", firstMonth: "590%", total12: "1140%" },
    { name: "동양생명", code: "L12", phone: "1577-1004", inCall: "1577-1004", fax: "가상번호 부여", status: "연동완료", maxCommission: "92.8%", firstMonth: "600%", total12: "1155%" },
    { name: "AIA생명", code: "L13", phone: "1588-9595", inCall: "1588-9595", fax: "가상번호 부여", status: "연동완료", maxCommission: "91.8%", firstMonth: "580%", total12: "1130%" },
    { name: "MetLife생명", code: "L14", phone: "1588-9600", inCall: "1588-9600", fax: "가상번호 부여", status: "연동완료", maxCommission: "93.5%", firstMonth: "610%", total12: "1170%" },
    { name: "ABL생명", code: "L15", phone: "1588-4433", inCall: "1588-4433", fax: "가상번호 부여", status: "연동완료", maxCommission: "91.0%", firstMonth: "575%", total12: "1120%" },
    { name: "라이나생명", code: "L16", phone: "1588-0058", inCall: "1588-0058", fax: "가상번호 부여", status: "연동완료", maxCommission: "94.0%", firstMonth: "620%", total12: "1180%" },
    { name: "NH농협생명", code: "L17", phone: "1544-2000", inCall: "1544-2000", fax: "가상번호 부여", status: "연동완료", maxCommission: "91.5%", firstMonth: "580%", total12: "1130%" },
    { name: "하나생명", code: "L18", phone: "1577-1112", inCall: "1577-1112", fax: "가상번호 부여", status: "연동완료", maxCommission: "90.5%", firstMonth: "570%", total12: "1110%" },
    { name: "처브라이프", code: "L19", phone: "1599-5500", inCall: "1599-5500", fax: "가상번호 부여", status: "연동완료", maxCommission: "91.2%", firstMonth: "580%", total12: "1125%" },
    { name: "BNP파리바카디프", code: "L20", phone: "1688-1118", inCall: "1688-1118", fax: "가상번호 부여", status: "연동완료", maxCommission: "90.0%", firstMonth: "560%", total12: "1100%" },
    { name: "IBK연금보험", code: "L21", phone: "1577-1300", inCall: "1577-1300", fax: "가상번호 부여", status: "연동완료", maxCommission: "89.5%", firstMonth: "550%", total12: "1090%" },
    { name: "교보라이프플래닛", code: "L22", phone: "1566-0999", inCall: "1566-0999", fax: "가상번호 부여", status: "연동완료", maxCommission: "90.0%", firstMonth: "560%", total12: "1100%" }
  ],
  nonLife: [
    { name: "삼성화재", code: "N01", phone: "1588-5114", inCall: "1588-5114", fax: "가상번호 부여", status: "연동완료", maxCommission: "95.0%", firstMonth: "650%", total12: "1180%" },
    { name: "현대해상", code: "N02", phone: "1588-5644", inCall: "1588-5644", fax: "가상번호 부여", status: "연동완료", maxCommission: "94.5%", firstMonth: "640%", total12: "1175%" },
    { name: "DB손해보험", code: "N03", phone: "1588-0100", inCall: "1588-0100", fax: "가상번호 부여", status: "연동완료", maxCommission: "94.8%", firstMonth: "660%", total12: "1190%" },
    { name: "KB손해보험", code: "N04", phone: "1544-0114", inCall: "1544-0114", fax: "가상번호 부여", status: "연동완료", maxCommission: "93.8%", firstMonth: "630%", total12: "1160%" },
    { name: "메리츠화재", code: "N05", phone: "1566-7711", inCall: "1566-7711", fax: "가상번호 부여", status: "연동완료", maxCommission: "95.2%", firstMonth: "670%", total12: "1195%" },
    { name: "한화손해보험", code: "N06", phone: "1566-8000", inCall: "1566-8000", fax: "가상번호 부여", status: "연동완료", maxCommission: "93.0%", firstMonth: "620%", total12: "1150%" },
    { name: "흥국화재", code: "N07", phone: "1688-1688", inCall: "1688-1688", fax: "가상번호 부여", status: "연동완료", maxCommission: "92.5%", firstMonth: "610%", total12: "1140%" },
    { name: "롯데손해보험", code: "N08", phone: "1588-3344", inCall: "1588-3344", fax: "가상번호 부여", status: "연동완료", maxCommission: "93.5%", firstMonth: "630%", total12: "1165%" },
    { name: "MG손해보험", code: "N09", phone: "1588-5959", inCall: "1588-5959", fax: "가상번호 부여", status: "연동완료", maxCommission: "92.0%", firstMonth: "600%", total12: "1135%" },
    { name: "NH농협손해보험", code: "N10", phone: "1644-9000", inCall: "1644-9000", fax: "가상번호 부여", status: "연동완료", maxCommission: "93.2%", firstMonth: "625%", total12: "1155%" },
    { name: "하나손해보험", code: "N11", phone: "1566-3000", inCall: "1566-3000", fax: "가상번호 부여", status: "연동완료", maxCommission: "92.0%", firstMonth: "610%", total12: "1140%" },
    { name: "AXA손해보험", code: "N12", phone: "1566-1566", inCall: "1566-1566", fax: "가상번호 부여", status: "연동완료", maxCommission: "91.5%", firstMonth: "600%", total12: "1130%" },
    { name: "캐롯손해보험", code: "N13", phone: "1566-0300", inCall: "1566-0300", fax: "가상번호 부여", status: "연동완료", maxCommission: "91.0%", firstMonth: "590%", total12: "1120%" }
  ]
};

// ==========================================
// MOCK DATA : FC가 받은 GA 역경매 제안함 (Inbox)
// ==========================================
const MOCK_OFFERS_RECEIVED = [
  {
    id: 101,
    gaName: "서밋 웰스 파트너스 GA (강남본부)",
    offeredCommission: "총 93.5% (손보 95.0% / 생보 92.0%)",
    offeredSettlement: "정착지원금 1,500만원 (첫 달 500만 지급)",
    offeredDb: "월 35개 고품질 DB 무료 분배",
    status: "대기중",
    date: "2026-08-04",
    message: "선생님의 손보 경력과 높은 유지율을 높이 평가하여 최우선 스카우트 조건으로 입찰합니다. 강남역 단독 오피스 좌석 지원합니다."
  },
  {
    id: 102,
    gaName: "프리미어 쉴드 GA (서초지점)",
    offeredCommission: "총 92.0% (손보 93.5% / 생보 90.5%)",
    offeredSettlement: "정착지원금 1,200만원 (매월 200만x6개월)",
    offeredDb: "월 50개 DB 제공 (보장분석 위주)",
    status: "대기중",
    date: "2026-08-03",
    message: "원하시는 조건 이상으로 DB 세팅이 가능합니다. 수수료 당일지급 시스템을 운영 중입니다."
  }
];

// ==========================================
// MOCK DATA : GA가 보는 이직 희망 설계사(FC) 후보 리스트
// ==========================================
const MOCK_FC_CANDIDATES = [
  {
    id: 201,
    nickname: "강남 7년차 손보에이스",
    exp: "7년차",
    mainField: "손해보험 전문 (장기/인보험/자동차)",
    salesRange: "월 평균 185만원",
    retentionRate: "13회차 90.1%",
    isVerified: true,
    minCommission: "92% 이상",
    minSettlement: "1,000만원 이상",
    preferredRegion: "서울 강남 / 서초 / 송파",
    memo: "단독석 제공 및 초기 정착지원 우수 지점 선호합니다."
  },
  {
    id: 202,
    nickname: "분당 4년차 생보라이징",
    exp: "4년차",
    mainField: "생명보험 전문",
    salesRange: "월 평균 132만원",
    retentionRate: "13회차 88.4%",
    isVerified: true,
    minCommission: "88% 이상",
    minSettlement: "500만원 이상",
    preferredRegion: "경기 분당 / 판교",
    memo: "재무설계 상담 위주로 영업하고 있어 고품질 DB 지원을 중요하게 봅니다."
  },
  {
    id: 203,
    nickname: "여의도 10년차 법인전문",
    exp: "10년차 이상",
    mainField: "법인영업 전문",
    salesRange: "월 평균 410만원",
    retentionRate: "13회차 95.3%",
    isVerified: false,
    minCommission: "94% 이상",
    minSettlement: "2,000만원 이상",
    preferredRegion: "서울 여의도 / 종로",
    memo: "법인 CEO 플랜, 퇴직연금 컨설팅 경력 위주입니다. 세무사/손해사정사 지원은 필수 조건입니다."
  }
];

// ==========================================
// FC 프로필 드롭다운 후보 목록
// ==========================================
const CAREER_OPTIONS = [
  "1년차",
  "2년차",
  "3년차",
  "4년차",
  "5년차",
  "6년차",
  "7년차",
  "8년차",
  "9년차",
  "10년차",
  "10년차 이상"
];

const MAIN_FIELD_OPTIONS = [
  "생명보험 전문",
  "손해보험 전문 (장기/인보험/자동차)",
  "생손해 통합",
  "법인영업 전문",
  "연금/변액 전문",
  "기타"
];

// ==========================================
// GA 프로필 어필 조건 드롭다운 후보 목록
// ==========================================
const DB_SUPPORT_OPTIONS = [
  "미지원",
  "월 10개 무료 지원",
  "월 20개 무료 지원",
  "월 30개 무료 지원",
  "월 50개 이상 무료 지원",
  "무료 지원은 없지만 할인가로 제공"
];

// ==========================================
// 랜딩 페이지 콘텐츠
// ==========================================
const LANDING_PROBLEMS = [
  {
    no: "Problem 01",
    title: "GA마다 조건이 달라 비교가 어려움",
    desc: "수수료율, 지원금, 전산 시스템, 교육 프로그램까지 GA사마다 제각각이라 정확한 비교가 쉽지 않습니다."
  },
  {
    no: "Problem 02",
    title: "정보가 부족한 채로 결정",
    desc: "지인 소개나 단편적인 정보에만 의존하다 보니, 내게 정말 맞는 곳인지 확신 없이 이직을 결정하게 됩니다."
  },
  {
    no: "Problem 03",
    title: "계약 승계·수수료 손실 리스크",
    desc: "이직 과정에서 발생할 수 있는 계약 승계 문제와 수수료 손실을 사전에 파악하지 못해 손해를 보는 경우가 많습니다."
  }
];

const LANDING_STEPS = [
  {
    no: "1",
    title: "무료 프로필 등록",
    desc: "경력, 실적, 희망 지역과 조건을 3분 안에 입력하세요. 개인정보는 익명으로 안전하게 보호됩니다."
  },
  {
    no: "2",
    title: "AI·전문가 매칭",
    desc: "87개 제휴 GA사의 조건 데이터를 기반으로 나에게 가장 적합한 GA를 자동으로 추천합니다."
  },
  {
    no: "3",
    title: "후보 GA 비교",
    desc: "수수료율, 지원제도, 전산환경을 카드 형태로 한눈에 비교하고 궁금한 점을 바로 질문하세요."
  },
  {
    no: "4",
    title: "제안 수락",
    desc: "마음에 드는 GA의 제안을 역경매 제안함에서 바로 수락하고 위촉 절차를 시작하세요."
  }
];

const LANDING_FEATURES = [
  { icon: TrendingUp, title: "객관적인 비교 데이터", desc: "주관적 후기가 아닌, 검증된 조건 데이터를 기반으로 투명하게 비교해드립니다." },
  { icon: Lock, title: "철저한 개인정보 보호", desc: "희망하시면 익명으로 탐색이 가능하며, 동의 없이 정보가 공유되지 않습니다." },
  { icon: Shield, title: "위촉 후 사후관리", desc: "이직 이후에도 정착 지원, 애로사항 상담 등 지속적인 관리를 제공합니다." }
];

const LANDING_TESTIMONIALS = [
  {
    initial: "김",
    name: "김OO 설계사",
    meta: "경력 7년차 · 이직 완료",
    quote: "조건을 하나하나 비교해주셔서 결정이 훨씬 쉬웠어요. 이전 GA보다 수수료 조건이 확실히 좋아졌습니다.",
    tag: "수수료 조건 개선"
  },
  {
    initial: "이",
    name: "이OO 설계사",
    meta: "신입 · 첫 위촉",
    quote: "신입이라 막막했는데 매니저님이 제 상황에 맞는 GA를 직접 골라주셔서 안심하고 시작할 수 있었어요.",
    tag: "신입 정착 지원"
  },
  {
    initial: "박",
    name: "박OO 설계사",
    meta: "경력 12년차 · 이직 완료",
    quote: "익명으로 먼저 조건을 살펴볼 수 있어서 부담 없이 시작했고, 계약 승계 문제도 꼼꼼히 챙겨주셨습니다.",
    tag: "계약 승계 지원"
  }
];

const GA_CTA_POINTS = [
  "경력·실적이 검증된 설계사 데이터베이스 접근",
  "채용 조건에 맞는 설계사 자동 매칭",
  "채용 프로세스 및 소요 비용 절감",
  "AI 매칭 기반 맞춤 후보 큐레이션 제공"
];

const GA_CTA_STATS = [
  { label: "평균 채용 소요 기간 단축", value: "-42%" },
  { label: "매칭 후 위촉 성사율", value: "68%" },
  { label: "제휴 GA사 재이용률", value: "91%" },
  { label: "월 평균 신규 매칭 문의", value: "320건" }
];

// ==========================================
// MOCK DATA : 커뮤니티 게시글
// ==========================================
const MOCK_COMMUNITY_POSTS = [
  {
    id: 1,
    author: "김OO 설계사",
    role: "FC",
    badge: "이직 완료",
    title: "조건 비교표 덕분에 결정이 훨씬 쉬웠어요",
    content:
      "조건을 하나하나 비교해주셔서 결정이 훨씬 쉬웠어요. 이전 GA보다 수수료 조건이 확실히 좋아졌습니다. 익명으로 먼저 살펴볼 수 있어서 부담도 없었어요.",
    tag: "수수료 조건 개선",
    likes: 24,
    comments: 6,
    date: "2026-07-28",
    reported: false,
    reportReason: ""
  },
  {
    id: 2,
    author: "이OO 설계사",
    role: "FC",
    badge: "신입 · 첫 위촉",
    title: "신입인데도 저에게 맞는 GA를 찾을 수 있었어요",
    content:
      "신입이라 막막했는데 매니저님이 제 상황에 맞는 GA를 직접 골라주셔서 안심하고 시작할 수 있었어요. 정착지원금 조건도 꼼꼼히 비교해봤습니다.",
    tag: "신입 정착 지원",
    likes: 18,
    comments: 9,
    date: "2026-07-22",
    reported: false,
    reportReason: ""
  },
  {
    id: 3,
    author: "박OO 설계사",
    role: "FC",
    badge: "이직 완료",
    title: "계약 승계 문제까지 꼼꼼히 챙겨주셨어요",
    content:
      "익명으로 먼저 조건을 살펴볼 수 있어서 부담 없이 시작했고, 계약 승계 문제도 꼼꼼히 챙겨주셨습니다. 이직 후에도 정착 지원을 받고 있어요.",
    tag: "계약 승계 지원",
    likes: 31,
    comments: 12,
    date: "2026-07-15",
    reported: false,
    reportReason: ""
  },
  {
    id: 4,
    author: "프리미어 쉴드 GA",
    role: "GA",
    badge: "GA 매니저",
    title: "역경매로 올려주신 프로필, 조건 맞춰 바로 제안 드립니다",
    content:
      "익명 프로필이라도 경력과 실적 데이터가 명확해서 GA 입장에서도 조건을 구체적으로 제안하기 좋습니다. 관심 있으신 분들은 편하게 프로필 등록해보세요.",
    tag: "GA 파트너 후기",
    likes: 12,
    comments: 3,
    date: "2026-07-10",
    reported: true,
    reportReason: "특정 GA 홍보성 게시글로 신고 접수 (1건)"
  }
];

// ==========================================
// MOCK DATA : 관리자 - 가입 설계사(FC) 계정 관리
// ==========================================
const MOCK_ADMIN_FC_USERS = [
  {
    id: 1,
    nickname: "강남 7년차 손보에이스",
    mainField: "손해보험 전문 (장기/인보험/자동차)",
    exp: "7년차",
    joinedDate: "2026-03-14",
    verified: true,
    status: "활성",
    verificationStatus: "승인됨",
    salesRange: "월 평균 185만원",
    retentionRate: "13회차 90.1%"
  },
  {
    id: 2,
    nickname: "분당 4년차 생보라이징",
    mainField: "생명보험 전문",
    exp: "4년차",
    joinedDate: "2026-04-02",
    verified: true,
    status: "활성",
    verificationStatus: "승인됨",
    salesRange: "월 평균 132만원",
    retentionRate: "13회차 88.4%"
  },
  {
    id: 3,
    nickname: "여의도 10년차 법인전문",
    mainField: "법인영업 전문",
    exp: "10년차 이상",
    joinedDate: "2026-05-19",
    verified: false,
    status: "휴면",
    verificationStatus: "심사중",
    salesRange: "월 평균 410만원",
    retentionRate: "13회차 95.3%"
  },
  {
    id: 4,
    nickname: "일산 2년차 신입FC",
    mainField: "생손해 통합",
    exp: "2년차",
    joinedDate: "2026-07-30",
    verified: false,
    status: "정지",
    verificationStatus: "반려됨",
    salesRange: "월 평균 45만원",
    retentionRate: "제출 자료 없음"
  }
];

// ==========================================
// MOCK DATA : 관리자 - 가입 GA 계정 관리
// ==========================================
const MOCK_ADMIN_GA_USERS = [
  {
    id: 1,
    gaName: "서밋 웰스 파트너스 GA",
    branch: "강남 테헤란 본부",
    contactName: "이수현 매니저",
    contactPhone: "010-2222-3333",
    joinedDate: "2025-11-02",
    commissionMin: "88",
    commissionMax: "93.5",
    exposureStatus: "노출중",
    exposurePlan: "TOP"
  },
  {
    id: 2,
    gaName: "프리미어 쉴드 GA",
    branch: "서초 지점",
    contactName: "김민준 매니저",
    contactPhone: "010-1234-5678",
    joinedDate: "2026-01-20",
    commissionMin: "85",
    commissionMax: "91.5",
    exposureStatus: "노출중",
    exposurePlan: "TOP"
  },
  {
    id: 3,
    gaName: "에이스 자산관리 GA",
    branch: "여의도 금융 센터",
    contactName: "박지훈 매니저",
    contactPhone: "010-4444-5555",
    joinedDate: "2026-02-14",
    commissionMin: "86",
    commissionMax: "92.0",
    exposureStatus: "노출중",
    exposurePlan: "STANDARD"
  },
  {
    id: 4,
    gaName: "블루오션 파트너스 GA",
    branch: "부산 해운대 본부",
    contactName: "최유리 매니저",
    contactPhone: "010-7777-8888",
    joinedDate: "2026-08-01",
    commissionMin: "80",
    commissionMax: "88.0",
    exposureStatus: "승인대기",
    exposurePlan: "STANDARD"
  }
];

// ==========================================
// MOCK DATA : 관리자 - 광고 노출 상품(요금제)
// ==========================================
const EXPOSURE_PLANS = [
  {
    id: "TOP",
    name: "TOP 배지 플랜",
    price: "월 990,000원",
    desc: "주요 GA 탭 상단 고정 노출 + TOP 배지 부여 + AI추천 결과 우선 노출"
  },
  {
    id: "STANDARD",
    name: "스탠다드 플랜",
    price: "월 390,000원",
    desc: "주요 GA 탭 일반 노출 + AI추천 매칭 후보 포함"
  },
  {
    id: "BASIC",
    name: "베이직 (무료) 플랜",
    price: "무료",
    desc: "GA 정보 등록만 가능하며, 주요 GA·AI추천 화면에는 노출되지 않습니다."
  }
];

// ==========================================
// MOCK DATA : 관리자 - 매출/정산 내역
// ==========================================
const MOCK_ADMIN_INVOICES = [
  {
    id: 1,
    gaName: "서밋 웰스 파트너스 GA",
    plan: "TOP 배지 플랜",
    amount: 990000,
    status: "결제완료",
    billingDate: "2026-08-01"
  },
  {
    id: 2,
    gaName: "프리미어 쉴드 GA",
    plan: "TOP 배지 플랜",
    amount: 990000,
    status: "결제완료",
    billingDate: "2026-08-01"
  },
  {
    id: 3,
    gaName: "에이스 자산관리 GA",
    plan: "스탠다드 플랜",
    amount: 390000,
    status: "미납",
    billingDate: "2026-08-01"
  },
  {
    id: 4,
    gaName: "블루오션 파트너스 GA",
    plan: "스탠다드 플랜",
    amount: 390000,
    status: "예정",
    billingDate: "2026-09-01"
  }
];

// ==========================================
// MOCK DATA : 관리자 - 가입 추이 / 매칭 통계
// ==========================================
const MOCK_SIGNUP_TREND = [
  { month: "3월", fc: 12, ga: 2 },
  { month: "4월", fc: 18, ga: 3 },
  { month: "5월", fc: 25, ga: 4 },
  { month: "6월", fc: 31, ga: 5 },
  { month: "7월", fc: 40, ga: 6 },
  { month: "8월", fc: 22, ga: 3 }
];

const MOCK_MATCH_STATS = { pending: 34, matched: 58, rejected: 21 };

// ==========================================
// MOCK DATA : 관리자 - 공지사항 / 관리자 계정 / 활동 로그 초기값
// ==========================================
const MOCK_ANNOUNCEMENTS = [
  { id: 1, title: "여름 시즌 신규 GA 파트너 프로모션 안내", target: "GA", active: true, date: "2026-08-01" },
  { id: 2, title: "설계사 익명 프로필 작성 가이드 업데이트", target: "FC", active: true, date: "2026-07-20" },
  { id: 3, title: "8월 정기 점검 안내 (8/15 새벽 2시~4시)", target: "전체", active: false, date: "2026-08-05" }
];

const MOCK_ADMIN_ACCOUNTS = [
  { id: 1, name: "김운영 (나)", email: "admin@insurematch.co.kr", role: "최고관리자", status: "활성" },
  { id: 2, name: "박모더", email: "moderator1@insurematch.co.kr", role: "모더레이터", status: "활성" },
  { id: 3, name: "이운영진", email: "ops2@insurematch.co.kr", role: "운영진", status: "활성" }
];

const MOCK_ACTIVITY_LOG = [
  {
    id: 1,
    actor: "김운영 (나)",
    action: "GA '서밋 웰스 파트너스 GA'의 노출 상태를 '노출중'으로 승인했습니다.",
    timestamp: "2026-08-04 14:22"
  },
  {
    id: 2,
    actor: "박모더",
    action: "커뮤니티 게시글 신고를 검토하고 해제했습니다.",
    timestamp: "2026-08-03 10:05"
  },
  {
    id: 3,
    actor: "이운영진",
    action: "설계사 '여의도 10년차 법인전문'의 인증 서류 심사를 시작했습니다.",
    timestamp: "2026-08-02 09:40"
  }
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authView, setAuthView] = useState<"LANDING" | "LOGIN">("LANDING");
  const loginCardRef = useRef<HTMLDivElement>(null);
  const [userRole, setUserRole] = useState<"FC" | "GA" | "ADMIN">("FC");
  const [mainTab, setMainTab] = useState<
    | "AI_MATCH"
    | "GA_LIST"
    | "INSURER_CONNECT"
    | "OFFERS_INBOX"
    | "FC_PROFILE"
    | "GA_HOME"
    | "FC_CANDIDATES"
    | "SENT_OFFERS"
    | "GA_PROFILE"
    | "COMMUNITY"
    | "ADMIN_HOME"
    | "ADMIN_FC"
    | "ADMIN_VERIFICATION"
    | "ADMIN_GA"
    | "ADMIN_PLANS"
    | "ADMIN_BILLING"
    | "ADMIN_STATS"
    | "ADMIN_COMMUNITY"
    | "ADMIN_ANNOUNCEMENTS"
    | "ADMIN_ACCOUNTS"
    | "ADMIN_LOG"
  >("GA_LIST");
  const [isAutoSyncing, setIsAutoSyncing] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // 주요 GA 탭 전용 검색 State (전체 제휴 GA 대상 검색)
  const [gaListSearchQuery, setGaListSearchQuery] = useState("");

  // INSURER_CONNECT 전용 내부 검색 & 필터 State
  const [insurerSearchQuery, setInsurerSearchQuery] = useState("");
  const [insurerFilterTab, setInsurerFilterTab] = useState<"ALL" | "LIFE" | "NON_LIFE">("ALL");

  // GA 로그인 Form State
  const [gaBusinessNum, setGaBusinessNum] = useState("");
  const [gaCode, setGaCode] = useState("");

  // 관리자 로그인 Form State
  const [adminId, setAdminId] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  // FC 익명 프로필 State
  const [profile, setProfile] = useState({
    nickname: "강남 7년차 손보에이스",
    exp: "7년차",
    mainField: "손해보험 전문 (장기/인보험/자동차)",
    salesRange: "월 평균 185만원 (국세청 홈택스 연동)",
    retentionRate: "13회차 90.1% (e-클린보험 연동)",
    isVerified: true,
    minCommission: "92% 이상",
    minSettlement: "1,000만원 이상",
    preferredRegion: "서울 강남 / 서초 / 송파",
    memo: "단독석 제공 및 초기 정착지원 우수 지점 선호합니다."
  });

  // AI 추천 GA 탭 - 원하는 조건 선택 State
  const [aiPreferences, setAiPreferences] = useState({
    region: "서울 강남 / 서초 / 송파",
    field: "손해보험 전문 (장기/인보험/자동차)",
    priority: "수수료율"
  });
  const [showAiMatches, setShowAiMatches] = useState(false);

  const handleFindAiMatches = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAiMatches(true);
  };

  // 카카오/네이버 FC 로그인
  const handleSocialLogin = (provider: "kakao" | "naver") => {
    setIsLoggedIn(true);
    setMainTab("GA_LIST");
  };

  // 랜딩 페이지 -> 로그인/회원가입 화면 진입
  const openLogin = (role: "FC" | "GA" | "ADMIN") => {
    setUserRole(role);
    setAuthView("LOGIN");
  };

  // GA 로그인
  const handleGaLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gaBusinessNum || !gaCode) {
      alert("사업자등록번호와 GA 승인 코드를 모두 입력해 주세요.");
      return;
    }
    setIsLoggedIn(true);
    setMainTab("GA_HOME");
  };

  // 관리자 로그인
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminId || !adminPassword) {
      alert("관리자 계정과 비밀번호를 모두 입력해 주세요.");
      return;
    }
    setIsLoggedIn(true);
    setMainTab("ADMIN_HOME");
  };

  // 간편인증 데이터 자동 연동
  const handleAutoFetchData = () => {
    setIsAutoSyncing(true);
    setTimeout(() => {
      setIsAutoSyncing(false);
      setProfile((prev) => ({
        ...prev,
        exp: "7년차",
        salesRange: "월 평균 185만원 (국세청 홈택스 연동)",
        retentionRate: "13회차 90.1% (e-클린보험 연동)",
        isVerified: true
      }));
      alert("카카오 간편인증이 완료되었습니다!\n국세청 사업소득 및 보험협회 경력/유지율 데이터가 자동 연동되었습니다.");
    }, 1200);
  };

  // 프로필 저장 (미리보기 팝업 먼저 오픈)
  const handleOpenPreview = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPreviewModal(true);
  };

  // 미리보기 팝업에서 최종 확인 시 실제 등록 처리
  const handleConfirmSubmit = () => {
    setShowPreviewModal(false);
    alert("익명 프로필 저장 및 역경매 등록이 완료되었습니다!\nGA 전체 현황 비교 화면으로 이동합니다.");
    setMainTab("GA_LIST");
  };

  // ==========================================
  // GA 모드 전용 State
  // ==========================================
  // 설계사 후보에게 보낼 제안 작성 대상 (null이면 모달 닫힘)
  const [offerTarget, setOfferTarget] = useState<(typeof MOCK_FC_CANDIDATES)[number] | null>(null);
  const [offerForm, setOfferForm] = useState({ commission: "", settlement: "", db: "", message: "" });

  // 이 GA가 보낸 제안 목록
  const [sentOffers, setSentOffers] = useState<
    Array<{
      id: number;
      candidateNickname: string;
      offeredCommission: string;
      offeredSettlement: string;
      offeredDb: string;
      message: string;
      status: "대기중" | "매칭 완료" | "거절됨";
      date: string;
      candidatePhone: string;
    }>
  >([]);

  // 우리 GA 기본 정보 (최종 제안 조건은 설계사마다 달라 여기서는 어필 가능한 범위만 관리)
  const [gaProfile, setGaProfile] = useState({
    gaName: "프리미어 쉴드 GA",
    branch: "서초 지점",
    contactName: "김민준 매니저",
    contactPhone: "010-1234-5678",
    commissionMin: "88",
    commissionMax: "93",
    settlementSupportPercent: "100",
    dbSupport: "월 30개 무료 지원",
    intro: "설계사 개개인의 경력과 실적에 맞춰 최적의 조건을 개별 제안드립니다."
  });

  // 설계사 후보 리스트 검색 · 필터 · 정렬 State
  const [candidateSearchQuery, setCandidateSearchQuery] = useState("");
  const [candidateFieldFilter, setCandidateFieldFilter] = useState("ALL");
  const [candidateSort, setCandidateSort] = useState("SALES_DESC");

  // ==========================================
  // 관리자 모드 전용 State
  // ==========================================
  const [adminFcUsers, setAdminFcUsers] = useState(MOCK_ADMIN_FC_USERS);
  const [adminGaUsers, setAdminGaUsers] = useState(MOCK_ADMIN_GA_USERS);
  const [communityPosts, setCommunityPosts] = useState(MOCK_COMMUNITY_POSTS);
  const [adminFcSearchQuery, setAdminFcSearchQuery] = useState("");
  const [adminGaSearchQuery, setAdminGaSearchQuery] = useState("");
  const [adminInvoices, setAdminInvoices] = useState(MOCK_ADMIN_INVOICES);
  const [announcements, setAnnouncements] = useState(MOCK_ANNOUNCEMENTS);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: "", target: "전체" });
  const [adminAccounts, setAdminAccounts] = useState(MOCK_ADMIN_ACCOUNTS);
  const [newAdminAccount, setNewAdminAccount] = useState({ name: "", email: "", role: "운영진" });
  const [activityLog, setActivityLog] = useState(MOCK_ACTIVITY_LOG);
  const [adminDetailTarget, setAdminDetailTarget] = useState<{ type: "FC" | "GA"; id: number } | null>(null);

  // 관리자 활동 로그 기록
  const logActivity = (action: string) => {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    const timestamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(
      now.getHours()
    )}:${pad(now.getMinutes())}`;
    setActivityLog((prev) => [{ id: prev.length + 1, actor: "김운영 (나)", action, timestamp }, ...prev]);
  };

  // 설계사 계정 상태 변경 (활성 ↔ 정지)
  const handleToggleFcStatus = (id: number) => {
    const target = adminFcUsers.find((fc) => fc.id === id);
    const nextStatus = target?.status === "정지" ? "활성" : "정지";
    setAdminFcUsers((prev) => prev.map((fc) => (fc.id === id ? { ...fc, status: nextStatus } : fc)));
    if (target) logActivity(`설계사 '${target.nickname}' 계정을 '${nextStatus}' 상태로 변경했습니다.`);
  };

  // GA 노출 승인/보류 처리
  const handleUpdateGaExposure = (id: number, status: "노출중" | "보류/비노출") => {
    const target = adminGaUsers.find((ga) => ga.id === id);
    setAdminGaUsers((prev) => prev.map((ga) => (ga.id === id ? { ...ga, exposureStatus: status } : ga)));
    if (target) logActivity(`GA '${target.gaName}'의 노출 상태를 '${status}'(으)로 변경했습니다.`);
  };

  // GA 노출 상품(요금제) 변경
  const handleUpdateGaPlan = (id: number, plan: string) => {
    const target = adminGaUsers.find((ga) => ga.id === id);
    setAdminGaUsers((prev) => prev.map((ga) => (ga.id === id ? { ...ga, exposurePlan: plan } : ga)));
    if (target) {
      const planName = EXPOSURE_PLANS.find((p) => p.id === plan)?.name ?? plan;
      logActivity(`GA '${target.gaName}'의 노출 상품을 '${planName}'(으)로 변경했습니다.`);
    }
  };

  // 설계사 인증 서류 심사 처리
  const handleReviewVerification = (id: number, decision: "승인됨" | "반려됨") => {
    const target = adminFcUsers.find((fc) => fc.id === id);
    setAdminFcUsers((prev) =>
      prev.map((fc) =>
        fc.id === id ? { ...fc, verificationStatus: decision, verified: decision === "승인됨" } : fc
      )
    );
    if (target) logActivity(`설계사 '${target.nickname}'의 인증 심사를 '${decision}' 처리했습니다.`);
  };

  // 정산 내역 결제 확인 처리
  const handleConfirmPayment = (id: number) => {
    const target = adminInvoices.find((inv) => inv.id === id);
    setAdminInvoices((prev) => prev.map((inv) => (inv.id === id ? { ...inv, status: "결제완료" } : inv)));
    if (target) logActivity(`GA '${target.gaName}'의 정산 건을 '결제완료' 처리했습니다.`);
  };

  // 커뮤니티 게시글 신고 해제
  const handleDismissReport = (id: number) => {
    const target = communityPosts.find((post) => post.id === id);
    setCommunityPosts((prev) => prev.map((post) => (post.id === id ? { ...post, reported: false } : post)));
    if (target) logActivity(`커뮤니티 게시글 '${target.title}'의 신고를 해제했습니다.`);
  };

  // 커뮤니티 게시글 삭제
  const handleDeletePost = (id: number) => {
    if (!confirm("이 게시글을 삭제하시겠습니까?")) return;
    const target = communityPosts.find((post) => post.id === id);
    setCommunityPosts((prev) => prev.filter((post) => post.id !== id));
    if (target) logActivity(`커뮤니티 게시글 '${target.title}'을(를) 삭제했습니다.`);
  };

  // 공지사항 등록
  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncement.title) {
      alert("공지 제목을 입력해 주세요.");
      return;
    }
    const today = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    const dateStr = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
    setAnnouncements((prev) => [
      { id: prev.length + 1, title: newAnnouncement.title, target: newAnnouncement.target, active: true, date: dateStr },
      ...prev
    ]);
    logActivity(`공지사항 '${newAnnouncement.title}'을(를) 등록했습니다.`);
    setNewAnnouncement({ title: "", target: "전체" });
  };

  // 공지사항 활성/비활성 토글
  const handleToggleAnnouncement = (id: number) => {
    setAnnouncements((prev) => prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a)));
  };

  // 공지사항 삭제
  const handleDeleteAnnouncement = (id: number) => {
    if (!confirm("이 공지사항을 삭제하시겠습니까?")) return;
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  // 관리자 계정 초대
  const handleInviteAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminAccount.name || !newAdminAccount.email) {
      alert("이름과 이메일을 모두 입력해 주세요.");
      return;
    }
    setAdminAccounts((prev) => [
      ...prev,
      { id: prev.length + 1, name: newAdminAccount.name, email: newAdminAccount.email, role: newAdminAccount.role, status: "활성" }
    ]);
    logActivity(`관리자 계정 '${newAdminAccount.name}'(${newAdminAccount.role})을 초대했습니다.`);
    setNewAdminAccount({ name: "", email: "", role: "운영진" });
  };

  // 관리자 계정 상태 토글
  const handleToggleAdminStatus = (id: number) => {
    setAdminAccounts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: a.status === "활성" ? "비활성" : "활성" } : a))
    );
  };

  const filteredAdminFcUsers = adminFcUsers.filter((fc) => {
    if (!adminFcSearchQuery) return true;
    const query = adminFcSearchQuery.toLowerCase();
    return fc.nickname.toLowerCase().includes(query) || fc.mainField.toLowerCase().includes(query);
  });

  const filteredAdminGaUsers = adminGaUsers.filter((ga) => {
    if (!adminGaSearchQuery) return true;
    const query = adminGaSearchQuery.toLowerCase();
    return ga.gaName.toLowerCase().includes(query) || ga.branch.toLowerCase().includes(query);
  });

  const extractNumber = (value: string) => parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;

  const filteredCandidates = MOCK_FC_CANDIDATES.filter(
    (candidate) => candidateFieldFilter === "ALL" || candidate.mainField === candidateFieldFilter
  )
    .filter((candidate) => {
      if (!candidateSearchQuery) return true;
      const query = candidateSearchQuery.toLowerCase();
      return (
        candidate.nickname.toLowerCase().includes(query) ||
        candidate.mainField.toLowerCase().includes(query) ||
        candidate.preferredRegion.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (candidateSort === "SALES_DESC") return extractNumber(b.salesRange) - extractNumber(a.salesRange);
      if (candidateSort === "RETENTION_DESC") return extractNumber(b.retentionRate) - extractNumber(a.retentionRate);
      if (candidateSort === "COMMISSION_ASC") return extractNumber(a.minCommission) - extractNumber(b.minCommission);
      return 0;
    });

  // 주요 GA 탭 검색 결과 (전체 제휴 GA 대상)
  const filteredGaList = MOCK_GA_FULL_LIST.filter((ga) => {
    if (!gaListSearchQuery) return true;
    const query = gaListSearchQuery.toLowerCase();
    return ga.name.toLowerCase().includes(query) || ga.branch.toLowerCase().includes(query);
  });

  // GA 홈 대시보드용 집계 지표
  const matchedOffersCount = sentOffers.filter((offer) => offer.status === "매칭 완료").length;
  const respondedOffersCount = sentOffers.filter((offer) => offer.status !== "대기중").length;
  const responseRateLabel =
    sentOffers.length === 0 ? "-" : `${Math.round((respondedOffersCount / sentOffers.length) * 100)}%`;

  // 설계사 후보에게 제안 보내기
  const handleSendOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerTarget) return;
    if (!offerForm.commission || !offerForm.settlement) {
      alert("제안 수수료 조건과 정착지원금을 입력해 주세요.");
      return;
    }
    setSentOffers((prev) => [
      {
        id: prev.length + 1,
        candidateNickname: offerTarget.nickname,
        offeredCommission: offerForm.commission,
        offeredSettlement: offerForm.settlement,
        offeredDb: offerForm.db || "추후 협의",
        message: offerForm.message,
        status: "대기중",
        date: "2026-08-06",
        candidatePhone: `010-${1000 + offerTarget.id}-${5000 + offerTarget.id}`
      },
      ...prev
    ]);
    alert(`${offerTarget.nickname}님에게 제안을 보냈습니다!\n"보낸 제안 관리" 탭에서 진행 상황을 확인할 수 있습니다.`);
    setOfferTarget(null);
    setOfferForm({ commission: "", settlement: "", db: "", message: "" });
    setMainTab("SENT_OFFERS");
  };

  // (데모용) 제안 응답 상태 시뮬레이션 - 실제 서비스에서는 설계사가 직접 응답합니다
  const handleUpdateOfferStatus = (offerId: number, newStatus: "매칭 완료" | "거절됨") => {
    setSentOffers((prev) => prev.map((offer) => (offer.id === offerId ? { ...offer, status: newStatus } : offer)));
  };

  // 우리 GA 정보 저장
  const handleSaveGaProfile = (e: React.FormEvent) => {
    e.preventDefault();
    alert("GA 정보가 저장되었습니다!\n설계사에게 노출되는 GA 정보에 반영됩니다.");
  };

  // ==========================================
  // 1. 로그인 화면
  // ==========================================
  if (!isLoggedIn && authView === "LOGIN") {
    return (
      <div className="min-h-screen bg-[#0d1424] text-white flex items-center justify-center p-4 py-12 relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 -left-40 w-[32rem] h-[32rem] rounded-full bg-blue-600/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -right-20 w-[36rem] h-[36rem] rounded-full bg-amber-400/10 blur-3xl" />

        <button
          type="button"
          onClick={() => setAuthView("LANDING")}
          className="absolute top-6 left-6 z-20 flex items-center gap-1.5 text-slate-400 hover:text-white text-xs font-bold transition"
        >
          <span aria-hidden="true">←</span>
          <span>홈으로</span>
        </button>

        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center relative z-10">
          <div className="w-full max-w-xl lg:max-w-2xl mx-auto lg:mx-0 space-y-8 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2.5">
              <Shield className="w-7 h-7 xl:w-8 xl:h-8 text-blue-400" />
              <span className="font-black text-xl sm:text-2xl xl:text-3xl tracking-wide text-white">인슈어매치</span>
            </div>

            <div className="inline-flex items-center gap-2 bg-[#162950] border border-[#234380] text-blue-400 text-xs xl:text-sm px-4 xl:px-5 py-1.5 xl:py-2 rounded-full font-bold shadow-inner">
              <Target className="w-4 h-4 text-blue-400" />
              <span>누적 매칭 4,200건 · 제휴 GA사 87곳</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black tracking-wide leading-snug whitespace-nowrap">
                <span className="text-white">더 나은 조건, 더 나은 미래</span>
                <br />
                <span className="text-amber-400">나에게 꼭 맞는 GA를 찾으세요</span>
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm xl:text-base font-medium leading-relaxed max-w-md xl:max-w-lg mx-auto lg:mx-0">
                수수료율, 지원제도, 전산시스템까지 — 여러 GA의 조건을 한눈에 비교하고, 전담 매니저의 1:1 컨설팅으로 이직·위촉의 리스크를 최소화하세요.
              </p>
            </div>

            <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-y-5 gap-x-6 pt-6 border-t border-[#1c2740]">
              <div>
                <p className="text-base sm:text-lg xl:text-xl font-black text-white whitespace-nowrap">4,200+</p>
                <p className="text-[10px] sm:text-[11px] xl:text-xs text-slate-500 font-semibold mt-0.5 whitespace-nowrap">누적 매칭 건수</p>
              </div>
              <div>
                <p className="text-base sm:text-lg xl:text-xl font-black text-white whitespace-nowrap">87개</p>
                <p className="text-[10px] sm:text-[11px] xl:text-xs text-slate-500 font-semibold mt-0.5 whitespace-nowrap">제휴 GA사</p>
              </div>
              <div>
                <p className="text-base sm:text-lg xl:text-xl font-black text-white whitespace-nowrap">평균 9일</p>
                <p className="text-[10px] sm:text-[11px] xl:text-xs text-slate-500 font-semibold mt-0.5 whitespace-nowrap">매칭 소요 기간</p>
              </div>
              <div>
                <p className="text-base sm:text-lg xl:text-xl font-black text-white whitespace-nowrap">4.8 / 5</p>
                <p className="text-[10px] sm:text-[11px] xl:text-xs text-slate-500 font-semibold mt-0.5 whitespace-nowrap">설계사 만족도</p>
              </div>
            </div>
          </div>

          <div ref={loginCardRef} className="w-full max-w-md lg:max-w-lg mx-auto lg:mx-0 bg-[#141c2e] border border-[#212c45] p-6 xl:p-8 rounded-3xl shadow-2xl space-y-5 text-left">
            <div className="bg-[#0b101d] p-1.5 rounded-2xl grid grid-cols-3 gap-1 border border-[#1e293b]">
              <button
                type="button"
                onClick={() => setUserRole("FC")}
                className={`py-3 rounded-xl font-extrabold text-[11px] flex items-center justify-center gap-1.5 transition ${
                  userRole === "FC"
                    ? "bg-[#1d6bf3] text-white shadow-lg"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>설계사 (FC)</span>
              </button>

              <button
                type="button"
                onClick={() => setUserRole("GA")}
                className={`py-3 rounded-xl font-extrabold text-[11px] flex items-center justify-center gap-1.5 transition ${
                  userRole === "GA"
                    ? "bg-[#1d6bf3] text-white shadow-lg"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>GA 매니저</span>
              </button>

              <button
                type="button"
                onClick={() => setUserRole("ADMIN")}
                className={`py-3 rounded-xl font-extrabold text-[11px] flex items-center justify-center gap-1.5 transition ${
                  userRole === "ADMIN"
                    ? "bg-[#1d6bf3] text-white shadow-lg"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>관리자</span>
              </button>
            </div>

            {userRole === "FC" && (
              <div className="space-y-4">
                <div className="bg-[#16233b]/60 border border-[#21375c] p-4 rounded-2xl flex items-start gap-3">
                  <Lock className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-xs font-extrabold text-blue-300">
                      100% 익명성 보장 & 전직 GA 차단
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      간편 인증 시 본인 확인 용도로만 사용되며, 제안 승인 전까지 이름/연락처는 절대 공개되지 않습니다.
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5 pt-1">
                  <button
                    onClick={() => handleSocialLogin("kakao")}
                    className="w-full bg-[#fee500] hover:bg-[#fada00] text-[#191919] font-black py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-md"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.707 4.8 4.27 6.054-.188.702-.682 2.545-.78 2.94-.122.49.178.483.376.351.155-.103 2.466-1.675 3.464-2.353.557.08 1.13.123 1.67.123 4.97 0 9-3.186 9-7.115C21 6.185 16.97 3 12 3z" />
                    </svg>
                    <span>카카오로 3초 만에 시작하기</span>
                  </button>

                  <button
                    onClick={() => handleSocialLogin("naver")}
                    className="w-full bg-[#03c75a] hover:bg-[#02b351] text-white font-black py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-md"
                  >
                    <span className="font-extrabold text-sm leading-none">N</span>
                    <span>네이버로 시작하기</span>
                  </button>
                </div>
              </div>
            )}

            {userRole === "GA" && (
              <form onSubmit={handleGaLogin} className="space-y-3 pt-1">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 mb-1 block">
                    GA 사업자등록번호
                  </label>
                  <input
                    type="text"
                    placeholder="000-00-00000 ('-' 제외 가능)"
                    value={gaBusinessNum}
                    onChange={(e) => setGaBusinessNum(e.target.value)}
                    className="w-full bg-[#0b101d] border border-[#212c45] text-white rounded-xl p-3 text-xs focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-300 mb-1 block">
                    GA 승인 코드 (지사 전용 코드)
                  </label>
                  <input
                    type="password"
                    placeholder="GA 고유 인증 코드를 입력하세요"
                    value={gaCode}
                    onChange={(e) => setGaCode(e.target.value)}
                    className="w-full bg-[#0b101d] border border-[#212c45] text-white rounded-xl p-3 text-xs focus:border-blue-500 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1d6bf3] hover:bg-blue-600 text-white font-extrabold py-3.5 rounded-xl text-xs transition shadow-lg mt-2"
                >
                  GA 매니저 인증 로그인
                </button>
              </form>
            )}

            {userRole === "ADMIN" && (
              <form onSubmit={handleAdminLogin} className="space-y-3 pt-1">
                <div className="bg-[#16233b]/60 border border-[#21375c] p-3.5 rounded-2xl flex items-start gap-2.5">
                  <Lock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    내부 운영진 전용 로그인입니다. 가입한 설계사·GA 계정 관리는 이 화면에서 진행합니다.
                  </p>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-300 mb-1 block">관리자 계정</label>
                  <input
                    type="text"
                    placeholder="관리자 아이디를 입력하세요"
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                    className="w-full bg-[#0b101d] border border-[#212c45] text-white rounded-xl p-3 text-xs focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-300 mb-1 block">비밀번호</label>
                  <input
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full bg-[#0b101d] border border-[#212c45] text-white rounded-xl p-3 text-xs focus:border-blue-500 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1d6bf3] hover:bg-blue-600 text-white font-extrabold py-3.5 rounded-xl text-xs transition shadow-lg mt-2"
                >
                  관리자 로그인
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 1-B. 랜딩 페이지 (소개 대시보드)
  // ==========================================
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-white text-slate-800">
        {/* 상단 헤더 */}
        <header className="sticky top-0 z-30 bg-[#0d1424]/95 backdrop-blur border-b border-[#1c2740]">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-400" />
              <span className="font-black text-lg text-white tracking-wide">인슈어매치</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => openLogin(userRole)}
                className="text-slate-300 hover:text-white text-xs font-bold px-2.5 sm:px-3 py-2 transition"
              >
                로그인
              </button>
              <button
                type="button"
                onClick={() => openLogin("FC")}
                className="bg-[#1d6bf3] hover:bg-blue-600 text-white text-xs font-bold px-3 sm:px-4 py-2 rounded-lg transition whitespace-nowrap"
              >
                FC 회원가입
              </button>
              <button
                type="button"
                onClick={() => openLogin("GA")}
                className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3 sm:px-4 py-2 rounded-lg border border-white/10 transition whitespace-nowrap"
              >
                GA 회원가입
              </button>
            </div>
          </div>
        </header>

        {/* 히어로 섹션 */}
        <section className="bg-[#0d1424] text-white relative overflow-hidden">
          <div className="pointer-events-none absolute -top-40 -left-40 w-[32rem] h-[32rem] rounded-full bg-blue-600/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -right-20 w-[36rem] h-[36rem] rounded-full bg-amber-400/10 blur-3xl" />
          <div className="max-w-4xl mx-auto px-6 py-20 text-center relative z-10 space-y-8">
            <div className="inline-flex items-center gap-2 bg-[#162950] border border-[#234380] text-blue-400 text-xs sm:text-sm px-4 py-1.5 rounded-full font-bold shadow-inner">
              <Target className="w-4 h-4 text-blue-400" />
              <span>누적 매칭 4,200건 · 제휴 GA사 87곳</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-wide leading-snug">
              <span className="text-white">더 나은 조건, 더 나은 미래</span>
              <br />
              <span className="text-amber-400">나에게 꼭 맞는 GA를 찾으세요</span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base font-medium leading-relaxed max-w-2xl mx-auto">
              수수료율, 지원제도, 전산시스템까지 — 여러 GA의 조건을 한눈에 비교하고, 전담 매니저의 1:1 컨설팅으로 이직·위촉의 리스크를 최소화하세요.
            </p>

            <div className="w-full max-w-2xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-y-5 gap-x-6 pt-8 border-t border-[#1c2740]">
              <div>
                <p className="text-base sm:text-lg xl:text-xl font-black text-white whitespace-nowrap">4,200+</p>
                <p className="text-[10px] sm:text-[11px] xl:text-xs text-slate-500 font-semibold mt-0.5 whitespace-nowrap">누적 매칭 건수</p>
              </div>
              <div>
                <p className="text-base sm:text-lg xl:text-xl font-black text-white whitespace-nowrap">87개</p>
                <p className="text-[10px] sm:text-[11px] xl:text-xs text-slate-500 font-semibold mt-0.5 whitespace-nowrap">제휴 GA사</p>
              </div>
              <div>
                <p className="text-base sm:text-lg xl:text-xl font-black text-white whitespace-nowrap">평균 9일</p>
                <p className="text-[10px] sm:text-[11px] xl:text-xs text-slate-500 font-semibold mt-0.5 whitespace-nowrap">매칭 소요 기간</p>
              </div>
              <div>
                <p className="text-base sm:text-lg xl:text-xl font-black text-white whitespace-nowrap">4.8 / 5</p>
                <p className="text-[10px] sm:text-[11px] xl:text-xs text-slate-500 font-semibold mt-0.5 whitespace-nowrap">설계사 만족도</p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY 인슈매치 */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-5xl mx-auto text-center space-y-4">
            <span className="inline-block bg-blue-50 text-blue-700 text-[11px] font-black px-3 py-1.5 rounded-full tracking-wide">
              WHY 인슈매치
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">이직·위촉, 왜 항상 불안할까요?</h2>
            <p className="text-slate-500 text-xs sm:text-sm md:text-base max-w-none md:whitespace-nowrap">
              정보 비대칭 속에서 혼자 결정하다 보면, 좋은 조건을 놓치거나 예상치 못한 손실을 겪기 쉽습니다.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5 mt-12">
            {LANDING_PROBLEMS.map((p) => (
              <div key={p.no} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-2">
                <span className="text-blue-600 font-black text-xs">{p.no}</span>
                <h3 className="font-black text-slate-900 text-base">{p.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-slate-50 py-20 px-6">
          <div className="max-w-5xl mx-auto text-center space-y-4">
            <span className="inline-block bg-blue-50 text-blue-700 text-[11px] font-black px-3 py-1.5 rounded-full tracking-wide">
              HOW IT WORKS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">4단계로 끝나는 GA 매칭</h2>
            <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto">복잡한 비교와 협상 과정을 인슈매치가 대신합니다.</p>
          </div>
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {LANDING_STEPS.map((s) => (
              <div key={s.no} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
                <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-black text-sm">
                  {s.no}
                </div>
                <h3 className="font-black text-slate-900 text-base">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* WHY US */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-5xl mx-auto text-center space-y-4">
            <span className="inline-block bg-blue-50 text-blue-700 text-[11px] font-black px-3 py-1.5 rounded-full tracking-wide">
              WHY US
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">인슈매치가 다른 이유</h2>
            <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
              객관적인 데이터와 전문성으로 설계사님의 다음 커리어를 함께 설계합니다.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5 mt-12">
            {LANDING_FEATURES.map((f) => (
              <div key={f.title} className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                  <f.icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-black text-slate-900 text-sm">{f.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SUCCESS STORY */}
        <section className="bg-slate-50 py-20 px-6">
          <div className="max-w-5xl mx-auto text-center space-y-4">
            <span className="inline-block bg-blue-50 text-blue-700 text-[11px] font-black px-3 py-1.5 rounded-full tracking-wide">
              SUCCESS STORY
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">설계사님들의 이야기</h2>
            <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
              인슈매치를 통해 더 나은 조건으로 새출발한 분들의 후기입니다.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5 mt-12">
            {LANDING_TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
                <p className="text-slate-600 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0">
                    {t.initial}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-xs">{t.name}</p>
                    <p className="text-slate-400 text-[11px]">{t.meta}</p>
                  </div>
                </div>
                <span className="inline-block bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full">
                  {t.tag}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* FOR GA 파트너사 */}
        <section className="bg-[#0d1424] py-20 px-6">
          <div className="max-w-5xl mx-auto bg-[#141c2e] border border-[#212c45] rounded-3xl p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 items-center">
            <div className="space-y-5">
              <span className="inline-block bg-white/10 text-white text-[11px] font-black px-3 py-1.5 rounded-full tracking-wide">
                FOR GA 파트너사
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
                우수 설계사를 더 빠르게, 더 정확하게 만나세요
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                검증된 설계사 풀을 확보하고, 데이터 기반 매칭으로 채용 비용과 시간을 절감하세요. 인슈매치와 함께라면 채용이 더 쉬워집니다.
              </p>
              <div className="space-y-2">
                {GA_CTA_POINTS.map((point) => (
                  <div key={point} className="flex items-center gap-2 text-slate-200 text-xs sm:text-sm">
                    <Check className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => openLogin("GA")}
                className="bg-amber-400 hover:bg-amber-300 text-[#0d1424] font-black px-6 py-3.5 rounded-xl text-sm transition shadow-lg mt-2"
              >
                GA사 등록 문의하기 →
              </button>
            </div>
            <div className="bg-[#0b101d] border border-[#212c45] rounded-2xl p-6 space-y-4">
              {GA_CTA_STATS.map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <span className="text-slate-400 text-xs">{s.label}</span>
                  <span className="text-white font-black text-lg">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 푸터 */}
        <footer className="bg-[#0d1424] border-t border-[#1c2740] py-8 px-6 text-center space-y-2">
          <p className="text-slate-500 text-[11px]">© 2026 인슈어매치. All rights reserved.</p>
          <button
            type="button"
            onClick={() => openLogin("ADMIN")}
            className="text-slate-600 hover:text-slate-400 text-[10px] transition"
          >
            관리자 로그인
          </button>
        </footer>
      </div>
    );
  }

  // ==========================================
  // 2. 메인 대시보드 화면
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 text-xs pb-12 font-sans">
      {/* 헤더 */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 h-14 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white p-1.5 rounded-lg">
            <Shield className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-black text-base text-slate-900">인슈어매치</span>
            <span className="bg-blue-100 text-blue-800 text-[10px] px-2.5 py-0.5 rounded-full font-bold">
              {userRole === "ADMIN" ? "관리자 모드" : userRole === "GA" ? "GA 리크루터 모드" : "FC 익명 모드"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {userRole !== "ADMIN" && (
            <button
              onClick={() => {
                const nextRole = userRole === "FC" ? "GA" : "FC";
                setUserRole(nextRole);
                setMainTab(nextRole === "FC" ? "GA_LIST" : "GA_HOME");
              }}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold transition flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{userRole === "FC" ? "GA 매니저 모드 전환" : "FC 모드 전환"}</span>
            </button>
          )}

          <div className="h-4 w-[1px] bg-slate-200 my-auto"></div>

          <button
            onClick={() => {
              setIsLoggedIn(false);
              setAuthView("LANDING");
            }}
            className="flex items-center gap-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition font-semibold"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">로그아웃</span>
          </button>
        </div>
      </header>

      {/* 메인 네비게이션 탭 (FC/GA) */}
      {userRole !== "ADMIN" && (
      <div className="bg-white border-b border-slate-200 px-6">
        <div className="max-w-6xl mx-auto flex gap-6 sm:gap-8 overflow-x-auto font-bold text-xs sm:text-sm">
          {userRole === "FC" && (
            <>
              <button
                onClick={() => setMainTab("GA_LIST")}
                className={`py-3.5 border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
                  mainTab === "GA_LIST"
                    ? "border-blue-600 text-blue-600 font-black"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>주요 GA</span>
              </button>

              <button
                onClick={() => setMainTab("AI_MATCH")}
                className={`py-3.5 border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
                  mainTab === "AI_MATCH"
                    ? "border-blue-600 text-blue-600 font-black"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>AI추천</span>
              </button>

              <button
                onClick={() => setMainTab("INSURER_CONNECT")}
                className={`py-3.5 border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
                  mainTab === "INSURER_CONNECT"
                    ? "border-blue-600 text-blue-600 font-black"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <Link2 className="w-4 h-4" />
                <span>보험사 전산 및 수수료표</span>
              </button>

              <button
                onClick={() => setMainTab("OFFERS_INBOX")}
                className={`py-3.5 border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
                  mainTab === "OFFERS_INBOX"
                    ? "border-blue-600 text-blue-600 font-black"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <Inbox className="w-4 h-4" />
                <span>받은 역경매 제안함 ({MOCK_OFFERS_RECEIVED.length})</span>
              </button>

              <button
                onClick={() => setMainTab("FC_PROFILE")}
                className={`py-3.5 border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
                  mainTab === "FC_PROFILE"
                    ? "border-blue-600 text-blue-600 font-black"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>내 익명 프로필 & 조건 설정</span>
              </button>
            </>
          )}

          {userRole === "GA" && (
            <>
              <button
                onClick={() => setMainTab("GA_HOME")}
                className={`py-3.5 border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
                  mainTab === "GA_HOME"
                    ? "border-blue-600 text-blue-600 font-black"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>홈</span>
              </button>

              <button
                onClick={() => setMainTab("FC_CANDIDATES")}
                className={`py-3.5 border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
                  mainTab === "FC_CANDIDATES"
                    ? "border-blue-600 text-blue-600 font-black"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>이직희망 설계사</span>
              </button>

              <button
                onClick={() => setMainTab("SENT_OFFERS")}
                className={`py-3.5 border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
                  mainTab === "SENT_OFFERS"
                    ? "border-blue-600 text-blue-600 font-black"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <Inbox className="w-4 h-4" />
                <span>보낸 제안 관리 ({sentOffers.length})</span>
              </button>

              <button
                onClick={() => setMainTab("GA_PROFILE")}
                className={`py-3.5 border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
                  mainTab === "GA_PROFILE"
                    ? "border-blue-600 text-blue-600 font-black"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>GA 정보</span>
              </button>
            </>
          )}

          <button
            onClick={() => setMainTab("COMMUNITY")}
            className={`py-3.5 border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
              mainTab === "COMMUNITY"
                ? "border-blue-600 text-blue-600 font-black"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>커뮤니티</span>
          </button>
        </div>
      </div>
      )}

      {/* 관리자 모드 레이아웃 wrapper (사이드바 + 콘텐츠) */}
      <div className={userRole === "ADMIN" ? "max-w-6xl mx-auto flex items-start gap-6 px-4 sm:px-6" : ""}>
        {userRole === "ADMIN" && (
          <aside className="hidden md:block w-56 flex-shrink-0 sticky top-4 mt-4 sm:mt-6 bg-white border border-slate-200 rounded-2xl p-4 space-y-5">
            <div className="space-y-1">
              <p className="px-2 mb-1.5 text-[11px] font-black text-slate-400 tracking-wide">개요</p>
              <button
                onClick={() => setMainTab("ADMIN_HOME")}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition ${
                  mainTab === "ADMIN_HOME" ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>대시보드</span>
              </button>
            </div>

            <div className="space-y-1">
              <p className="px-2 mb-1.5 text-[11px] font-black text-slate-400 tracking-wide">회원 관리</p>
              <button
                onClick={() => setMainTab("ADMIN_FC")}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition ${
                  mainTab === "ADMIN_FC" ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>설계사 관리 ({adminFcUsers.length})</span>
              </button>

              <button
                onClick={() => setMainTab("ADMIN_VERIFICATION")}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition ${
                  mainTab === "ADMIN_VERIFICATION" ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Award className="w-4 h-4" />
                <span>
                  인증 심사
                  {adminFcUsers.some((fc) => fc.verificationStatus === "심사중")
                    ? ` (${adminFcUsers.filter((fc) => fc.verificationStatus === "심사중").length})`
                    : ""}
                </span>
              </button>

              <button
                onClick={() => setMainTab("ADMIN_GA")}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition ${
                  mainTab === "ADMIN_GA" ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>GA 관리 ({adminGaUsers.length})</span>
              </button>
            </div>

            <div className="space-y-1">
              <p className="px-2 mb-1.5 text-[11px] font-black text-slate-400 tracking-wide">노출·매출</p>
              <button
                onClick={() => setMainTab("ADMIN_PLANS")}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition ${
                  mainTab === "ADMIN_PLANS" ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Target className="w-4 h-4" />
                <span>노출 상품</span>
              </button>

              <button
                onClick={() => setMainTab("ADMIN_BILLING")}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition ${
                  mainTab === "ADMIN_BILLING" ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>매출 관리{adminInvoices.some((inv) => inv.status === "미납") ? " 🔴" : ""}</span>
              </button>

              <button
                onClick={() => setMainTab("ADMIN_STATS")}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition ${
                  mainTab === "ADMIN_STATS" ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>통계</span>
              </button>
            </div>

            <div className="space-y-1">
              <p className="px-2 mb-1.5 text-[11px] font-black text-slate-400 tracking-wide">콘텐츠</p>
              <button
                onClick={() => setMainTab("ADMIN_COMMUNITY")}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition ${
                  mainTab === "ADMIN_COMMUNITY" ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>커뮤니티 관리{communityPosts.some((p) => p.reported) ? " 🔴" : ""}</span>
              </button>

              <button
                onClick={() => setMainTab("ADMIN_ANNOUNCEMENTS")}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition ${
                  mainTab === "ADMIN_ANNOUNCEMENTS" ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Megaphone className="w-4 h-4" />
                <span>공지사항 관리</span>
              </button>
            </div>

            <div className="space-y-1">
              <p className="px-2 mb-1.5 text-[11px] font-black text-slate-400 tracking-wide">시스템</p>
              <button
                onClick={() => setMainTab("ADMIN_ACCOUNTS")}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition ${
                  mainTab === "ADMIN_ACCOUNTS" ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>관리자 계정</span>
              </button>

              <button
                onClick={() => setMainTab("ADMIN_LOG")}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition ${
                  mainTab === "ADMIN_LOG" ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>활동 로그</span>
              </button>
            </div>
          </aside>
        )}

        {/* 관리자 모드 전용: 모바일용 탭 드롭다운 (사이드바가 숨겨지는 화면 크기) */}
        {userRole === "ADMIN" && (
          <div className="md:hidden fixed top-[104px] left-0 right-0 z-30 bg-white border-b border-slate-200 px-4 py-2">
            <select
              value={mainTab}
              onChange={(e) => setMainTab(e.target.value as typeof mainTab)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm font-bold"
            >
              <option value="ADMIN_HOME">개요 · 대시보드</option>
              <option value="ADMIN_FC">회원 관리 · 설계사 관리</option>
              <option value="ADMIN_VERIFICATION">회원 관리 · 인증 심사</option>
              <option value="ADMIN_GA">회원 관리 · GA 관리</option>
              <option value="ADMIN_PLANS">노출·매출 · 노출 상품</option>
              <option value="ADMIN_BILLING">노출·매출 · 매출 관리</option>
              <option value="ADMIN_STATS">노출·매출 · 통계</option>
              <option value="ADMIN_COMMUNITY">콘텐츠 · 커뮤니티 관리</option>
              <option value="ADMIN_ANNOUNCEMENTS">콘텐츠 · 공지사항 관리</option>
              <option value="ADMIN_ACCOUNTS">시스템 · 관리자 계정</option>
              <option value="ADMIN_LOG">시스템 · 활동 로그</option>
            </select>
          </div>
        )}

      {/* 메인 콘텐츠 영역 */}
      <main
        className={
          userRole === "ADMIN"
            ? "flex-1 min-w-0 py-4 sm:py-6 space-y-6 mt-14 md:mt-4 sm:mt-6"
            : "max-w-6xl mx-auto p-4 sm:p-6 space-y-6"
        }
      >
        {/* 탭 0: AI·전문가 매칭 추천 */}
        {mainTab === "AI_MATCH" && (
          <div className="space-y-5">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-5 sm:p-6 rounded-2xl text-white flex items-start gap-3 shadow-sm">
              <div className="bg-white/15 p-2 rounded-xl shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-black text-base sm:text-lg">AI가 분석한 나에게 맞는 GA</h2>
                <p className="text-blue-100 text-xs sm:text-sm mt-1 leading-relaxed">
                  아직 어떤 조건을 원하시는지 알 수 없으니, 아래에서 원하는 조건을 먼저 선택해주세요.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleFindAiMatches}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4"
            >
              <h3 className="font-black text-sm text-slate-900">어떤 조건의 GA를 찾고 계신가요?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-extrabold text-slate-700 text-xs">희망 근무 지역</label>
                  <input
                    type="text"
                    value={aiPreferences.region}
                    onChange={(e) => setAiPreferences({ ...aiPreferences, region: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-extrabold text-slate-700 text-xs">주력 영업 분야</label>
                  <select
                    value={aiPreferences.field}
                    onChange={(e) => setAiPreferences({ ...aiPreferences, field: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {MAIN_FIELD_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-extrabold text-slate-700 text-xs">가장 중요하게 보는 조건</label>
                  <select
                    value={aiPreferences.priority}
                    onChange={(e) => setAiPreferences({ ...aiPreferences, priority: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>수수료율</option>
                    <option>정착지원금</option>
                    <option>DB 지원</option>
                    <option>전산·교육 시스템</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-6 py-3.5 rounded-xl text-xs transition shadow-lg flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>AI 맞춤 GA 찾기</span>
              </button>
            </form>

            {showAiMatches && (
            <div className="space-y-4">
              {MOCK_AI_MATCHES.slice()
                .sort((a, b) => b.matchScore - a.matchScore)
                .map((match) => {
                  const ga = MOCK_GA_FULL_LIST.find((g) => g.id === match.gaId);
                  if (!ga) return null;
                  return (
                    <div
                      key={ga.id}
                      className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-400 transition space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-3">
                        <div>
                          <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                            {ga.name}
                            <span className="text-xs font-bold text-slate-400">({ga.branch})</span>
                          </h3>
                          <p className="text-slate-400 text-[11px] mt-0.5">{ga.guaranteedCommission}</p>
                        </div>
                        <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full shrink-0">
                          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                          <span className="font-black text-blue-700 text-sm">매칭률 {match.matchScore}%</span>
                        </div>
                      </div>

                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${match.matchScore}%` }}
                        />
                      </div>

                      <div className="space-y-1.5">
                        {match.matchReasons.map((reason, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-slate-600 text-xs">
                            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{reason}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => setMainTab("GA_LIST")}
                        className="text-blue-600 text-xs font-bold hover:underline"
                      >
                        전체 조건 비교에서 자세히 보기 →
                      </button>
                    </div>
                  );
                })}
            </div>
            )}
          </div>
        )}

        {/* 탭 1: GA 메인 비교 리스트 */}
        {mainTab === "GA_LIST" && (
          <div className="space-y-5">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="flex flex-col gap-1 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="GA명 또는 지역 검색 (예: 테헤란로)"
                    value={gaListSearchQuery}
                    onChange={(e) => setGaListSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <p className="text-slate-400 text-[10px] pl-1">전체 87개 제휴 GA를 대상으로 검색합니다.</p>
              </div>

              <div className="flex items-center gap-2 text-slate-500 text-xs font-medium self-end sm:self-auto">
                <span>정렬 기준:</span>
                <select className="bg-slate-50 border border-slate-200 rounded-lg p-1.5 font-bold text-slate-800 outline-none">
                  <option>수수료율 높은순</option>
                  <option>정착지원금 높은순</option>
                  <option>유지율 높은순</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredGaList.length === 0 && (
                <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-400 text-xs">
                  검색 조건에 맞는 GA가 없습니다.
                </div>
              )}
              {filteredGaList.map((ga) => (
                <div
                  key={ga.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-400 transition space-y-4"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="bg-slate-900 text-white font-black px-2.5 py-1 rounded-lg text-xs">
                        {ga.rank}
                      </span>
                      <div>
                        <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                          {ga.name}
                          <span className="text-xs font-bold text-slate-400">({ga.branch})</span>
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      {ga.tags.map((tag, idx) => (
                        <span key={idx} className="bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded text-[10px]">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-emerald-50/60 border border-emerald-100 p-3.5 rounded-xl space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-emerald-900 text-xs flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> 생명보험 수수료 조건
                        </span>
                        <span className="font-black text-emerald-700 text-xs">{ga.lifeCommission.split(" ")[1]}</span>
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        {ga.lifeCommission}
                      </p>
                    </div>

                    <div className="bg-blue-50/60 border border-blue-100 p-3.5 rounded-xl space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-blue-900 text-xs flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-blue-600" /> 손해보험 수수료 조건
                        </span>
                        <span className="font-black text-blue-700 text-xs">{ga.nonLifeCommission.split(" ")[1]}</span>
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        {ga.nonLifeCommission}
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100 space-y-1.5">
                    <span className="text-[11px] font-extrabold text-slate-700 block">주요 지원 혜택 & 지원 사항:</span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-600">
                      {ga.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-4">
                      <div>
                        <span className="text-slate-400 font-semibold block text-[10px]">정착지원금</span>
                        <span className="font-extrabold text-slate-800">{ga.settlement}</span>
                      </div>
                      <div className="h-6 w-[1px] bg-slate-200"></div>
                      <div>
                        <span className="text-slate-400 font-semibold block text-[10px]">DB 지원 정책</span>
                        <span className="font-extrabold text-slate-800">{ga.dbSupport}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => alert(`${ga.name} 상세 스카우트 제안 및 수수료표 요청이 완료되었습니다.`)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition shadow-sm ml-auto"
                    >
                      상세 수수료표 및 이직 상담 신청
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 탭 2: 보험사 전산 및 수수료표 */}
        {mainTab === "INSURER_CONNECT" && (
          <div className="space-y-6">
            {/* 검색 및 상단 카테고리 필터 버튼 */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="보험사 이름으로 검색..."
                  value={insurerSearchQuery}
                  onChange={(e) => setInsurerSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-full pl-10 pr-4 py-2.5 text-xs shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex items-center gap-1.5 bg-slate-200/60 p-1 rounded-full text-xs self-end sm:self-auto">
                <button
                  onClick={() => setInsurerFilterTab("ALL")}
                  className={`px-4 py-1.5 rounded-full font-bold transition ${
                    insurerFilterTab === "ALL"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  전체 ({MOCK_INSURERS_DETAIL.life.length + MOCK_INSURERS_DETAIL.nonLife.length})
                </button>
                <button
                  onClick={() => setInsurerFilterTab("LIFE")}
                  className={`px-4 py-1.5 rounded-full font-bold transition ${
                    insurerFilterTab === "LIFE"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  생명보험사 ({MOCK_INSURERS_DETAIL.life.length})
                </button>
                <button
                  onClick={() => setInsurerFilterTab("NON_LIFE")}
                  className={`px-4 py-1.5 rounded-full font-bold transition ${
                    insurerFilterTab === "NON_LIFE"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  손해보험사 ({MOCK_INSURERS_DETAIL.nonLife.length})
                </button>
              </div>
            </div>

            {/* 생명보험사 섹션 */}
            {(insurerFilterTab === "ALL" || insurerFilterTab === "LIFE") && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600 font-extrabold text-xs">01</span>
                    <h2 className="text-base font-black text-slate-900">생명보험사 (총 22개사)</h2>
                  </div>
                  <span className="bg-blue-50 text-blue-600 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    {
                      MOCK_INSURERS_DETAIL.life.filter((item) =>
                        item.name.toLowerCase().includes(insurerSearchQuery.toLowerCase())
                      ).length
                    }개사 조회됨
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {MOCK_INSURERS_DETAIL.life
                    .filter((item) =>
                      item.name.toLowerCase().includes(insurerSearchQuery.toLowerCase())
                    )
                    .map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 transition space-y-3 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-black text-blue-600 shrink-0">
                                {item.name.substring(0, 1)}
                              </div>
                              <h3 className="font-bold text-slate-900 text-xs">{item.name}</h3>
                            </div>
                            <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 text-[9px] px-1.5 py-0.5 rounded font-extrabold">
                              {item.status}
                            </span>
                          </div>

                          <div className="bg-slate-50 p-2.5 rounded-lg space-y-1 border border-slate-100">
                            <div className="flex justify-between items-center text-[11px]">
                              <span className="text-slate-400">최대 수수료율</span>
                              <span className="font-black text-blue-600">{item.maxCommission}</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px]">
                              <span className="text-slate-400">초년도/총지급</span>
                              <span className="font-semibold text-slate-700">{item.firstMonth} / {item.total12}</span>
                            </div>
                          </div>

                          <div className="space-y-1 text-[10px] text-slate-500 pt-1">
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1"><Headphones className="w-3 h-3 text-slate-400" /> 콜센터</span>
                              <span className="font-mono text-slate-700">{item.phone}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1"><PhoneCall className="w-3 h-3 text-slate-400" /> 인콜지원</span>
                              <span className="font-mono text-slate-700">{item.inCall}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1"><Printer className="w-3 h-3 text-slate-400" /> 팩스번호</span>
                              <span className="font-mono text-slate-700">{item.fax}</span>
                            </div>
                          </div>
                        </div>

                        <button 
                          onClick={() => alert(`${item.name} 전산 매뉴얼 및 수수료 상세표 다운로드 요청`)}
                          className="w-full mt-2 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 font-bold py-1.5 rounded-lg text-[11px] transition text-center"
                        >
                          전산 지원 및 상세 수수료표
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* 손해보험사 섹션 */}
            {(insurerFilterTab === "ALL" || insurerFilterTab === "NON_LIFE") && (
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600 font-extrabold text-xs">02</span>
                    <h2 className="text-base font-black text-slate-900">손해보험사 (총 13개사)</h2>
                  </div>
                  <span className="bg-blue-50 text-blue-600 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    {
                      MOCK_INSURERS_DETAIL.nonLife.filter((item) =>
                        item.name.toLowerCase().includes(insurerSearchQuery.toLowerCase())
                      ).length
                    }개사 조회됨
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {MOCK_INSURERS_DETAIL.nonLife
                    .filter((item) =>
                      item.name.toLowerCase().includes(insurerSearchQuery.toLowerCase())
                    )
                    .map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 transition space-y-3 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-black text-emerald-600 shrink-0">
                                {item.name.substring(0, 1)}
                              </div>
                              <h3 className="font-bold text-slate-900 text-xs">{item.name}</h3>
                            </div>
                            <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 text-[9px] px-1.5 py-0.5 rounded font-extrabold">
                              {item.status}
                            </span>
                          </div>

                          <div className="bg-slate-50 p-2.5 rounded-lg space-y-1 border border-slate-100">
                            <div className="flex justify-between items-center text-[11px]">
                              <span className="text-slate-400">최대 수수료율</span>
                              <span className="font-black text-emerald-600">{item.maxCommission}</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px]">
                              <span className="text-slate-400">초년도/총지급</span>
                              <span className="font-semibold text-slate-700">{item.firstMonth} / {item.total12}</span>
                            </div>
                          </div>

                          <div className="space-y-1 text-[10px] text-slate-500 pt-1">
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1"><Headphones className="w-3 h-3 text-slate-400" /> 콜센터</span>
                              <span className="font-mono text-slate-700">{item.phone}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1"><PhoneCall className="w-3 h-3 text-slate-400" /> 인콜지원</span>
                              <span className="font-mono text-slate-700">{item.inCall}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1"><Printer className="w-3 h-3 text-slate-400" /> 팩스번호</span>
                              <span className="font-mono text-slate-700">{item.fax}</span>
                            </div>
                          </div>
                        </div>

                        <button 
                          onClick={() => alert(`${item.name} 전산 매뉴얼 및 수수료 상세표 다운로드 요청`)}
                          className="w-full mt-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-600 text-slate-600 font-bold py-1.5 rounded-lg text-[11px] transition text-center"
                        >
                          전산 지원 및 상세 수수료표
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 탭 3: 받은 역경매 제안함 */}
        {mainTab === "OFFERS_INBOX" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <h2 className="text-base font-black text-slate-900">받은 이직/스카우트 제안 목록</h2>
                <p className="text-slate-500 text-[11px]">GA 매니저들이 나의 익명 프로필을 확인하고 전달한 맞춤 제안서입니다.</p>
              </div>
              <span className="bg-blue-100 text-blue-700 font-extrabold px-3 py-1 rounded-full text-xs">
                총 {MOCK_OFFERS_RECEIVED.length}건 수신
              </span>
            </div>

            <div className="space-y-4">
              {MOCK_OFFERS_RECEIVED.map((offer) => (
                <div key={offer.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold">{offer.date} 제안 수신</span>
                      <h3 className="text-base font-black text-slate-900">{offer.gaName}</h3>
                    </div>
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full">
                      {offer.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 block">제안 수수료 조건</span>
                      <span className="font-black text-slate-800 text-xs">{offer.offeredCommission}</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 block">제안 정착지원금</span>
                      <span className="font-black text-blue-600 text-xs">{offer.offeredSettlement}</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 block">제안 DB 지원</span>
                      <span className="font-black text-emerald-600 text-xs">{offer.offeredDb}</span>
                    </div>
                  </div>

                  <div className="bg-blue-50/50 p-3.5 rounded-xl border border-blue-100 text-slate-700 text-[11px] leading-relaxed">
                    <span className="font-bold text-blue-900 block mb-1">GA 매니저의 메시지:</span>
                    "{offer.message}"
                  </div>

                  <div className="flex gap-2 justify-end pt-1">
                    <button 
                      onClick={() => alert("제안을 거절하였습니다.")}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition"
                    >
                      거절하기
                    </button>
                    <button 
                      onClick={() => alert("제안을 수락하였습니다! 담당 매니저가 매칭 대화방으로 안내해 드립니다.")}
                      className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs transition shadow-md"
                    >
                      제안 수락 및 연락처 공개
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 탭 4: FC 익명 프로필 및 조건 설정 */}
        {mainTab === "FC_PROFILE" && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h2 className="text-lg font-black text-slate-900">내 익명 프로필 & 이직 희망 조건</h2>
                <p className="text-slate-500 text-xs mt-0.5">
                  검증된 경력과 실적 정보로 GA 매니저들에게 최고의 조건(수수료, 정착금, DB)을 제안받으세요.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAutoFetchData}
                disabled={isAutoSyncing}
                className="bg-amber-400 hover:bg-amber-500 text-amber-950 font-black px-4 py-2.5 rounded-xl text-xs transition shadow-sm flex items-center gap-2 shrink-0"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isAutoSyncing ? "animate-spin" : ""}`} />
                <span>{isAutoSyncing ? "데이터 불러오는 중..." : "카카오 인증 실적 자동 불러오기"}</span>
              </button>
            </div>

            <form onSubmit={handleOpenPreview} className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-blue-600" />
                  <h3 className="font-black text-sm text-slate-800">프로필 정보</h3>
                  <span className="text-slate-400 text-[11px] font-medium">본인의 경력과 실적을 알려주세요</span>
                </div>

                <div className="space-y-1">
                  <label className="font-extrabold text-slate-700 text-xs">익명 닉네임</label>
                  <input
                    type="text"
                    value={profile.nickname}
                    onChange={(e) => setProfile({ ...profile, nickname: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-extrabold text-slate-700 text-xs">경력 연차</label>
                    <select
                      value={profile.exp}
                      onChange={(e) => setProfile({ ...profile, exp: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {CAREER_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-extrabold text-slate-700 text-xs">주력 영업 분야</label>
                    <select
                      value={profile.mainField}
                      onChange={(e) => setProfile({ ...profile, mainField: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {MAIN_FIELD_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-extrabold text-slate-700 text-xs flex items-center gap-1.5">
                      <span>월 평균 매출 (업적)</span>
                      {profile.isVerified && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                          <Check className="w-2.5 h-2.5" />
                          인증됨
                        </span>
                      )}
                    </label>
                    <input
                      type="text"
                      value={profile.salesRange}
                      onChange={(e) => setProfile({ ...profile, salesRange: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-extrabold text-slate-700 text-xs flex items-center gap-1.5">
                      <span>유지율</span>
                      {profile.isVerified && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                          <Check className="w-2.5 h-2.5" />
                          인증됨
                        </span>
                      )}
                    </label>
                    <input
                      type="text"
                      value={profile.retentionRate}
                      onChange={(e) => setProfile({ ...profile, retentionRate: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-5 space-y-4">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-600" />
                  <h3 className="font-black text-sm text-slate-800">이직 희망 조건</h3>
                  <span className="text-slate-400 text-[11px] font-medium">GA에게 제안받고 싶은 조건을 알려주세요</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-extrabold text-slate-700 text-xs">희망 최소 수수료율</label>
                    <input
                      type="text"
                      value={profile.minCommission}
                      onChange={(e) => setProfile({ ...profile, minCommission: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-extrabold text-slate-700 text-xs">희망 최소 정착지원금</label>
                    <input
                      type="text"
                      value={profile.minSettlement}
                      onChange={(e) => setProfile({ ...profile, minSettlement: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-extrabold text-slate-700 text-xs">희망 근무 지역</label>
                  <input
                    type="text"
                    value={profile.preferredRegion}
                    onChange={(e) => setProfile({ ...profile, preferredRegion: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-extrabold text-slate-700 text-xs">기타 요청사항 / 지점 지원 희망 조건</label>
                  <textarea
                    rows={3}
                    value={profile.memo}
                    onChange={(e) => setProfile({ ...profile, memo: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3.5 rounded-xl text-xs transition shadow-lg"
                >
                  익명 프로필 저장 및 GA 역경매 입찰 받기
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 탭 GA-0: 홈 대시보드 */}
        {mainTab === "GA_HOME" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-black text-slate-900">안녕하세요, {gaProfile.gaName} 매니저님</h2>
              <p className="text-slate-500 text-sm mt-1.5">
                오늘도 좋은 인재와의 매칭을 응원합니다. 현재 활동 현황을 한눈에 확인하세요.
              </p>
            </div>

            {sentOffers.length === 0 && (
              <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-6">
                <h3 className="font-black text-base text-blue-900 mb-4">시작하기 전에 이 순서로 진행해보세요</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-4 border border-blue-100 space-y-1.5">
                    <span className="text-blue-600 font-black text-sm">STEP 1</span>
                    <p className="font-bold text-slate-800 text-xs">GA 정보를 등록하세요</p>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      설계사에게 노출될 우리 GA의 기본 정보를 채워주세요.
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-blue-100 space-y-1.5">
                    <span className="text-blue-600 font-black text-sm">STEP 2</span>
                    <p className="font-bold text-slate-800 text-xs">이직희망 설계사를 둘러보세요</p>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      경력, 실적, 희망 조건을 확인하고 원하는 인재를 찾아보세요.
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-blue-100 space-y-1.5">
                    <span className="text-blue-600 font-black text-sm">STEP 3</span>
                    <p className="font-bold text-slate-800 text-xs">제안을 보내보세요</p>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      마음에 드는 후보에게 맞춤 조건으로 스카우트 제안을 보내세요.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                  <UserCheck className="w-4 h-4" />
                  <span>활성 후보 수</span>
                </div>
                <p className="text-2xl font-black text-slate-900 mt-1.5">{MOCK_FC_CANDIDATES.length}명</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                  <Inbox className="w-4 h-4" />
                  <span>보낸 제안</span>
                </div>
                <p className="text-2xl font-black text-slate-900 mt-1.5">{sentOffers.length}건</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                  <Check className="w-4 h-4" />
                  <span>매칭 성사</span>
                </div>
                <p className="text-2xl font-black text-emerald-600 mt-1.5">{matchedOffersCount}건</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                  <TrendingUp className="w-4 h-4" />
                  <span>응답률</span>
                </div>
                <p className="text-2xl font-black text-blue-600 mt-1.5">{responseRateLabel}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-base text-slate-900">최근 보낸 제안</h3>
                  <button
                    type="button"
                    onClick={() => setMainTab("SENT_OFFERS")}
                    className="text-blue-600 text-xs font-bold hover:underline"
                  >
                    전체보기 →
                  </button>
                </div>
                {sentOffers.length === 0 ? (
                  <p className="text-slate-400 text-xs py-7 text-center">아직 보낸 제안이 없습니다.</p>
                ) : (
                  <div className="space-y-2.5">
                    {sentOffers.slice(0, 3).map((offer) => (
                      <div key={offer.id} className="flex items-center justify-between bg-slate-50 rounded-xl p-3.5">
                        <div>
                          <p className="font-bold text-slate-800 text-xs">{offer.candidateNickname}</p>
                          <p className="text-slate-400 text-[11px]">{offer.offeredCommission}</p>
                        </div>
                        <span
                          className={`text-[11px] font-extrabold px-2 py-1 rounded-full shrink-0 ${
                            offer.status === "매칭 완료"
                              ? "bg-emerald-100 text-emerald-700"
                              : offer.status === "거절됨"
                              ? "bg-slate-200 text-slate-600"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {offer.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-base text-slate-900">추천 후보</h3>
                  <button
                    type="button"
                    onClick={() => setMainTab("FC_CANDIDATES")}
                    className="text-blue-600 text-xs font-bold hover:underline"
                  >
                    전체보기 →
                  </button>
                </div>
                <div className="space-y-2.5">
                  {MOCK_FC_CANDIDATES.slice(0, 3).map((candidate) => (
                    <div key={candidate.id} className="flex items-center justify-between bg-slate-50 rounded-xl p-3.5">
                      <div>
                        <p className="font-bold text-slate-800 text-xs">{candidate.nickname}</p>
                        <p className="text-slate-400 text-[11px]">{candidate.mainField}</p>
                      </div>
                      <span className="font-bold text-blue-600 text-xs shrink-0">{candidate.minCommission}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-base text-slate-900">우리 GA 프로필</h3>
                  <button
                    type="button"
                    onClick={() => setMainTab("GA_PROFILE")}
                    className="text-blue-600 text-xs font-bold hover:underline"
                  >
                    수정하기 →
                  </button>
                </div>
                <div className="bg-slate-50 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <Building2 className="w-4.5 h-4.5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-xs">{gaProfile.gaName}</p>
                      <p className="text-slate-400 text-[11px]">{gaProfile.branch}</p>
                    </div>
                  </div>
                  <p className="text-slate-500 text-[11px] leading-relaxed pt-1">{gaProfile.intro}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="bg-white border border-slate-200 text-slate-600 text-[10px] font-bold px-2 py-1 rounded-full">
                      수수료 {gaProfile.commissionMin}~{gaProfile.commissionMax}%
                    </span>
                    <span className="bg-white border border-slate-200 text-slate-600 text-[10px] font-bold px-2 py-1 rounded-full">
                      정착지원금{" "}
                      {Number(gaProfile.settlementSupportPercent) > 0
                        ? `직전업적 ${gaProfile.settlementSupportPercent}%까지`
                        : "미지원"}
                    </span>
                    <span className="bg-white border border-slate-200 text-slate-600 text-[10px] font-bold px-2 py-1 rounded-full">
                      DB {gaProfile.dbSupport}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 탭 GA-1: 이직 희망 설계사 후보 리스트 */}
        {mainTab === "FC_CANDIDATES" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
                <div className="relative flex-1 sm:w-56">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="닉네임, 분야, 지역 검색"
                    value={candidateSearchQuery}
                    onChange={(e) => setCandidateSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <select
                  value={candidateFieldFilter}
                  onChange={(e) => setCandidateFieldFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-700 outline-none"
                >
                  <option value="ALL">전체 분야</option>
                  {MAIN_FIELD_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 text-slate-500 text-xs font-medium self-end sm:self-auto">
                <span>정렬 기준:</span>
                <select
                  value={candidateSort}
                  onChange={(e) => setCandidateSort(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg p-1.5 font-bold text-slate-800 outline-none"
                >
                  <option value="SALES_DESC">월 매출 높은순</option>
                  <option value="RETENTION_DESC">유지율 높은순</option>
                  <option value="COMMISSION_ASC">희망 수수료 낮은순</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <span className="text-slate-500 text-[11px] font-semibold">
                조건에 맞는 설계사에게 먼저 제안을 보내보세요. 이름/연락처는 제안 수락 전까지 비공개입니다.
              </span>
              <span className="bg-blue-100 text-blue-700 font-extrabold px-3 py-1 rounded-full text-xs shrink-0">
                {filteredCandidates.length}명 검색됨
              </span>
            </div>

            {filteredCandidates.length === 0 ? (
              <div className="bg-white p-10 rounded-2xl border border-slate-200 shadow-sm text-center text-slate-400 text-xs">
                검색 조건에 맞는 후보가 없습니다.
              </div>
            ) : (
            <div className="space-y-4">
              {filteredCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-400 transition space-y-4"
                >
                  <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <UserCheck className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-black text-sm text-slate-900">{candidate.nickname}</h3>
                        <p className="text-[11px] text-slate-500">
                          {candidate.exp} · {candidate.mainField}
                        </p>
                      </div>
                    </div>
                    {candidate.isVerified && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full shrink-0">
                        <Check className="w-3 h-3" />
                        실적 인증됨
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
                    <div>
                      <span className="text-slate-400 font-semibold block">월 평균 매출</span>
                      <span className="font-bold text-slate-800">{candidate.salesRange}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block">유지율</span>
                      <span className="font-bold text-slate-800">{candidate.retentionRate}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block">희망 최소 수수료율</span>
                      <span className="font-bold text-blue-600">{candidate.minCommission}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block">희망 최소 정착지원금</span>
                      <span className="font-bold text-blue-600">{candidate.minSettlement}</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] text-slate-600">
                    <span className="font-bold text-slate-700 block mb-1">희망 근무 지역: {candidate.preferredRegion}</span>
                    <p className="leading-relaxed">{candidate.memo}</p>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setOfferTarget(candidate);
                        setOfferForm({ commission: "", settlement: "", db: "", message: "" });
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition shadow-sm"
                    >
                      제안 보내기
                    </button>
                  </div>
                </div>
              ))}
            </div>
            )}
          </div>
        )}

        {/* 탭 GA-2: 보낸 제안 관리 */}
        {mainTab === "SENT_OFFERS" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <h2 className="text-base font-black text-slate-900">보낸 제안 관리</h2>
                <p className="text-slate-500 text-[11px]">설계사 후보에게 보낸 스카우트 제안 현황입니다.</p>
              </div>
              <span className="bg-blue-100 text-blue-700 font-extrabold px-3 py-1 rounded-full text-xs">
                총 {sentOffers.length}건 발송
              </span>
            </div>

            {sentOffers.length === 0 ? (
              <div className="bg-white p-10 rounded-2xl border border-slate-200 shadow-sm text-center text-slate-400 text-xs">
                아직 보낸 제안이 없습니다. "이직 희망 설계사 후보 리스트"에서 제안을 보내보세요.
              </div>
            ) : (
              <div className="space-y-4">
                {sentOffers.map((offer) => (
                  <div key={offer.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold">{offer.date} 발송</span>
                        <h3 className="text-sm font-black text-slate-900">{offer.candidateNickname}</h3>
                      </div>
                      <span
                        className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                          offer.status === "매칭 완료"
                            ? "bg-emerald-100 text-emerald-700"
                            : offer.status === "거절됨"
                            ? "bg-slate-200 text-slate-600"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {offer.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <span className="text-slate-400 font-bold block">제안 수수료</span>
                        <span className="font-black text-slate-800">{offer.offeredCommission}</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <span className="text-slate-400 font-bold block">정착지원금</span>
                        <span className="font-black text-blue-600">{offer.offeredSettlement}</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <span className="text-slate-400 font-bold block">DB 지원</span>
                        <span className="font-black text-emerald-600">{offer.offeredDb}</span>
                      </div>
                    </div>

                    {offer.message && (
                      <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 text-slate-700 text-[11px] leading-relaxed">
                        "{offer.message}"
                      </div>
                    )}

                    {offer.status === "매칭 완료" && (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-[11px] text-emerald-800">
                        <span className="font-bold block mb-0.5">🎉 매칭 완료 - 연락처가 공개되었습니다</span>
                        <span>연락처: {offer.candidatePhone}</span>
                      </div>
                    )}

                    {offer.status === "대기중" && (
                      <div className="space-y-1.5 pt-1 border-t border-slate-100">
                        <div className="flex gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => handleUpdateOfferStatus(offer.id, "거절됨")}
                            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2 rounded-xl text-[11px] transition"
                          >
                            (모의) 거절 처리
                          </button>
                          <button
                            type="button"
                            onClick={() => handleUpdateOfferStatus(offer.id, "매칭 완료")}
                            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-[11px] transition"
                          >
                            (모의) 수락 처리
                          </button>
                        </div>
                        <p className="text-[10px] text-slate-400">
                          * 실제 서비스에서는 설계사가 직접 제안에 응답합니다. 위 버튼은 데모용입니다.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 탭 GA-3: GA 정보 */}
        {mainTab === "GA_PROFILE" && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-black text-slate-900">GA 정보</h2>
              <p className="text-slate-500 text-xs mt-0.5">
                설계사에게 노출되는 우리 GA의 기본 정보입니다. 후보별 최종 확정 조건은 설계사마다 달라 "제안 보내기"에서
                개별로 입력하며, 아래 수수료율·정착지원금·DB 지원 범위는 설계사가 GA를 비교할 때 참고하는 어필 조건으로
                비교·추천 화면에 공통으로 노출됩니다.
              </p>
            </div>

            <form onSubmit={handleSaveGaProfile} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-extrabold text-slate-700 text-xs">GA명</label>
                  <input
                    type="text"
                    value={gaProfile.gaName}
                    onChange={(e) => setGaProfile({ ...gaProfile, gaName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-extrabold text-slate-700 text-xs">지점/본부명</label>
                  <input
                    type="text"
                    value={gaProfile.branch}
                    onChange={(e) => setGaProfile({ ...gaProfile, branch: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-extrabold text-slate-700 text-xs">담당자명</label>
                  <input
                    type="text"
                    value={gaProfile.contactName}
                    onChange={(e) => setGaProfile({ ...gaProfile, contactName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-extrabold text-slate-700 text-xs">연락처</label>
                  <input
                    type="text"
                    value={gaProfile.contactPhone}
                    onChange={(e) => setGaProfile({ ...gaProfile, contactPhone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-4 border-t border-slate-100 pt-5">
                <div>
                  <h3 className="font-black text-sm text-slate-900">설계사 비교·추천 화면에 노출되는 어필 조건</h3>
                  <p className="text-slate-400 text-[11px] mt-0.5 leading-relaxed">
                    아래 항목은 확정된 최종 조건이 아니라 설계사가 GA를 비교할 때 참고하는 범위입니다. 실제 최종 조건은 후보별 "제안 보내기"에서 개별로 협의합니다.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="font-extrabold text-slate-700 text-xs">수수료 지급률 (범위)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={gaProfile.commissionMin}
                      onChange={(e) => setGaProfile({ ...gaProfile, commissionMin: e.target.value })}
                      placeholder="최소 (예: 88)"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-slate-400 font-bold text-xs shrink-0">% ~</span>
                    <input
                      type="text"
                      value={gaProfile.commissionMax}
                      onChange={(e) => setGaProfile({ ...gaProfile, commissionMax: e.target.value })}
                      placeholder="최대 (예: 93)"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-slate-400 font-bold text-xs shrink-0">%</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed pt-0.5">
                    경력·실적에 따라 지급 가능한 수수료율 범위를 여유 있게 입력해주세요.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="font-extrabold text-slate-700 text-xs">정착지원금</label>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 font-bold text-xs shrink-0">직전 업적의</span>
                    <input
                      type="number"
                      min="0"
                      value={gaProfile.settlementSupportPercent}
                      onChange={(e) => setGaProfile({ ...gaProfile, settlementSupportPercent: e.target.value })}
                      placeholder="0"
                      className="w-24 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-center outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-slate-500 font-bold text-xs shrink-0">% 까지 지원</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed pt-0.5">
                    직전 업적 대비 지원 가능한 최대 비율을 입력해주세요. 0을 입력하면 "미지원"으로 표시됩니다.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="font-extrabold text-slate-700 text-xs">DB 지원</label>
                  <select
                    value={gaProfile.dbSupport}
                    onChange={(e) => setGaProfile({ ...gaProfile, dbSupport: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {DB_SUPPORT_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-extrabold text-slate-700 text-xs">GA 소개</label>
                <textarea
                  rows={3}
                  value={gaProfile.intro}
                  onChange={(e) => setGaProfile({ ...gaProfile, intro: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3.5 rounded-xl text-xs transition shadow-lg"
                >
                  GA 정보 저장
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 탭: 커뮤니티 */}
        {mainTab === "COMMUNITY" && (
          <div className="space-y-5">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-black text-slate-900">커뮤니티</h2>
                <p className="text-slate-500 text-xs mt-1">
                  설계사와 GA 파트너들이 이직·위촉 경험과 노하우를 나누는 공간입니다.
                </p>
              </div>
              <button
                type="button"
                onClick={() => alert("글쓰기 기능은 준비 중입니다!")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs transition shadow-sm shrink-0"
              >
                글쓰기
              </button>
            </div>

            <div className="space-y-4">
              {communityPosts.map((post) => (
                <div key={post.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
                          post.role === "GA" ? "bg-slate-900 text-white" : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {post.author.slice(0, 1)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-xs">{post.author}</p>
                        <p className="text-slate-400 text-[11px]">{post.badge}</p>
                      </div>
                    </div>
                    <span className="text-slate-400 text-[11px]">{post.date}</span>
                  </div>

                  <div>
                    <h3 className="font-black text-slate-900 text-sm">{post.title}</h3>
                    <p className="text-slate-600 text-xs leading-relaxed mt-1.5">{post.content}</p>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="inline-block bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full">
                      #{post.tag}
                    </span>
                    <div className="flex items-center gap-3 text-slate-400 text-[11px] font-semibold">
                      <span>좋아요 {post.likes}</span>
                      <span>댓글 {post.comments}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 탭 관리자-0: 대시보드 */}
        {mainTab === "ADMIN_HOME" && (
          <div className="space-y-5">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-black text-slate-900">관리자 대시보드</h2>
              <p className="text-slate-500 text-xs mt-1">
                가입한 설계사·GA 현황과 처리가 필요한 항목을 한눈에 확인하세요.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-semibold">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>가입 설계사</span>
                </div>
                <p className="text-xl font-black text-slate-900 mt-1">{adminFcUsers.length}명</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-semibold">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>가입 GA</span>
                </div>
                <p className="text-xl font-black text-slate-900 mt-1">{adminGaUsers.length}개사</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>노출 승인 대기</span>
                </div>
                <p className="text-xl font-black text-amber-600 mt-1">
                  {adminGaUsers.filter((ga) => ga.exposureStatus === "승인대기").length}건
                </p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-semibold">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>신고된 게시글</span>
                </div>
                <p className="text-xl font-black text-red-600 mt-1">
                  {communityPosts.filter((p) => p.reported).length}건
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-sm text-slate-900">GA 노출 승인 대기</h3>
                  <button
                    type="button"
                    onClick={() => setMainTab("ADMIN_GA")}
                    className="text-blue-600 text-[11px] font-bold hover:underline"
                  >
                    전체보기 →
                  </button>
                </div>
                {adminGaUsers.filter((ga) => ga.exposureStatus === "승인대기").length === 0 ? (
                  <p className="text-slate-400 text-[11px] py-6 text-center">승인 대기 중인 GA가 없습니다.</p>
                ) : (
                  <div className="space-y-2">
                    {adminGaUsers
                      .filter((ga) => ga.exposureStatus === "승인대기")
                      .map((ga) => (
                        <div key={ga.id} className="flex items-center justify-between bg-slate-50 rounded-xl p-3">
                          <div>
                            <p className="font-bold text-slate-800 text-[11px]">{ga.gaName}</p>
                            <p className="text-slate-400 text-[10px]">{ga.branch}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleUpdateGaExposure(ga.id, "노출중")}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] px-2.5 py-1.5 rounded-lg transition shrink-0"
                          >
                            승인
                          </button>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-sm text-slate-900">신고된 커뮤니티 게시글</h3>
                  <button
                    type="button"
                    onClick={() => setMainTab("ADMIN_COMMUNITY")}
                    className="text-blue-600 text-[11px] font-bold hover:underline"
                  >
                    전체보기 →
                  </button>
                </div>
                {communityPosts.filter((p) => p.reported).length === 0 ? (
                  <p className="text-slate-400 text-[11px] py-6 text-center">신고된 게시글이 없습니다.</p>
                ) : (
                  <div className="space-y-2">
                    {communityPosts
                      .filter((p) => p.reported)
                      .map((post) => (
                        <div key={post.id} className="bg-red-50 border border-red-100 rounded-xl p-3">
                          <p className="font-bold text-slate-800 text-[11px]">{post.title}</p>
                          <p className="text-red-600 text-[10px] mt-0.5">{post.reportReason}</p>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 탭 관리자-1: 설계사 계정 관리 */}
        {mainTab === "ADMIN_FC" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="relative sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="닉네임 또는 분야 검색"
                  value={adminFcSearchQuery}
                  onChange={(e) => setAdminFcSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="space-y-3">
              {filteredAdminFcUsers.map((fc) => (
                <div
                  key={fc.id}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <UserCheck className="w-4.5 h-4.5 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="font-bold text-slate-800 text-xs">{fc.nickname}</p>
                        {fc.verified && (
                          <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            인증됨
                          </span>
                        )}
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            fc.status === "활성"
                              ? "bg-emerald-50 text-emerald-700"
                              : fc.status === "정지"
                              ? "bg-red-50 text-red-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {fc.status}
                        </span>
                      </div>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        {fc.mainField} · {fc.exp} · 가입일 {fc.joinedDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setAdminDetailTarget({ type: "FC", id: fc.id })}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-[11px] px-3 py-2 rounded-lg transition"
                    >
                      상세보기
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleFcStatus(fc.id)}
                      className={`font-bold text-[11px] px-3 py-2 rounded-lg transition ${
                        fc.status === "정지"
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-red-50 hover:bg-red-100 text-red-600"
                      }`}
                    >
                      {fc.status === "정지" ? "정지 해제" : "계정 정지"}
                    </button>
                  </div>
                </div>
              ))}
              {filteredAdminFcUsers.length === 0 && (
                <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-400 text-xs">
                  검색 조건에 맞는 설계사가 없습니다.
                </div>
              )}
            </div>
          </div>
        )}

        {/* 탭 관리자-1B: 설계사 인증 심사 */}
        {mainTab === "ADMIN_VERIFICATION" && (
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-black text-slate-900">설계사 인증 심사</h2>
              <p className="text-slate-500 text-xs mt-1">
                설계사가 제출한 경력·실적 자료를 검토하고 인증 여부를 결정하세요.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-black text-xs text-slate-700 px-1">심사 대기 ({adminFcUsers.filter((fc) => fc.verificationStatus === "심사중").length}건)</h3>
              {adminFcUsers.filter((fc) => fc.verificationStatus === "심사중").length === 0 ? (
                <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-400 text-xs">
                  심사 대기 중인 설계사가 없습니다.
                </div>
              ) : (
                adminFcUsers
                  .filter((fc) => fc.verificationStatus === "심사중")
                  .map((fc) => (
                    <div key={fc.id} className="bg-amber-50/60 border border-amber-100 p-4 rounded-2xl space-y-3">
                      <div>
                        <p className="font-bold text-slate-800 text-xs">{fc.nickname}</p>
                        <p className="text-slate-500 text-[11px] mt-0.5">
                          {fc.mainField} · {fc.exp} · 매출 {fc.salesRange} · 유지율 {fc.retentionRate}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleReviewVerification(fc.id, "승인됨")}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] px-3 py-2 rounded-lg transition"
                        >
                          인증 승인
                        </button>
                        <button
                          type="button"
                          onClick={() => handleReviewVerification(fc.id, "반려됨")}
                          className="bg-red-50 hover:bg-red-100 text-red-600 font-bold text-[11px] px-3 py-2 rounded-lg transition"
                        >
                          반려
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>

            <div className="space-y-3">
              <h3 className="font-black text-xs text-slate-700 px-1">심사 완료 이력</h3>
              {adminFcUsers
                .filter((fc) => fc.verificationStatus !== "심사중")
                .map((fc) => (
                  <div
                    key={fc.id}
                    className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between"
                  >
                    <p className="font-bold text-slate-800 text-xs">{fc.nickname}</p>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        fc.verificationStatus === "승인됨"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {fc.verificationStatus}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* 탭 관리자-2: GA 계정 관리 */}
        {mainTab === "ADMIN_GA" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="relative sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="GA명 또는 지점 검색"
                  value={adminGaSearchQuery}
                  onChange={(e) => setAdminGaSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="space-y-3">
              {filteredAdminGaUsers.map((ga) => (
                <div key={ga.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="font-bold text-slate-800 text-xs">{ga.gaName}</p>
                        <span className="text-slate-400 text-[11px] font-bold">({ga.branch})</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            ga.exposureStatus === "노출중"
                              ? "bg-emerald-50 text-emerald-700"
                              : ga.exposureStatus === "승인대기"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {ga.exposureStatus}
                        </span>
                      </div>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        담당자 {ga.contactName} · {ga.contactPhone} · 가입일 {ga.joinedDate}
                      </p>
                      <p className="text-slate-500 text-[11px] mt-0.5 font-bold">
                        수수료 {ga.commissionMin}~{ga.commissionMax}%
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 flex-wrap">
                      <select
                        value={ga.exposurePlan}
                        onChange={(e) => handleUpdateGaPlan(ga.id, e.target.value)}
                        className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-[11px] font-bold text-slate-700 outline-none"
                      >
                        {EXPOSURE_PLANS.map((plan) => (
                          <option key={plan.id} value={plan.id}>
                            {plan.name}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => setAdminDetailTarget({ type: "GA", id: ga.id })}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-[11px] px-3 py-2 rounded-lg transition"
                      >
                        상세보기
                      </button>
                      {ga.exposureStatus !== "노출중" && (
                        <button
                          type="button"
                          onClick={() => handleUpdateGaExposure(ga.id, "노출중")}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] px-3 py-2 rounded-lg transition"
                        >
                          노출 승인
                        </button>
                      )}
                      {ga.exposureStatus !== "보류/비노출" && (
                        <button
                          type="button"
                          onClick={() => handleUpdateGaExposure(ga.id, "보류/비노출")}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-[11px] px-3 py-2 rounded-lg transition"
                        >
                          노출 보류
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {filteredAdminGaUsers.length === 0 && (
                <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-400 text-xs">
                  검색 조건에 맞는 GA가 없습니다.
                </div>
              )}
            </div>
          </div>
        )}

        {/* 탭 관리자-2B: 노출 상품(요금제) 관리 */}
        {mainTab === "ADMIN_PLANS" && (
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-black text-slate-900">노출 상품 관리</h2>
              <p className="text-slate-500 text-xs mt-1">
                GA가 구매할 수 있는 노출 요금제입니다. "GA 관리" 탭에서 각 GA에 적용된 플랜을 변경할 수 있습니다.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {EXPOSURE_PLANS.map((plan) => (
                <div key={plan.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-sm text-slate-900">{plan.name}</h3>
                    <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-full">
                      {adminGaUsers.filter((ga) => ga.exposurePlan === plan.id).length}개사 이용중
                    </span>
                  </div>
                  <p className="font-black text-blue-600 text-base">{plan.price}</p>
                  <p className="text-slate-500 text-[11px] leading-relaxed">{plan.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 탭 관리자-2C: 매출/정산 관리 */}
        {mainTab === "ADMIN_BILLING" && (
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-black text-slate-900">매출/정산 관리</h2>
              <p className="text-slate-500 text-xs mt-1">GA 노출 상품 결제 현황과 미납 계정을 관리하세요.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-slate-400 text-[11px] font-semibold">이번달 매출 합계</p>
                <p className="text-xl font-black text-slate-900 mt-1">
                  {adminInvoices
                    .filter((inv) => inv.status === "결제완료")
                    .reduce((sum, inv) => sum + inv.amount, 0)
                    .toLocaleString()}
                  원
                </p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-slate-400 text-[11px] font-semibold">미납 금액</p>
                <p className="text-xl font-black text-red-600 mt-1">
                  {adminInvoices
                    .filter((inv) => inv.status === "미납")
                    .reduce((sum, inv) => sum + inv.amount, 0)
                    .toLocaleString()}
                  원
                </p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-slate-400 text-[11px] font-semibold">미납 건수</p>
                <p className="text-xl font-black text-amber-600 mt-1">
                  {adminInvoices.filter((inv) => inv.status === "미납").length}건
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {adminInvoices.map((inv) => (
                <div
                  key={inv.id}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-slate-800 text-xs">{inv.gaName}</p>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          inv.status === "결제완료"
                            ? "bg-emerald-50 text-emerald-700"
                            : inv.status === "미납"
                            ? "bg-red-50 text-red-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {inv.status}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      {inv.plan} · {inv.amount.toLocaleString()}원 · 청구일 {inv.billingDate}
                    </p>
                  </div>
                  {inv.status === "미납" && (
                    <button
                      type="button"
                      onClick={() => handleConfirmPayment(inv.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] px-3 py-2 rounded-lg transition shrink-0"
                    >
                      결제 확인
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 탭 관리자-2D: 통계 대시보드 */}
        {mainTab === "ADMIN_STATS" && (
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-black text-slate-900">통계</h2>
              <p className="text-slate-500 text-xs mt-1">가입 추이와 매칭 현황을 한눈에 확인하세요.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-black text-sm text-slate-900">월별 가입 추이</h3>
              <div className="flex items-end justify-between gap-3 h-40">
                {MOCK_SIGNUP_TREND.map((row) => {
                  const max = Math.max(...MOCK_SIGNUP_TREND.map((r) => r.fc + r.ga));
                  const fcHeight = (row.fc / max) * 100;
                  const gaHeight = (row.ga / max) * 100;
                  return (
                    <div key={row.month} className="flex-1 flex flex-col items-center gap-1.5">
                      <div className="w-full flex items-end justify-center gap-1 h-32">
                        <div
                          className="w-1/2 bg-blue-500 rounded-t-md"
                          style={{ height: `${fcHeight}%` }}
                          title={`설계사 ${row.fc}명`}
                        />
                        <div
                          className="w-1/2 bg-amber-400 rounded-t-md"
                          style={{ height: `${gaHeight}%` }}
                          title={`GA ${row.ga}개사`}
                        />
                      </div>
                      <span className="text-slate-400 text-[10px] font-bold">{row.month}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> 설계사 가입
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> GA 가입
                </span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-black text-sm text-slate-900">제안 매칭 현황</h3>
              {(() => {
                const total = MOCK_MATCH_STATS.pending + MOCK_MATCH_STATS.matched + MOCK_MATCH_STATS.rejected;
                const pendingPct = Math.round((MOCK_MATCH_STATS.pending / total) * 100);
                const matchedPct = Math.round((MOCK_MATCH_STATS.matched / total) * 100);
                const rejectedPct = 100 - pendingPct - matchedPct;
                return (
                  <>
                    <div className="w-full h-4 rounded-full overflow-hidden flex">
                      <div className="bg-amber-400" style={{ width: `${pendingPct}%` }} />
                      <div className="bg-emerald-500" style={{ width: `${matchedPct}%` }} />
                      <div className="bg-slate-300" style={{ width: `${rejectedPct}%` }} />
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-[11px] font-semibold text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> 대기중 {MOCK_MATCH_STATS.pending}건 ({pendingPct}%)
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> 매칭 완료 {MOCK_MATCH_STATS.matched}건 ({matchedPct}%)
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-300" /> 거절됨 {MOCK_MATCH_STATS.rejected}건 ({rejectedPct}%)
                      </span>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}

        {/* 탭 관리자-3: 커뮤니티 관리 */}
        {mainTab === "ADMIN_COMMUNITY" && (
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-black text-slate-900">커뮤니티 관리</h2>
              <p className="text-slate-500 text-xs mt-1">신고 접수된 게시글을 우선 검토하고 조치하세요.</p>
            </div>

            <div className="space-y-3">
              {communityPosts.map((post) => (
                <div
                  key={post.id}
                  className={`bg-white p-4 rounded-2xl border shadow-sm space-y-2 ${
                    post.reported ? "border-red-200" : "border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-800 text-xs">{post.author}</span>
                      <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {post.role}
                      </span>
                      {post.reported && (
                        <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          신고 접수
                        </span>
                      )}
                    </div>
                    <span className="text-slate-400 text-[11px]">{post.date}</span>
                  </div>
                  <p className="font-black text-slate-900 text-sm">{post.title}</p>
                  <p className="text-slate-600 text-xs leading-relaxed">{post.content}</p>
                  {post.reported && <p className="text-red-600 text-[11px] font-semibold">{post.reportReason}</p>}
                  <div className="flex items-center gap-2 pt-1">
                    {post.reported && (
                      <button
                        type="button"
                        onClick={() => handleDismissReport(post.id)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-[11px] px-3 py-1.5 rounded-lg transition"
                      >
                        신고 해제
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDeletePost(post.id)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 font-bold text-[11px] px-3 py-1.5 rounded-lg transition"
                    >
                      게시글 삭제
                    </button>
                  </div>
                </div>
              ))}
              {communityPosts.length === 0 && (
                <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-400 text-xs">
                  게시글이 없습니다.
                </div>
              )}
            </div>
          </div>
        )}

        {/* 탭 관리자-4: 공지사항 관리 */}
        {mainTab === "ADMIN_ANNOUNCEMENTS" && (
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-black text-slate-900">공지사항 관리</h2>
              <p className="text-slate-500 text-xs mt-1">설계사·GA에게 노출되는 공지사항과 배너를 관리하세요.</p>
            </div>

            <form
              onSubmit={handleAddAnnouncement}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3"
            >
              <h3 className="font-black text-sm text-slate-900">새 공지 등록</h3>
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_140px] gap-3">
                <input
                  type="text"
                  placeholder="공지 제목을 입력하세요"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={newAnnouncement.target}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, target: e.target.value })}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-700 outline-none"
                >
                  <option value="전체">전체</option>
                  <option value="FC">FC</option>
                  <option value="GA">GA</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs transition shadow-sm"
              >
                공지 등록
              </button>
            </form>

            <div className="space-y-3">
              {announcements.map((a) => (
                <div
                  key={a.id}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-slate-800 text-xs">{a.title}</p>
                      <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {a.target}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          a.active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {a.active ? "노출중" : "비노출"}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px] mt-0.5">등록일 {a.date}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleToggleAnnouncement(a.id)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-[11px] px-3 py-2 rounded-lg transition"
                    >
                      {a.active ? "비노출로 전환" : "노출로 전환"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteAnnouncement(a.id)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 font-bold text-[11px] px-3 py-2 rounded-lg transition"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 탭 관리자-5: 관리자 계정 관리 */}
        {mainTab === "ADMIN_ACCOUNTS" && (
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-black text-slate-900">관리자 계정 관리</h2>
              <p className="text-slate-500 text-xs mt-1">운영진 계정과 권한을 관리하세요.</p>
            </div>

            <form
              onSubmit={handleInviteAdmin}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3"
            >
              <h3 className="font-black text-sm text-slate-900">관리자 초대</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="이름"
                  value={newAdminAccount.name}
                  onChange={(e) => setNewAdminAccount({ ...newAdminAccount, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="이메일"
                  value={newAdminAccount.email}
                  onChange={(e) => setNewAdminAccount({ ...newAdminAccount, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={newAdminAccount.role}
                  onChange={(e) => setNewAdminAccount({ ...newAdminAccount, role: e.target.value })}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-700 outline-none"
                >
                  <option value="운영진">운영진</option>
                  <option value="모더레이터">모더레이터</option>
                  <option value="최고관리자">최고관리자</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs transition shadow-sm"
              >
                초대하기
              </button>
            </form>

            <div className="space-y-3">
              {adminAccounts.map((a) => (
                <div
                  key={a.id}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-slate-800 text-xs">{a.name}</p>
                      <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {a.role}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          a.status === "활성" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {a.status}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px] mt-0.5">{a.email}</p>
                  </div>
                  {a.role !== "최고관리자" && (
                    <button
                      type="button"
                      onClick={() => handleToggleAdminStatus(a.id)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-[11px] px-3 py-2 rounded-lg transition shrink-0"
                    >
                      {a.status === "활성" ? "비활성화" : "활성화"}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 탭 관리자-6: 활동 로그 */}
        {mainTab === "ADMIN_LOG" && (
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-black text-slate-900">활동 로그</h2>
              <p className="text-slate-500 text-xs mt-1">관리자 조치 이력을 시간순으로 확인할 수 있습니다.</p>
            </div>

            <div className="space-y-2">
              {activityLog.map((log) => (
                <div
                  key={log.id}
                  className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 font-bold text-slate-500 text-[10px]">
                      {log.actor.slice(0, 1)}
                    </div>
                    <div>
                      <p className="text-slate-800 text-xs">
                        <span className="font-bold">{log.actor}</span>님이 {log.action}
                      </p>
                    </div>
                  </div>
                  <span className="text-slate-400 text-[10px] shrink-0">{log.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      </div>

      {offerTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
            <div className="p-6 space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900">제안 보내기</h3>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    {offerTarget.nickname}님에게 보낼 스카우트 조건을 입력하세요.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOfferTarget(null)}
                  className="text-slate-400 hover:text-slate-600 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-[11px] text-slate-600 space-y-1">
                <p>
                  <span className="font-bold text-slate-800">희망 조건:</span> 수수료 {offerTarget.minCommission} · 정착지원금{" "}
                  {offerTarget.minSettlement}
                </p>
                <p>
                  <span className="font-bold text-slate-800">희망 지역:</span> {offerTarget.preferredRegion}
                </p>
              </div>

              <form onSubmit={handleSendOffer} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-extrabold text-slate-700 text-xs">제안 수수료 조건</label>
                    <input
                      type="text"
                      value={offerForm.commission}
                      onChange={(e) => setOfferForm({ ...offerForm, commission: e.target.value })}
                      placeholder="예: 총 93.5% (손보 95% / 생보 92%)"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-extrabold text-slate-700 text-xs">제안 정착지원금</label>
                    <input
                      type="text"
                      value={offerForm.settlement}
                      onChange={(e) => setOfferForm({ ...offerForm, settlement: e.target.value })}
                      placeholder="예: 1,500만원 (첫 달 500만 지급)"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-extrabold text-slate-700 text-xs">DB 지원 조건</label>
                  <input
                    type="text"
                    value={offerForm.db}
                    onChange={(e) => setOfferForm({ ...offerForm, db: e.target.value })}
                    placeholder="예: 월 35개 고품질 DB 무료 분배"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-extrabold text-slate-700 text-xs">전달 메시지</label>
                  <textarea
                    rows={3}
                    value={offerForm.message}
                    onChange={(e) => setOfferForm({ ...offerForm, message: e.target.value })}
                    placeholder="선생님의 경력과 실적을 보고 연락드립니다..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setOfferTarget(null)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-3 rounded-xl text-xs transition"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3 rounded-xl text-xs transition shadow-lg"
                  >
                    제안 보내기
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
            <div className="p-6 space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900">GA 매니저에게 이렇게 보여집니다</h3>
                  <p className="text-slate-500 text-[11px] mt-0.5">아래 내용으로 익명 프로필을 등록할까요?</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPreviewModal(false)}
                  className="text-slate-400 hover:text-slate-600 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <UserCheck className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-black text-sm text-slate-900">{profile.nickname}</p>
                      <p className="text-[11px] text-slate-500">
                        {profile.exp} · {profile.mainField}
                      </p>
                    </div>
                  </div>
                  {profile.isVerified && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full shrink-0">
                      <Check className="w-3 h-3" />
                      실적 인증됨
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div>
                    <span className="text-slate-400 font-semibold block">월 평균 매출</span>
                    <span className="font-bold text-slate-800">{profile.salesRange}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block">유지율</span>
                    <span className="font-bold text-slate-800">{profile.retentionRate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block">희망 최소 수수료율</span>
                    <span className="font-bold text-blue-600">{profile.minCommission}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block">희망 최소 정착지원금</span>
                    <span className="font-bold text-blue-600">{profile.minSettlement}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 font-semibold block">희망 근무 지역</span>
                    <span className="font-bold text-slate-800">{profile.preferredRegion}</span>
                  </div>
                </div>

                {profile.memo && (
                  <div className="bg-white border border-slate-200 rounded-xl p-3">
                    <span className="text-slate-400 font-semibold text-[10px] block mb-1">기타 요청사항</span>
                    <p className="text-slate-700 text-[11px] leading-relaxed">{profile.memo}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowPreviewModal(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-3 rounded-xl text-xs transition"
                >
                  다시 수정하기
                </button>
                <button
                  type="button"
                  onClick={handleConfirmSubmit}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3 rounded-xl text-xs transition shadow-lg"
                >
                  이 내용으로 등록하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {adminDetailTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
            <div className="p-6 space-y-5">
              <div className="flex items-start justify-between">
                <h3 className="text-base font-black text-slate-900">계정 상세 정보</h3>
                <button
                  type="button"
                  onClick={() => setAdminDetailTarget(null)}
                  className="text-slate-400 hover:text-slate-600 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {adminDetailTarget.type === "FC" &&
                (() => {
                  const fc = adminFcUsers.find((u) => u.id === adminDetailTarget.id);
                  if (!fc) return <p className="text-slate-400 text-xs">계정을 찾을 수 없습니다.</p>;
                  return (
                    <div className="space-y-4">
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-black text-sm text-slate-900">{fc.nickname}</p>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              fc.status === "활성"
                                ? "bg-emerald-50 text-emerald-700"
                                : fc.status === "정지"
                                ? "bg-red-50 text-red-700"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {fc.status}
                          </span>
                        </div>
                        <p className="text-slate-500 text-[11px]">{fc.mainField} · {fc.exp} · 가입일 {fc.joinedDate}</p>
                        <div className="grid grid-cols-2 gap-2 pt-2 text-[11px]">
                          <div className="bg-white border border-slate-200 rounded-xl p-2.5">
                            <span className="text-slate-400 font-semibold block">매출 실적</span>
                            <span className="font-bold text-slate-800">{fc.salesRange}</span>
                          </div>
                          <div className="bg-white border border-slate-200 rounded-xl p-2.5">
                            <span className="text-slate-400 font-semibold block">유지율</span>
                            <span className="font-bold text-slate-800">{fc.retentionRate}</span>
                          </div>
                          <div className="bg-white border border-slate-200 rounded-xl p-2.5 col-span-2">
                            <span className="text-slate-400 font-semibold block">인증 심사 상태</span>
                            <span className="font-bold text-slate-800">{fc.verificationStatus}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-black text-xs text-slate-700">활동 이력</h4>
                        <div className="space-y-1.5 text-[11px] text-slate-500">
                          <p>· {fc.joinedDate} 익명 프로필 등록 및 카카오 간편인증 완료</p>
                          <p>· GA 역경매 제안 수신 대기 중</p>
                          <p>· 최근 로그인: {fc.joinedDate} 이후 활동 기록 없음 (목업 데이터)</p>
                        </div>
                      </div>
                    </div>
                  );
                })()}

              {adminDetailTarget.type === "GA" &&
                (() => {
                  const ga = adminGaUsers.find((u) => u.id === adminDetailTarget.id);
                  if (!ga) return <p className="text-slate-400 text-xs">계정을 찾을 수 없습니다.</p>;
                  const planName = EXPOSURE_PLANS.find((p) => p.id === ga.exposurePlan)?.name ?? ga.exposurePlan;
                  const relatedInvoices = adminInvoices.filter((inv) => inv.gaName === ga.gaName);
                  return (
                    <div className="space-y-4">
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-black text-sm text-slate-900">{ga.gaName}</p>
                          <span className="text-slate-400 text-[11px] font-bold">({ga.branch})</span>
                        </div>
                        <p className="text-slate-500 text-[11px]">
                          담당자 {ga.contactName} · {ga.contactPhone} · 가입일 {ga.joinedDate}
                        </p>
                        <div className="grid grid-cols-2 gap-2 pt-2 text-[11px]">
                          <div className="bg-white border border-slate-200 rounded-xl p-2.5">
                            <span className="text-slate-400 font-semibold block">수수료 범위</span>
                            <span className="font-bold text-slate-800">
                              {ga.commissionMin}~{ga.commissionMax}%
                            </span>
                          </div>
                          <div className="bg-white border border-slate-200 rounded-xl p-2.5">
                            <span className="text-slate-400 font-semibold block">노출 상태</span>
                            <span className="font-bold text-slate-800">{ga.exposureStatus}</span>
                          </div>
                          <div className="bg-white border border-slate-200 rounded-xl p-2.5 col-span-2">
                            <span className="text-slate-400 font-semibold block">노출 상품</span>
                            <span className="font-bold text-slate-800">{planName}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-black text-xs text-slate-700">정산 내역</h4>
                        {relatedInvoices.length === 0 ? (
                          <p className="text-slate-400 text-[11px]">정산 내역이 없습니다.</p>
                        ) : (
                          <div className="space-y-1.5">
                            {relatedInvoices.map((inv) => (
                              <div
                                key={inv.id}
                                className="flex items-center justify-between bg-slate-50 rounded-xl p-2.5 text-[11px]"
                              >
                                <span className="text-slate-600">
                                  {inv.plan} · {inv.billingDate}
                                </span>
                                <span
                                  className={`font-bold ${
                                    inv.status === "결제완료"
                                      ? "text-emerald-600"
                                      : inv.status === "미납"
                                      ? "text-red-600"
                                      : "text-slate-400"
                                  }`}
                                >
                                  {inv.amount.toLocaleString()}원 ({inv.status})
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
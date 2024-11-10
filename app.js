require('dotenv').config();  // 환경 변수 로드
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: 'https://hyperkittys.shop',  // 허용할 도메인
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // 허용할 HTTP 메서드
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Supabase 클라이언트 설정
const supabaseUrl = 'https://quxyypgxxdpbwmadmhlh.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// 회원가입
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    res.status(201).json({ message: '사용자 등록 성공', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류', error: err.message });
  }
});

// 로그인
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    res.json({ user: data.user, session: data.session });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류', error: err.message });
  }
});

// 인증 미들웨어
async function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  try {
    const { data, error } = await supabase.auth.getUser(token);
    if (error) throw error;
    req.user = data.user;
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(403);
  }
}

// 보호된 라우트
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: '보호된 데이터에 접근했습니다', user: req.user });
});

// 루트 경로 처리
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// auth.html 라우트 추가
app.get('/auth.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'auth.html'));
});

// 로그아웃 엔드포인트 추가
app.post('/logout', (req, res) => {
  res.json({ message: '로그아웃 성공' });
});

// 대시보드 라우트 추가
app.get('/dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// 아이템 목록 조회 엔드포인트 수정
app.get('/items', authenticateToken, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('items')
      .select('*');
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류', error: err.message });
  }
});

// Health check 엔드포인트 추가
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// 서버 시작
const PORT = process.env.PORT || 3000;  // 환경 변수에서 포트를 가져오고, 없으면 3000 사용
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});

const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Supabase 클라이언트 설정
const supabaseUrl = 'https://quxyypgxxdpbwmadmhlh.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
// console.log('SUPABASE_KEY:', supabaseKey); // 이 라인 제거 (보안상 위험)

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

// 루트 경로 처리 (새로 추가)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// auth.html 라우트 추가
app.get('/auth.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'auth.html'));
});

// 로그아웃 엔드포인트 추가
app.post('/logout', (req, res) => {
    // 서버 측에서 할 일이 없으므로 간단히 성공 응답만 보냅니다.
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

app.listen(3000, () => {
  console.log('서버가 포트 3000에서 실행 중입니다.');
});

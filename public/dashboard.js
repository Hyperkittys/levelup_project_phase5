window.addEventListener('load', loadDashboard);

function loadDashboard() {
    const username = localStorage.getItem('username');
    if (!username) {
        window.location.href = '/';  // 로그인되지 않은 경우 메인 페이지로 리다이렉트
        return;
    }

    document.getElementById('content').innerHTML = `
        <h1>환영합니다, ${username}님!</h1>
        <img src="/images/cat2.jpg" alt="고양이 이미지" style="max-width: 400px; height: auto;">
        <p>로그인에 성공하셨습니다.</p>
        <button onclick="logout()">로그아웃</button>
    `;
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/';  // 로그아웃 후 메인 페이지로 리다이렉트
}

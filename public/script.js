document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
            document.getElementById('loginMessage').textContent = '로그인 성공!';
            localStorage.setItem('token', data.token);
        } else {
            document.getElementById('loginMessage').textContent = '로그인 실패: ' + data.message;
        }
    } catch (error) {
        document.getElementById('loginMessage').textContent = '오류 발생: ' + error.message;
    }
});

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
            document.getElementById('registerMessage').textContent = '회원가입 성공!';
        } else {
            document.getElementById('registerMessage').textContent = '회원가입 실패: ' + data.message;
        }
    } catch (error) {
        document.getElementById('registerMessage').textContent = '오류 발생: ' + error.message;
    }
});

// 토큰이 있으면 보호된 컨텐츠를 보여줍니다.
window.addEventListener('load', () => {
    const token = localStorage.getItem('token');
    if (token) {
        showProtectedContent();
    }
});

async function showProtectedContent() {
    try {
        const response = await fetch('/protected', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        if (response.ok) {
            const data = await response.json();
            document.body.innerHTML = `
                <h1>보호된 컨텐츠</h1>
                <p>${data.message}</p>
                <p>사용자: ${data.user.username}</p>
                <button onclick="logout()">로그아웃</button>
            `;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function logout() {
    localStorage.removeItem('token');
    window.location.reload();
}

window.addEventListener('load', checkAuthStatus);

async function checkAuthStatus() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
        showLoggedInContent(username);
    } else {
        showLoggedOutContent();
    }
}

function showLoggedInContent(username) {
    document.getElementById('content').innerHTML = `
        <h1>환영합니다, ${username}님!</h1>
        <img src="/images/cat2.jpg" alt="고양이 이미지" style="max-width: 400px; height: auto;">
        <p>로그인에 성공하셨습니다.</p>
        <button onclick="logout()">로그아웃</button>
    `;
}

function showLoggedOutContent() {
    document.getElementById('content').innerHTML = `
        <h1>환영합니다!</h1>
        <p>이 웹사이트를 이용하려면 로그인이 필요합니다.</p>
        <a href="/auth.html">로그인/회원가입</a>
    `;
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    showLoggedOutContent();
}

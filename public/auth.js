document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('loginMessage').textContent = '로그인 성공!';
            // 로그인 성공 시 대시보드로 리다이렉트
            window.location.href = '/dashboard.html';
        } else {
            document.getElementById('loginMessage').textContent = `로그인 실패: ${data.error}`;
        }
    } catch (error) {
        console.error('로그인 중 오류 발생:', error);
        document.getElementById('loginMessage').textContent = '로그인 중 오류가 발생했습니다.';
    }
});

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('registerMessage').textContent = '회원가입 성공!';
            // 여기에 회원가입 성공 후 처리 로직을 추가하세요 (예: 로그인 폼으로 포커스 이동)
        } else {
            document.getElementById('registerMessage').textContent = `회원가입 실패: ${data.error}`;
        }
    } catch (error) {
        console.error('회원가입 중 오류 발생:', error);
        document.getElementById('registerMessage').textContent = '회원가입 중 오류가 발생했습니다.';
    }
});

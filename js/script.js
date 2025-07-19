document.addEventListener('DOMContentLoaded', function() {
    // --- 1. ハンバーガーメニューの開閉機能 ---
    const toggleButton = document.querySelector('.toggle-menu-button');
    const headerSiteMenu = document.querySelector('.header-site-menu');

    if (toggleButton && headerSiteMenu) {
        toggleButton.addEventListener('click', () => {
            headerSiteMenu.classList.toggle('is-show');
        });
    }

    // --- 2. Swiperスライドショーの初期化 ---
    // Swiperを有効にするためには、SwiperライブラリがHTMLにロードされている必要があります。
    const swiperElement = document.querySelector('.swiper');
    if (swiperElement) {
        // Swiperライブラリがグローバルスコープで利用可能であることを前提としています
        const swiper = new Swiper('.swiper', {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    } else {
        console.warn('Swiper要素が見つかりませんでした。クラス名が正しいか確認してください (.swiper)。');
    }

    // --- 3. 動画のシーケンシャル再生 ---
    const video1 = document.getElementById('video1');
    const video2 = document.getElementById('video2');

    if (video1 && video2) {
        video1.addEventListener('ended', function() {
            video1.style.display = 'none';
            video2.style.display = 'block';
            video2.play();
        });

        video2.addEventListener('ended', function() {
            video2.style.display = 'none';
            video1.style.display = 'block';
            video1.play();
        });

        // ページロード時に最初の動画を再生開始
        // Promiseを返すplay()の成功/失敗を処理
        video1.play().catch(error => {
            console.log('video1の自動再生がブロックされました:', error);
            // 自動再生がブロックされた場合の代替策（例: ユーザーに再生を促すボタンを表示）
        });
    } else {
        console.warn('動画要素（video1またはvideo2）が見つかりませんでした。IDが正しいか確認してください。');
    }

    // --- 4. スクロールアニメーション（テキストとセクションの出現） ---
    // Intersection Observerを使用してアニメーションを管理します。

    const observerOptions = {
        root: null, // ビューポートを監視対象のルートとする
        rootMargin: '0px',
        threshold: 0.5 //
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // '.animated-text' クラスを持つ要素に 'is-active' を追加
                if (entry.target.classList.contains('animated-text')) {
                    entry.target.classList.add('is-active');
                }
                // '.scroll-reveal-section' クラスを持つ要素に 'is-visible' を追加
                else if (entry.target.classList.contains('scroll-reveal-section')) {
                    entry.target.classList.add('is-visible');
                }
                // 一度アニメーションしたら監視を停止
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // .animated-text 要素の監視
    const animatedTextElements = document.querySelectorAll('.animated-text');
    if (animatedTextElements.length > 0) {
        animatedTextElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        console.warn('アニメーション対象の要素 (.animated-text) がHTMLに見つかりませんでした。クラス名が正しいか確認してください。');
    }

    // .scroll-reveal-section 要素の監視
    const scrollRevealSections = document.querySelectorAll('.scroll-reveal-section');
    if (scrollRevealSections.length > 0) {
        scrollRevealSections.forEach(section => {
            observer.observe(section);
        });
    } else {
        console.warn('スクロールアニメーション対象の要素 (.scroll-reveal-section) がHTMLに見つかりませんでした。クラス名が正しいか確認してください。');
    }
});
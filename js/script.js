(function($) {


	/*-------------------------------
		iPhone/iPad class
	-------------------------------*/
	var ua = navigator.userAgent.toLowerCase();
	if ( ua.indexOf('iPhone') > 0 ) {
		$("body").addClass("iPhone");
	}else if ( ua.indexOf('ipad') > -1 || ua.indexOf('macintosh') > -1 && 'ontouchend' in document ) {
		$("body").addClass("iPad");
	}


	/*-------------------------------
		ロード判定
	-------------------------------*/
	setTimeout(function() {
		$('body').addClass('js-ready');
	}, 300);
	$(window).on('load',function(){
		$('body').addClass('js-loaded');
	});

	//loading
	var webStorage = function(){
		if(sessionStorage.getItem('access')){
		} else {
			sessionStorage.setItem('access', 0);
			let body = document.body;
			body.classList.add('once');
		}
	}
	webStorage();


	/*-------------------------------
		スクロール判定
	-------------------------------*/
	$(window).on('load scroll',function(){
		var s_top = $(window).scrollTop();
		if(s_top > 0){
			$('body').addClass('js-scroll');
		}else{
			$('body').removeClass('js-scroll');
		}
	});


	/*-------------------------------
		aのクリックイベント
	-------------------------------*/
	$('body').on('click', 'a', function (e) {

		var str = this.getAttribute('href').substring(0, 1),
		$linktype = $(this).attr('target'),
			$call = this.getAttribute('href').substring(0, 3);
		$headerHeight = $('header').innerHeight();

		if (str === "#") {
			//スムーズスクロールをさせる
			if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $("[name=' + this.hash.slice(1) + ']");

				if (target.length) {
					$('html,body').animate({
						scrollTop: target.offset().top - $headerHeight - 20
					}, 700);
					return false;
				}
			}
		} else if ($linktype == "_blank" || $call == "tel") {
			//何もしない
		}

	});


	/*-------------------------------
		ハンバーガーメニュー
	-------------------------------*/
	const hamburger_btn = document.querySelectorAll('.-hamburger');
	const hamburger_menu = document.querySelector('.hamburger');
	const hamburger_close = document.querySelector('.hamburger__menu__close');
	const hamburger_menuItem = document.querySelectorAll('.hamburger__menu__nav__list__item > *:not(.pulldownMenu)');
	for (let i = 0; i < hamburger_btn.length; i++) {
		hamburger_btn[i].addEventListener('click',function(){
			if(hamburger_menu.classList.contains('js-open')){
				hamburger_menu.classList.remove('js-open');
			}else{
				hamburger_menu.classList.add('js-open');
			}
		});
	}
	hamburger_close.addEventListener('click',function(){
		if(hamburger_menu.classList.contains('js-open')){
			hamburger_menu.classList.remove('js-open');
		}else{
			hamburger_menu.classList.add('js-open');
		}
	});
	for(let i = 0; i < hamburger_menuItem.length; i++){
		hamburger_menuItem[i].addEventListener('mouseenter',function(){
			for(let i = 0; i < hamburger_menuItem.length; i++){
				hamburger_menuItem[i].classList.add('js-hover');
			}
		});
		hamburger_menuItem[i].addEventListener('mouseleave',function(){
			for(let i = 0; i < hamburger_menuItem.length; i++){
				hamburger_menuItem[i].classList.remove('js-hover');
			}
		});
	}


	/*-------------------------------
		スクロールアクション
	-------------------------------*/
	function scrollAnime() {
		const animation = document.querySelectorAll(".anime");
		const animationArray = Array.prototype.slice.call(animation, 0);

		const options = {
			root: null,
			rootMargin: "-200px 0px -200px",
			threshold: 0
		};
		const observer = new IntersectionObserver(doWhenIntersect, options);
		animationArray.forEach(function(animation) {
			observer.observe(animation);
		});

		function doWhenIntersect(entries) {
			const entriesArray = Array.prototype.slice.call(entries, 0);

			entriesArray.forEach(function(entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add("js-active");
				}
			});
		}
	}
	scrollAnime();
	//ロード時、ウィンドウ内に入っている要素は強制的に表示
	function loadActive() {
		$(".anime").each(function(){
			var targetAnime = $(this).offset().top;
			var windowHeight = $(window).height();
			if (targetAnime < windowHeight){
				$(this).addClass("js-active");
			}
		});
	}
	loadActive();


	/*-------------------------------
		文字列を分割
	-------------------------------*/
	function spanWrap(targetElm) {
		const targets = [].slice.call(document.querySelectorAll(targetElm));
		targets.forEach(function (target) {
			const nodes = [].slice.call(target.childNodes);
			let spanWrapText = '';

			nodes.forEach(function (node) {
				if (node.nodeType == 3) {
					//テキストの場合
					const text = node.textContent.replace(/\r?\n/g, ''); //テキストから改行コード削除
					//spanで囲んで連結
					spanWrapText =
						spanWrapText +
						text.split('').reduce(function (acc, v) {
							return acc + '<span>' + v + '</span>';
						}, '');
				} else {
					//テキスト以外
					//<br>などテキスト以外の要素をそのまま連結
					spanWrapText = spanWrapText + node.outerHTML;
				}
			});

			target.innerHTML = spanWrapText;
		});
	}
	spanWrap('.split');
	$('.split span').each(function () {
		var txt = $(this).html();
		$(this).html(
			txt.replace(' ', '&nbsp;')
		);
	});


	/*-------------------------------
		よくある質問 アコーディオン
	-------------------------------*/
	$('.faqAccordion .faqAccordion__head').click(function () {
		$(this).next('.faqAccordion__body').slideToggle();
		$(this).next('.faqAccordion__body').toggleClass("open")
		$(this).toggleClass("open");
	});


	/*----------------------------------------------------
		ページトップ フッター上で止める
	-----------------------------------------------------*/
	function pagetopStop() {
		var documentHeight = $(document).height();
		var scrollPosition = $(this).height() + $(this).scrollTop();
		var footerGaHeight = $(".footer__ga").innerHeight();

		// 通常ページ
		if (window.matchMedia('(min-width: 768px)').matches) {
			// PC表示の時の処理
			if (documentHeight - scrollPosition <= footerGaHeight) {
				$(".pagetop").css({
					position: "absolute",
					bottom: footerGaHeight + 16
				});
			} else {
				$(".pagetop").css({
					position: "fixed",
					bottom: 16
				})
			}
		} else {
			// スマホ表示の時の処理
			if (documentHeight - scrollPosition <= footerGaHeight) {
				$(".pagetop").css({
					position: "absolute",
					bottom: footerGaHeight + 4
				});
			} else {
				$(".pagetop").css({
					position: "fixed",
					bottom: 4
				})
			}
		}
	}
	$(window).scroll(function () {
		pagetopStop();
	})


})(jQuery);

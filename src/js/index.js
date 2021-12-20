// 스크롤 이벤트
const headerSection = document.querySelector(".header-cont");
const bannerSection = document.querySelector(".banner");
const scrollTopBtn = document.querySelector(".scroll-top");
const footerSection = document.querySelector(".main-footer");

// 1. 스크롤 아래로 내릴 때 header 고정시키기
function fixedHeader(htmlScrollTop) {
    let headerHeight = headerSection.offsetHeight;
    if(htmlScrollTop > 0) {
        if(htmlScrollTop >= headerHeight) {
            headerSection.classList.add("fixed");
            bannerSection.style.marginTop = `${headerHeight}px`;
        }
    } else {
        headerSection.classList.remove("fixed");
        bannerSection.style.marginTop = "0px";
    }
}

// 2. 스크롤 아래로 내릴 때 scrollTop 버튼 나타내기
function activeScrollTopBtn(htmlScrollTop) {
    if(htmlScrollTop > 100) {
        scrollTopBtn.classList.add("btn-active");
    } else {
        scrollTopBtn.classList.remove("btn-active"); 
    }
}

// 3. 스크롤이 footer를 만난 경우에는 footer 위로 이동
function moveScrollTopBtn(htmlScrollTop){
    let htmlScrollHeight = document.querySelector("html").scrollHeight;
    let footerHeight = footerSection.offsetHeight;

    if(htmlScrollHeight - (htmlScrollTop + window.innerHeight) <= footerHeight){
        scrollTopBtn.style.bottom = `${footerHeight+24}px`;
    } else {
        scrollTopBtn.style.bottom = `24px`;
    }
}

window.addEventListener("scroll", function() {
    let htmlScrollTop = document.querySelector("html").scrollTop;

    fixedHeader(htmlScrollTop);
    activeScrollTopBtn(htmlScrollTop);
    moveScrollTopBtn(htmlScrollTop);
});

window.addEventListener("resize", function() {
    let htmlScrollTop = document.querySelector("html").scrollTop;

    moveScrollTopBtn(htmlScrollTop);
});

window.addEventListener("load", function() {
    let htmlScrollTop = document.querySelector("html").scrollTop;

    moveScrollTopBtn(htmlScrollTop);
});

// scrollTop 버튼 이벤트
// scrollTop 버튼을 클릭하면 스크롤이 천천히(smooth) 최상단으로 이동합니다.
scrollTopBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
});

// 모바일 메뉴 활성화, 비활성화하기
const body = document.querySelector("body");
const menuOpenBtn = document.querySelector(".menu-open-btn");
const mainNav = document.querySelector('.main-nav')
const menuCloseBtn = document.querySelector(".menu-close-btn");

menuOpenBtn.addEventListener("click", function(){
    mainNav.classList.add("active");
    body.classList.add("overflow");
});

menuCloseBtn.addEventListener("click", function(){
    mainNav.classList.remove("active");
    body.classList.remove("overflow");
});

// subscribe(구독) 감사 모달창
const emailForm = document.querySelector(".email-form");
const emailInput = document.querySelector(".email-input");
const subscribeBtn = document.querySelector(".subscribe-btn");
const subscribeModal = document.querySelector(".subscribe-modal");
const subscribeModalCloseBtn = document.querySelector(".subscribe-modal-close");

// 이메일 주소 유효성 검사
function emailValidate(email) {
    let emailAddr = email.value;
    let reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

    if(emailAddr.length < 1){
        alert("이메일 주소를 입력해 주세요.");
    } else if (!reg.test(emailAddr)){
        alert("유효하지 않은 이메일 주소입니다.");
    } else {
        subscribeModal.classList.add("is-active");
    }
}

subscribeBtn.addEventListener("click", function() {
    emailValidate(emailInput);
});

subscribeModalCloseBtn.addEventListener("click", function() {
    emailForm.submit();
});

window.addEventListener("click", function(e){
    if(e.target == subscribeModal) {
        if(subscribeModal.classList.contains("is-active")){
            subscribeModal.classList.remove("is-active");
        }
    }
});
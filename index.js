const scrollBtn = document.querySelector(".btn--scroll-to")
const showModal = document.querySelectorAll(".btn--show-modal")

const closeModal = document.querySelector(".btn--close-modal")

const modal = document.querySelector(".modal")
const overlay = document.querySelector(".overlay")
// tab buttons
const tabContainer = document.querySelector(".operations__tab-container")
const operationsTab = document.querySelectorAll(".operations__tab")
const operationsContents = document.querySelectorAll(".operations__content")

// nav items
const nav = document.querySelector(".nav")
const navItem = document.querySelectorAll(".nav__item")
const navLinks = document.querySelector(".nav__links")
// SECTIONS
const section1 = document.querySelector("#section--1")
const section2 = document.querySelector("#section--2")
const section3 = document.querySelector("#section--3")
const section = document.querySelectorAll(".section")
//feature image
const featureImg = document.querySelectorAll("img[data-src]")
console.log(featureImg)
// slider
const slideBtn = document.querySelectorAll(".slider__btn")
//header
const header = document.querySelector(".header")

const sections = [section1, section2, section3]
// const sections=document.querySelectorAll('.section')
scrollBtn.addEventListener("click", function (e) {
	e.preventDefault()
	const s1Coords = section1.getBoundingClientRect()

	// window.scrollTo({
	//     left:s1Coords.left+ window.pageXOffset,top:s1Coords.top +window.pageYOffset,
	//     behavior:'smooth'
	// })

	section1.scrollIntoView({ behavior: "smooth" })
})
showModal.forEach(function (show) {
	show.addEventListener("click", function (e) {
		e.preventDefault()

		modal.classList.remove("hidden")
		overlay.classList.remove("hidden")
	})
})
const close = function (e) {
	e.preventDefault()
	overlay.classList.add("hidden")
	modal.classList.add("hidden")
}

// close modal
closeModal.addEventListener("click", close)
overlay.addEventListener("click", close)

navLinks.addEventListener("click", function (e) {
	e.preventDefault()
	if (e.target.classList.contains("nav__link")) {
		const id = e.target.getAttribute("href")
		document.querySelector(id).scrollIntoView({ behavior: "smooth" })
	}
})

tabContainer.addEventListener("click", function (e) {
	// parent element
	const clicked = e.target.closest(".operations__tab")
	// remove classlist
	operationsTab.forEach((tab) =>
		tab.classList.remove("operations__tab--active"),
	)

	operationsContents.forEach((contents) =>
		contents.classList.remove("operations__content--active"),
	)
	if (!clicked) return

	document
		.querySelector(`.operations__content--${clicked.dataset.tab}`)
		.classList.add("operations__content--active")
	clicked.classList.add("operations__tab--active")
})
// operationsTab.forEach(function (tab) {
// 	tab.addEventListener("click", function (e) {
// 		e.preventDefault()
// 		// e.target.classList.add('operations__tab--active')
// 		console.log(e.target.dataset.tab)

// 		if (e.target.dataset.tab) {
// 			tab.classList.add("operations__tab-active")
// 		} else {
// 			tab.classList.remove("operations__tab-active")
// 		}
// 	})
// })

function handleNavLinkOpacity(e) {
	if (e.target.classList.contains("nav__link")) {
		const link = e.target
		// console.log(link)
		const siblings = link.closest(".nav").querySelectorAll(".nav__link")
		siblings.forEach((el) => {
			if (el !== link) {
				el.style.opacity = this
			}
		})
		// console.log(siblings)
	}
}
//THE WAY OF PASS ARGUMENTS ON EVENT HANDLING
////////////////////////////////////////////
// nav.addEventListener('mouseover',function(e){
// 	handleNavOpacity(e,.2)
// })

// SECOND WAY PASS ARGUMENT BY EVENT HANDLING
nav.addEventListener("mouseover", handleNavLinkOpacity.bind(0.2))

nav.addEventListener("mouseout", handleNavLinkOpacity.bind(1))

///////////////////////////////////////////

// STICKY NAVBAR
/////////////////////////////
// const initialPosition=section1.getBoundingClientRect()

// document.addEventListener('scroll',function(){
// 	if(window.scrollY>initialPosition.top){
// 		nav.classList.add('sticky')
// 	}else{
// 		nav.classList.remove('sticky')
// 	}
// })

//ANOTHER WAY TO IMPLEMENT STICKY NAV
// ////////////////////////

const navHeight = nav.getBoundingClientRect().height
function stickyNav(entries, observer) {
	const [entry] = entries
	// console.log(entry)
	if (!entry.isIntersecting) {
		nav.classList.add("sticky")
	} else {
		nav.classList.remove("sticky")
	}
	// observer.unobserve(entry.target)
}
const headerObserver = new IntersectionObserver(stickyNav, {
	root: null,
	threshold: 0,
	rootMargin: `-${navHeight}px`,
})
////////////////////////////////
// SECTION REVEL OBSERVER

headerObserver.observe(header)
const sectionRevel = function (entries, observer) {
	const [entry] = entries
	// console.log(entry)
	if (!entry.isIntersecting) {
		return
	}
	entry.target.classList.remove("section--hidden")

	observer.unobserve(entry.target)
}
const sectionsObserver = new IntersectionObserver(sectionRevel, {
	root: null,
	threshold: 0.15,
})

section.forEach((section) => {
	sectionsObserver.observe(section)
	// section.classList.add("section--hidden")
})

/////////////////////
// LAZY FEATURE IMAGE OBSERVING
const lazyImg = function (entries, observer) {
	const [entry] = entries

	if (!entry.isIntersecting) return
	entry.target.src = entry.target.dataset.src

	entry.target.addEventListener("load", function () {
		entry.target.classList.remove("lazy-img")
	})

	observer.unobserve(entry.target)
}

const lazyImageObserver = new IntersectionObserver(lazyImg, {
	root: null,
	threshold: 0,
	rootMargin: "200px",
})

featureImg.forEach((img) => {
	lazyImageObserver.observe(img)
})

// /////////////// slider//////////////
function slider() {
	const sliderBtnRight = document.querySelector(".slider__btn--right")
	const sliderBtnLeft = document.querySelector(".slider__btn--left")
	const slides = document.querySelectorAll(".slide")

	const slider = document.querySelector(".slider")

	//sliders dot
	const dotContainer = document.querySelector(".dots")
	console.log(dotContainer)

	let currSlide = 0
	let slideLength = slides.length

	function goToSlide(slide) {
		slides.forEach((s, i) => {
			s.style.transform = `translateX(${100 * (i - slide)}%)`
		})
	}

	function nextSlide() {
		if (currSlide === slideLength - 1) {
			currSlide = 0
		} else {
			currSlide++
		}

		goToSlide(currSlide)
		activeDot(currSlide)
	}

	function prevSlide() {
		if (currSlide === 0) {
			currSlide = slideLength - 1
		} else {
			currSlide--
		}
		goToSlide(currSlide)
		activeDot(currSlide)
	}
	sliderBtnRight.addEventListener("click", nextSlide)
	sliderBtnLeft.addEventListener("click", prevSlide)

	//left arrow key implementation
	document.addEventListener("keydown", function (e) {
		if (e.key === "ArrowLeft") prevSlide()
	})
	//right arrow key implementation
	document.addEventListener("keydown", function (e) {
		if (e.key === "ArrowRight") nextSlide()
	})

	//////////////DOT/////////////

	function createDot() {
		slides.forEach(function (_, i) {
			dotContainer.insertAdjacentHTML(
				"beforeend",
				`<button class='dots__dot' data-dot='${i}'></button>`,
			)
		})
	}

	function initialPositionOFSlider() {
		goToSlide(0)

		createDot()

		activeDot(0)
	}
	initialPositionOFSlider()
	function activeDot(slide) {
		//remove active dot first
		document
			.querySelectorAll(".dots__dot")
			.forEach((dot) => dot.classList.remove("dots__dot--active"))

		//add dot
		document
			.querySelector(`.dots__dot[data-dot='${slide}']`)
			.classList.add("dots__dot--active")
	}

	dotContainer.addEventListener("click", function (e) {
		if (e.target.classList.contains("dots__dot")) {
			const slide = e.target.dataset.dot
			goToSlide(slide)
			activeDot(slide)
		}
	})
}

slider()

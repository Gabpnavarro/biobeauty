const carouselImgContainer = document.querySelector(
	".carousel__image-container"
)
const arrowButtons = document.querySelectorAll(".carousel__button")

let isDragStart = false
let isDragging = false
let startDragX
let startDragScrollLeft
let pageXDiff
const firstImage = document.querySelector(".carousel__image-container img")

function showArrowButtons(scrollTo) {
	arrowButtons[0].style.display = scrollTo <= 0 ? "none" : "block"
	arrowButtons[1].style.display =
		scrollTo >=
		carouselImgContainer.scrollWidth - carouselImgContainer.clientWidth
			? "none"
			: "block"
}

arrowButtons.forEach((button, index) => {
	button.addEventListener("click", () => {
		const firstImageWidth = firstImage.clientWidth

		const scrollTo =
			carouselImgContainer.scrollLeft +
			(index === 0 ? -firstImageWidth : firstImageWidth)

		showArrowButtons(scrollTo)

		carouselImgContainer.scrollLeft = scrollTo
	})
})

function autoSlide() {
	if (
		carouselImgContainer.scrollLeft >=
		carouselImgContainer.scrollWidth - carouselImgContainer.clientWidth
	)
		return

	pageXDiff = Math.abs(pageXDiff)
	const firstImageWidth = firstImage.clientWidth
	const difference = firstImageWidth - pageXDiff

	let scrollTo = pageXDiff > firstImageWidth / 3 ? difference : -pageXDiff

	if (carouselImgContainer.scrollLeft > startDragScrollLeft) {
		carouselImgContainer.scrollLeft += scrollTo
	} else {
		carouselImgContainer.scrollLeft -= scrollTo
	}

	showArrowButtons(scrollTo)
}

function dragging(e) {
	if (!isDragStart) return

	e.preventDefault()
	isDragging = true
	carouselImgContainer.classList.add("dragging")
	pageXDiff = (e.pageX || e.touches[0].pageX) - startDragX
	carouselImgContainer.scrollLeft = startDragScrollLeft - pageXDiff
	showArrowButtons(carouselImgContainer.scrollLeft)
}

function dragStart(e) {
	isDragStart = true
	startDragX = e.pageX || e.touches[0].pageX
	startDragScrollLeft = carouselImgContainer.scrollLeft
}

function dragStop(e) {
	isDragStart = false
	carouselImgContainer.classList.remove("dragging")

	if (!isDragging) return
	isDragging = false
	autoSlide()
}

carouselImgContainer.addEventListener("mousedown", dragStart)
carouselImgContainer.addEventListener("touchstart", dragStart)

carouselImgContainer.addEventListener("mousemove", dragging)
carouselImgContainer.addEventListener("touchmove", dragging)

carouselImgContainer.addEventListener("mouseup", dragStop)
carouselImgContainer.addEventListener("mouseleave", dragStop)
carouselImgContainer.addEventListener("touchend", dragStop)
carouselImgContainer.addEventListener("touchleave", dragStop)
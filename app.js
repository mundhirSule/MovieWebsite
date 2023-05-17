// const track = document.querySelector('[data-carouselTrack]');
// const slides = Array.from(track.children);
// const nextButton = document.querySelector('.carousel-next');
// const prevButton = document.querySelector('.carousel-prev');

// const slideWidth = slides[0].getBoundingClientRect().width;

// //Arrange slides next to another

// const setSlidePosition = (slide, index) => {
// 	slide.style.left = slideWidth * index + 'px';
// };
// slides.forEach(setSlidePosition);

// const moveToSlide = (track, currentSlide, targetSlide) => {
// 	//move to the next slide
// 	track.style.transform = 'translateX(-' + targetSlide.style.left + ')';

// 	//remove current-slide class from the current slide
// 	currentSlide.classList.remove('current-slide');

// 	//add the current-slide to the next slide
// 	targetSlide.classList.add('current-slide');
// };

// const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
// 	if (targetIndex === 0) {
// 		prevButton.classList.add('is-hidden');
// 		nextButton.classList.remove('is-hidden');
// 	} else if (targetIndex === slides.length - 1) {
// 		prevButton.classList.remove('is-hidden');
// 		nextButton.classList.add('is-hidden');
// 	} else {
// 		prevButton.classList.remove('is-hidden');
// 		nextButton.classList.remove('is-hidden');
// 	}
// };

// //move when next button is clicked
// nextButton.addEventListener('click', (e) => {
// 	//find current slide
// 	const currentSlide = track.querySelector('.current-slide');
// 	const nextSlide = currentSlide.nextElementSibling;
// 	const nextIndex = slides.findIndex((slide) => slide === nextSlide);

// 	moveToSlide(track, currentSlide, nextSlide);
// 	hideShowArrows(slides, prevButton, nextButton, nextIndex);
// });

// //move to prev slide when prev button is pressed
// prevButton.addEventListener('click', (e) => {
// 	//find current slide
// 	const currentSlide = track.querySelector('.current-slide');
// 	const prevSlide = currentSlide.previousElementSibling;
// 	const prevIndex = slides.findIndex((slide) => slide === prevSlide);
// 	moveToSlide(track, currentSlide, prevSlide);
// 	hideShowArrows(slides, prevButton, nextButton, prevIndex);
// });

const tracks = document.querySelectorAll('[data-carouselTrack]');
const slides = [];
const nextButtons = document.querySelectorAll('.carousel-next');
const prevButtons = document.querySelectorAll('.carousel-prev');
const slideWidths = [];

tracks.forEach((track) => {
	const trackSlides = Array.from(track.children);
	slides.push(trackSlides);

	const slideWidth = trackSlides[0].getBoundingClientRect().width;
	slideWidths.push(slideWidth);

	const setSlidePosition = (slide, index) => {
		slide.style.left = slideWidth * index + 'px';
	};

	trackSlides.forEach(setSlidePosition);

	const moveToSlide = (currentTrack, currentSlide, targetSlide) => {
		currentTrack.style.transform =
			'translateX(-' + targetSlide.style.left + ')';
		currentSlide.classList.remove('current-slide');
		targetSlide.classList.add('current-slide');
	};

	const hideShowArrows = (
		currentTrack,
		currentSlides,
		prevButton,
		nextButton,
		targetIndex
	) => {
		if (targetIndex === 0) {
			prevButton.classList.add('is-hidden');
			nextButton.classList.remove('is-hidden');
		} else if (targetIndex === currentSlides.length - 1) {
			prevButton.classList.remove('is-hidden');
			nextButton.classList.add('is-hidden');
		} else {
			prevButton.classList.remove('is-hidden');
			nextButton.classList.remove('is-hidden');
		}
	};

	const handleSlideButtonClick = (index, direction) => {
		const currentSlide = tracks[index].querySelector('.current-slide');
		let targetSlide;

		if (direction === 'next') {
			targetSlide = currentSlide.nextElementSibling;
		} else if (direction === 'prev') {
			targetSlide = currentSlide.previousElementSibling;
		}

		if (!targetSlide) {
			return; // No target slide found, exit the function
		}

		const targetIndex = slides[index].findIndex(
			(slide) => slide === targetSlide
		);

		moveToSlide(tracks[index], currentSlide, targetSlide);
		hideShowArrows(
			tracks[index],
			slides[index],
			prevButtons[index],
			nextButtons[index],
			targetIndex
		);
	};

	nextButtons.forEach((nextButton, index) => {
		nextButton.addEventListener('click', () => {
			handleSlideButtonClick(index, 'next');
		});
	});

	prevButtons.forEach((prevButton, index) => {
		prevButton.addEventListener('click', () => {
			handleSlideButtonClick(index, 'prev');
		});
	});
});

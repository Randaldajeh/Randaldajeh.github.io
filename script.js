document.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const projectTitle = document.getElementById('projectTitle');
    const projectPurpose = document.getElementById('projectPurpose');
    const projectDescription = document.getElementById('projectDescription');
    const projectVideo = document.getElementById('projectVideo');
    const carousel = document.querySelector('.carousel');

    let activeIndex = 0;
    const totalTiles = tiles.length;

    function getCircularIndex(index) {
        if (index < 0) {
            return totalTiles - 1;
        } else if (index >= totalTiles) {
            return 0;
        }
        return index;
    }

    function getPrevIndex(index) {
        return getCircularIndex(index - 1);
    }

    function getNextIndex(index) {
        return getCircularIndex(index + 1);
    }

    function updateTilePositions(activeIndex) {
        tiles.forEach((tile) => {
            tile.classList.remove('active', 'prev', 'next');
        });

        tiles[activeIndex].classList.add('active');
        tiles[getPrevIndex(activeIndex)].classList.add('prev');
        tiles[getNextIndex(activeIndex)].classList.add('next');
    }

    function updateProjectInfo(activeTile) {
        projectTitle.textContent = activeTile.dataset.title;
        projectPurpose.textContent = activeTile.dataset.purpose;
        projectDescription.textContent = activeTile.dataset.description;
        projectVideo.textContent = activeTile.dataset.video;
        let videoUrl = activeTile.dataset.video;

        if (videoUrl.indexOf('?') > -1) {
            videoUrl += '&controls=0&modestbranding=1&rel=0&fs=0';
        } else {
            videoUrl += '?controls=0&modestbranding=1&rel=0&fs=0';
        }
        projectVideo.innerHTML = `<iframe width="800" height="450" src="${videoUrl}" title="${activeTile.dataset.title} Video" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

    }


    if (tiles.length > 0) {
        updateTilePositions(activeIndex);
        updateProjectInfo(tiles[activeIndex]);
    }

    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => {
            activeIndex = index;
            updateTilePositions(activeIndex);
            updateProjectInfo(tile);
        });
    });



    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        if (navLinks.style.display === 'flex' || navLinks.style.display === 'block') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
        }
    });

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message, we will get back to you soon!');
            contactForm.reset();
        });
    }

    // --- AUTO SLIDE FUNCTIONALITY ---
    const AUTO_SLIDE_INTERVAL = 4000; // 4 seconds

    if (tiles.length > 1) {
        setInterval(() => {
            activeIndex = getNextIndex(activeIndex);
            updateTilePositions(activeIndex);
            updateProjectInfo(tiles[activeIndex]);
        }, AUTO_SLIDE_INTERVAL);
    }
});


pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.js';

const book = document.querySelector('#book');

let currentState = 1;
let numOfPapers;
let maxState;
let pdfDoc;
let isAnimating = false;
const ANIMATION_DURATION = 300;

const pdfSrc = book.getAttribute('data-pdf-src');

pdfjsLib.getDocument(pdfSrc).promise.then(pdfDoc_ => {
    pdfDoc = pdfDoc_;
    numOfPapers = pdfDoc.numPages;
    maxState = Math.ceil(numOfPapers / 2);

    // Create PDF pages
    for (let i = 1; i <= maxState; i++) {
        const paperDiv = document.createElement('div');
        paperDiv.id = `p${i}`;
        paperDiv.classList.add('paper');
        paperDiv.style.zIndex = maxState - i + 1;

        const frontDiv = document.createElement('div');
        frontDiv.classList.add('front');

        const backDiv = document.createElement('div');
        backDiv.classList.add('back');

        const canvasFront = document.createElement('canvas');
        canvasFront.id = `f${i}`;
        frontDiv.appendChild(canvasFront);

        const canvasBack = document.createElement('canvas');
        canvasBack.id = `b${i}`;
        backDiv.appendChild(canvasBack);

        paperDiv.appendChild(frontDiv);
        paperDiv.appendChild(backDiv);

        book.appendChild(paperDiv);
    }

    const paperElements = [];
    for (let i = 1; i <= maxState; i++) {
        paperElements.push(document.querySelector(`#p${i}`));
    }

    function renderPage(pageNum, canvasId) {
        if (pageNum > pdfDoc.numPages) return;
        
        pdfDoc.getPage(pageNum).then(page => {
            const canvas = document.getElementById(canvasId);
            const context = canvas.getContext('2d');
            const bookDiv = document.getElementById('book');
            const viewport = page.getViewport({ scale: (bookDiv.clientWidth / page.getViewport({ scale: 1 }).width) * 2 });
            canvas.width = viewport.width - 5;
            canvas.height = viewport.height;
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            bookDiv.style.height = `${canvas.height / 2}px`;

            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };

            page.render(renderContext);
        });
    }

    // Render PDF pages
    for (let i = 1; i <= maxState; i++) {
        renderPage(2 * i - 1, `f${i}`);
        renderPage(2 * i, `b${i}`);
    }

    function resizeCanvas() {
        for (let i = 1; i <= maxState; i++) {
            renderPage(2 * i - 1, `f${i}`);
            renderPage(2 * i, `b${i}`);
        }
    }

    function updatePageProperties() {
        paperElements.forEach((page, index) => {
            if (index < currentState - 1) {
                page.style.transformOrigin = 'left';
                page.classList.add('flipped');
                page.style.zIndex = maxState - (currentState - index - 1);
            } else {
                page.style.transformOrigin = 'left';
                page.classList.remove('flipped');
                page.style.zIndex = maxState - index;
            }
        });
    }

    function openBook() {
        book.style.transform = "translateX(50%)";
    }

    function closeBook(isFirstPage) {
        if (isFirstPage) {
            book.style.transform = "translateX(0%)";
        } else {
            book.style.transform = "translateX(50%)";
        }
    }

    function goNext() {
        if (currentState < maxState) {
            isAnimating = true;
            if (currentState === 1) {
                const page = paperElements[currentState - 1];
                page.classList.add('flipped');
                setTimeout(() => {
                    currentState++;
                    updatePageProperties();
                    openBook();
                    isAnimating = false;
                }, ANIMATION_DURATION);
            } else {
                currentState++;
                updatePageProperties();
                setTimeout(() => {
                    isAnimating = false;
                }, ANIMATION_DURATION);
            }
        }
    }

    function goPrevious() {
        if (currentState > 1) {
            isAnimating = true;
            const currentPage = paperElements[currentState - 2];
            
            if (currentState === 2) {
                for (let i = 1; i <= maxState; i++) {
                    paperElements[i - 1].style.zIndex = maxState - i;
                }
                
                currentPage.classList.remove('flipped');
                setTimeout(() => {
                    currentState--;
                    updatePageProperties();
                    closeBook(true);
                    isAnimating = false;
                }, ANIMATION_DURATION);
            } else {
                currentPage.classList.remove('flipped');
                setTimeout(() => {
                    currentState--;
                    updatePageProperties();
                    isAnimating = false;
                }, ANIMATION_DURATION);
            }
        }
    }

    book.addEventListener("click", (e) => {
        const rect = book.getBoundingClientRect();
        const relativeClickX = e.clientX - (window.innerWidth / 2);

        if (relativeClickX < 0) {
            goPrevious();
        } else {
            goNext();
        }
    });

    window.addEventListener("resize", resizeCanvas);
    updatePageProperties();
});
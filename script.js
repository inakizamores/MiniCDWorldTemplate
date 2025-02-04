const pdfUrl = 'pdf/MCDK_BLANK_TEMPLATE.pdf';
const canvas = document.getElementById('pdfCanvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('downloadBtn');
const printBtn = document.getElementById('printBtn');

let pdfDoc = null;

// Render the first page of the PDF
function renderPDF(pageNum) {
    pdfDoc.getPage(pageNum).then(function(page) {
        const viewport = page.getViewport({ scale: 1.5 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };
        page.render(renderContext);
    });
}

// Load the PDF
pdfjsLib.getDocument(pdfUrl).promise.then(function(pdfDoc_) {
    pdfDoc = pdfDoc_;
    renderPDF(1); // Render the first page
});

// Download button
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'MCDK_BLANK_TEMPLATE.pdf';
    link.click();
});

// Print button (updated for direct PDF printing)
printBtn.addEventListener('click', () => {
    pdfDoc.getData().then(data => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(blob);

        // Create a new window
        const printWindow = window.open(blobUrl, '_blank');

        // Check if the window was opened successfully
        if (printWindow) {
            printWindow.onload = () => {
                printWindow.print();
            };
        } else {
            console.error('Failed to open print window. Please check your browser settings.');
        }
    });
});
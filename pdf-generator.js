async function generatePDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    const selectedTnTs = Array.from(document.querySelectorAll('input:checked')).map(input => input.value);

    if (selectedTnTs.length === 0) {
        alert("Please select at least one TnT to generate a PDF.");
        return;
    }

    let y = 20; // Initial vertical position on the page

    // Add a header to the PDF
    pdf.setFontSize(16);
    pdf.text("TnT Library", 105, 10, { align: "center" });
    pdf.setFontSize(12);

    for (let i = 0; i < selectedTnTs.length; i++) {
        try {
            const response = await fetch(selectedTnTs[i]);
            if (!response.ok) throw new Error(`Failed to fetch ${selectedTnTs[i]}`);
            const text = await response.text();

            // Add title for each TnT
            pdf.setFontSize(14);
            pdf.text(`TnT ${i + 1}`, 10, y);
            y += 10;

            // Add wrapped text
            pdf.setFontSize(10);
            const textLines = pdf.splitTextToSize(text, 180); // Wrap text to 180mm width
            pdf.text(textLines, 10, y);
            y += textLines.length * 10;

            // Add a page if content exceeds the page height
            if (y > 270) {
                pdf.addPage();
                y = 20;
            }
        } catch (error) {
            console.error(`Error fetching TnT ${i + 1}:`, error);
            pdf.text(`Error loading TnT ${i + 1}`, 10, y);
            y += 10;
        }
    }

    pdf.save("selected-TnTs.pdf");
}

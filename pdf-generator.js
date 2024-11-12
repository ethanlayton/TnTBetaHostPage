async function generatePDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    const selectedTnTs = Array.from(document.querySelectorAll('input:checked')).map(input => input.value);

    if (selectedTnTs.length === 0) {
        alert("Please select at least one TnT to generate a PDF.");
        return;
    }

    let y = 20; // Initial vertical position on the page
    const pageHeight = 280; // Total height of the page
    const lineHeight = 10; // Height of each line of text
    const marginLeft = 10; // Left margin
    const textWidth = 180; // Width of the text box (210mm - 30mm margins)

    // Add a header to the PDF
    pdf.setFontSize(16);
    pdf.text("TnT Library", 105, 10, { align: "center" });
    pdf.setFontSize(12);
    y += 10; // Leave space after the header

    for (let i = 0; i < selectedTnTs.length; i++) {
        try {
            const response = await fetch(selectedTnTs[i]);
            if (!response.ok) throw new Error(`Failed to fetch ${selectedTnTs[i]}`);
            const text = await response.text();

            // Add title for each TnT
            pdf.setFontSize(14);
            pdf.text(`TnT ${i + 1}`, marginLeft, y);
            y += lineHeight;

            // Split text into lines that fit within the text width
            pdf.setFontSize(10);
            const textLines = pdf.splitTextToSize(text, textWidth);

            for (const line of textLines) {
                if (y + lineHeight > pageHeight) {
                    pdf.addPage();
                    y = 20; // Reset y for the new page
                }
                pdf.text(line, marginLeft, y);
                y += lineHeight;
            }

            y += 10; // Add spacing after each TnT

        } catch (error) {
            console.error(`Error fetching TnT ${i + 1}:`, error);
            if (y + lineHeight > pageHeight) {
                pdf.addPage();
                y = 20; // Reset y for the new page
            }
            pdf.text(`Error loading TnT ${i + 1}`, marginLeft, y);
            y += lineHeight;
        }
    }

    pdf.save("selected-TnTs.pdf");
}

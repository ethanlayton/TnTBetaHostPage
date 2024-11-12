async function generatePDF() {
    const { jsPDF } = window.jspdf; // Import jsPDF
    const pdf = new jsPDF();
    const selectedTnTs = Array.from(document.querySelectorAll('input:checked')).map(input => input.value);

    if (selectedTnTs.length === 0) {
        alert("Please select at least one TnT to generate a PDF.");
        return;
    }

    for (let i = 0; i < selectedTnTs.length; i++) {
        try {
            const response = await fetch(selectedTnTs[i]);
            if (!response.ok) throw new Error(`Failed to fetch ${selectedTnTs[i]}`);
            const text = await response.text();
            pdf.text(`TnT ${i + 1}\n${text}`, 10, 10 + i * 50); // Add content with proper spacing
        } catch (error) {
            console.error(`Error fetching TnT ${i + 1}:`, error);
            pdf.text(`Error loading TnT ${i + 1}`, 10, 10 + i * 50);
        }
    }

    pdf.save("selected-TnTs.pdf");
}

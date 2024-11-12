async function generatePDF() {
  const { jsPDF } = window.jspdf; // Import jsPDF
  const pdf = new jsPDF();
  const selectedTnTs = Array.from(document.querySelectorAll('input:checked')).map(input => input.value);

  if (selectedTnTs.length === 0) {
    alert("Please select at least one TnT to generate a PDF.");
    return;
  }

  for (let i = 0; i < selectedTnTs.length; i++) {
    const response = await fetch(`https://raw.githubusercontent.com/username/repository-name/main/${selectedTnTs[i]}`);
    const text = await response.text();
    pdf.text(text, 10, 10 + i * 50); // Adjust positioning as needed
  }

  pdf.save("selected-TnTs.pdf");
}

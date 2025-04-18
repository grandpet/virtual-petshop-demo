
document.addEventListener("DOMContentLoaded", function () {
  const categories = document.querySelectorAll(".category");

  categories.forEach(category => {
    category.addEventListener("click", function() {
      const categoryName = category.textContent;
      const container = document.querySelector("#image-container");

      if (categoryName === "Τεχνολογία") {
        alert("Εδώ είναι οι τελευταίες εξελίξεις στην Τεχνολογία!");
        container.innerHTML = '<img src="https://via.placeholder.com/400x200?text=Τεχνολογία" alt="Τεχνολογία"/>';
      } else if (categoryName === "Μόδα") {
        alert("Μάθε τις νέες τάσεις στη Μόδα!");
        container.innerHTML = '<img src="https://via.placeholder.com/400x200?text=Μόδα" alt="Μόδα"/>';
      } else if (categoryName === "Μαγειρική") {
        alert("Ανακάλυψε υπέροχες συνταγές!");
        container.innerHTML = '<img src="https://via.placeholder.com/400x200?text=Μαγειρική" alt="Μαγειρική"/>';
      } else {
        alert("Επιλέξτε μια κατηγορία!");
        container.innerHTML = "";
      }
    });
  });
});

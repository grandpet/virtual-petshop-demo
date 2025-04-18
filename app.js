console.log("Virtual Petshop loaded!");

document.querySelectorAll('.floor').forEach(function(floor) {
  floor.addEventListener('click', function() {
    alert("Έχεις επιλέξει την κατηγορία: " + floor.textContent);
  });
});

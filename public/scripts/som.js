// document.addEventListener("click", (e) => {
//   const link = e.target.closest("nav a");

//   if (link) {
//     e.preventDefault(); // impede a navegação instantânea
//     navClickSound.currentTime = 0;
//     navClickSound.play().catch(() => { });

//     setTimeout(() => {
//       window.location = link.href; // navega depois do som
//     }, 90); // 90ms é perfeito para "pop"
//   }
// });

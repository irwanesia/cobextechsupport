/**
 * CobexTech — Custom Script
 * 1. Filter sederhana untuk section "Proyek & Unduhan"
 * 2. Visitor counter di footer (pakai layanan counter gratis CountAPI,
 *    dengan fallback localStorage kalau API tidak bisa diakses)
 */
document.addEventListener("DOMContentLoaded", function () {
  /* ---------- 1. Project filter ---------- */
  const filterButtons = document.querySelectorAll("[data-project-filter]");
  const projectItems = document.querySelectorAll(".project-item");

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterButtons.forEach((b) => b.classList.remove("filter-active"));
      btn.classList.add("filter-active");

      const filter = btn.getAttribute("data-project-filter");

      projectItems.forEach(function (item) {
        const show = filter === "*" || item.classList.contains(filter.replace(".", ""));
        item.classList.toggle("project-hidden", !show);
      });
    });
  });

  /* ---------- 2. Visitor counter ---------- */
  const counterEl = document.getElementById("visitor-count");
  if (!counterEl) return;

  const NAMESPACE = "cobextech-site";
  const KEY = "homepage-visits";
  const LOCAL_KEY = "cobextech_visits_fallback";

  fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/${KEY}`)
    .then((res) => res.json())
    .then((data) => {
      counterEl.textContent = data.value.toLocaleString("id-ID");
    })
    .catch(() => {
      // Fallback: hitung lokal di browser pengunjung (bukan angka global,
      // hanya sementara sampai backend/admin tersedia)
      let count = parseInt(localStorage.getItem(LOCAL_KEY) || "0", 10);
      count += 1;
      localStorage.setItem(LOCAL_KEY, count);
      counterEl.textContent = count.toLocaleString("id-ID");
    });
});

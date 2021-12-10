function $(tag) {
  if (tag.search("#") !== -1 || tag.search(/body|html/) !== -1)
    return document.querySelector(tag);
  return document.querySelectorAll(tag);
}
function main() {
  const openBtn = $("#openModal");
  const closeBtn = $("#closeBtn");
  const modal = $("#modal");

  // Event Listeners
  openBtn.addEventListener("click", () => {
    modal.classList.add("open");
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("open");
  });
}
main();

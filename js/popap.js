var butn = document.querySelector(".button-popup");
var popup = document.querySelector(".popup-find-form");

var form = popup.querySelector("form");
var arrDate = popup.querySelector("[name=arrival-date]");
var depDate = popup.querySelector("[name=departure-date]");
var grown = popup.querySelector("[name=grownup]");
var child = popup.querySelector("[name=children]");

var isStorageSupport = true;
var lastChild = "";
var lastGrown = "";


// Проверяем поддерживается ли localStorage и берем из него кол-во взрослых и детей  
try {
  lastChild = localStorage.getItem("grownup");
  lastGrown = localStorage.getItem("childrens");
} catch (err) {
  isStorageSupport = false;
}

// Открываем и закрываем модальное окно, ставим фокус в первое поле и автоматически заполняем поля с кол-вом взрослых и детей
butn.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.toggle("modal-show");
  if (lastChild) {
    child.value = lastChild;
  }
  if (lastGrown) {
    grown.value = lastGrown;
  }
  arrDate.focus();
});

// Проверяем заполнены ли все поля и записываем в localStorage кол-во детей и взрослых, иначе трясем окно формы
form.addEventListener("submit", function (evt) {
  if (!arrDate.value || !depDate.value || !grown.value || !child.value) {
    evt.preventDefault();
    popup.classList.remove("modal-error");
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add("modal-error");
  } else {
  	if (isStorageSupport) {
      localStorage.setItem("grownup", grown.value);
      localStorage.setItem("childrens", child.value);
    }
  }
});

// Закрытие модального окна клавишей Esc
window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popup.classList.contains("modal-show")) {
      popup.classList.remove("modal-show");
      popup.classList.remove("modal-error");
    }
  }
});
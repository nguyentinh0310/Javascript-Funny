/*
    <!-- beforebegin -->
    <h3>
      <!-- afterbegin -->  
      <span></span>
      <!-- beforeend -->
    </h3>
    <!-- afterend -->
 */

// 1. element.insertAdjacentText(position, text)
const h3 = document.querySelector("h3");
// h3.insertAdjacentText("position", "text")
// có 4 position: beforebegin, afterbegin, beforeend, afterend
h3.insertAdjacentText("beforebegin", "begin"); //trước thẻ h3
h3.insertAdjacentText("afterbegin", "afterbegin"); //trong thẻ h3 trước span
h3.insertAdjacentText("beforeend", "beforeend");//trong thẻ h3 sau span
h3.insertAdjacentText("afterend", "afterend");// sau thẻ h3
// 2. element.insertAdjacentElement(position, node)
const strong = document.createElement("strong");
strong.classList.add("bold");
h3.insertAdjacentElement("beforeend", strong);


// 3. element.insertAdjacentHTML
const template = `
<ul class="menu2">
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>`;
document.body.insertAdjacentHTML("beforeend", template);
// parse
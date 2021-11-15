// 1. parentNode, parentElement, removeChild

/*
    <h3>
      <span class="span"></span>
    </h3>
 */

// parentNode vs parentElement
const span = document.querySelector("span");
console.log(span.parentNode); // trỏ tới thẻ h3
console.log(span.parentNode.parentNode); //trỏ tới thẻ body
console.log(span.parentElement); // trỏ tới thẻ h3
console.log(span.parentElement.parentElement); //trỏ tới thẻ body
// selector.parentNode hoặc selector.parentElement.removeChild(selector)
span.parentNode.removeChild(span);
// span.remove();

/*
    <h3>
      <a href="#" class="demo">demo</a>
      <span class="span">
        <strong>abc</strong>
      </span>
      <span class="span2">xyz</span>
    </h3>
 */

// 2. nextElementSibling: tìm tới phần tử kế tiếp vs previousElementSibling: tìm tới phần tử đứng sau nó
// a b c
const nextSpan = span.nextElementSibling;
console.log(nextSpan); // <span class="span2">xyz</span>
const previousLink = span.previousElementSibling;
console.log(previousLink); // <a href="#" class="demo">demo</a>
// 3. childNodes: trả về 1 mảng  các node bên trong bao gồm textNodes vs children: trả về các node không bao gồm textNodes
console.log(span.childNodes); // text <strong> text
console.log(span.children[1]);
// 4. firstChild vs firstElementChild
console.log(span.firstChild); // text
console.log(span.firstElementChild); // <strong>
// 5. lastChild vs lastElementChild
console.log(span.lastChild); // text
console.log(span.lastElementChild); // <strong>
// 6. nextSibling vs previousSibling
console.log(span.nextSibling);
console.log(span.previousSibling);

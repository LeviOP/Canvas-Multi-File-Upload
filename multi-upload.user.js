// ==UserScript==
// @name        Canvas Multi-File Upload
// @namespace   Violentmonkey Scripts
// @match       https://*.instructure.com/courses/*/assignments/*
// @grant       none
// @version     1.0.1
// @author      Levi_OP
// @description Upload multiple files to a canvas assignment without the hassle.
// ==/UserScript==

const input = document.createElement("input");
input.setAttribute("type", "file");
input.setAttribute("multiple", "");

const tr = document.createElement("tr");
tr.innerHTML ='<td colspan="2">Select multiple files: </td>';
tr.children[0].appendChild(input);
document.querySelector(".formtable > tbody").children[0].insertAdjacentElement("afterend", tr);

document.querySelector("#submit_file_button").addEventListener("click", () => tr.remove());

input.addEventListener("change", () => {
    const files = input.files;
    let inputs = document.querySelectorAll(".submission_attachment:not([id])");
    if (inputs.length < files.length) {
        for (let i = inputs.length; i < files.length; i++) document.querySelector(".Button.Button--link.add_another_file_link").click();
        for (const elm of document.querySelectorAll(".submission_attachment:not([id])")) elm.children[0].children[0].click();
    } else if (inputs.length > files.length) {
        for (let i = files.length; i < inputs.length; i++) document.querySelectorAll(".submission_attachment:not([id])")[0].children[1].click();
    }
    inputs = document.querySelectorAll(".submission_attachment:not([id])");
    for (let i = 0; i < files.length; i++) {
        const file = new DataTransfer();
        file.items.add(files[i]);
        console.log(file);
        inputs[i].children[0].children[0].children[1].files = file.files;
    }
});

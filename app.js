let BASE_URL="https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api"

import {countryList} from './codes.js';

let dropdown = document.querySelectorAll("select");
let img1=document.querySelector("#img1");
let img2=document.querySelector("#img2");
let btn=document.querySelector("button");
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");
let msgg=document.querySelector(".msg");

let updateFlag=(element, updatelement)=>{
    let code=element.value;
    console.log(code);
    let countryCode=countryList[code];
    let newSourceLink=`https://flagsapi.com/${countryCode}/flat/64.png`;
    updatelement.src=newSourceLink
}

for(let select of dropdown){
    for(let currcode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currcode;
        newOption.value=currcode
        if(select.name==="from" && currcode=="USD"){
            newOption.selected="selected"
        }
        if(select.name==="To" && currcode=="INR"){
            newOption.selected="selected"
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        if (evt.target.name === "from") {
            updateFlag(evt.target, img1); 
        } else if (evt.target.name === "To") {
            updateFlag(evt.target, img2);
        }
    });
}


btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval=="" ||amtval<1){
        amtval=1;
        amount.value=1;
    }
    console.log(amount.value)
    console.log(fromCurr.value, toCurr.value)
    const URL = `${BASE_URL}/${fromCurr.value}_${toCurr.value}.json`;
    let response = await fetch(URL);
    let data=await response.json();
    console.log(data.rate);
    
    let finalAmount=amtval*data.rate;
    console.log(finalAmount);
    msgg.innerText=`${amtval} ${fromCurr.value}=${finalAmount} ${toCurr.value}`
});




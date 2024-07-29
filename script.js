const BASE_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropdown){
    for(currcode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currcode;
        newOption.value=currcode;
        if(select.name==='from' && currcode==='USD')
            newOption.selected="selected";
        if(select.name==='to' && currcode==='INR')
            newOption.selected="selected";

        select.append(newOption)
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}
 
const updateExcahngeRate=async ()=>{
    let amt=document.querySelector(".amount input");
    let amtval=amt.value;
    if (amtval==="" || amtval<1){
        amtval=1;
        amt.value="1";
    }
    // console.log(fromCurr.value,toCurr.value);
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await  response.json();
    let rate=data[toCurr.value.toLowerCase()];
    let finalamt=amtval*rate;
    console.log(finalamt);
    // amt.value.innerText=finalamt;
    msg.innerText=`${amtval} ${fromCurr.value}=${finalamt} ${toCurr.value}`;
}

const updateFlag=(element)=>{
    let currcode=element.value;
    let countrycode=countryList[currcode];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;

}


btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();       //to prevent atumatic refreshig
    updateExcahngeRate();
});

window.addEventListener("load",()=>{
    updateExcahngeRate();
})
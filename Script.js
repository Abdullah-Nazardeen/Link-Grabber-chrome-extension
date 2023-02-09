let myLeads = []
const saveBtn = document.querySelector("#btn-el")
const inputEl = document.querySelector("#input-el")
const ulEl = document.querySelector("#ul-el")
const delEl = document.querySelector("#del-el")
const tabEl = document.getElementById("tab-el")

function render(Leads) {
    let listItems = ""
    for ( let i = 0; i < Leads.length; i ++ ) {
        listItems += 
        `<li>
             <a href="${Leads[i]}" target="blank">
                 ${Leads[i]} 
             </a>
        </li>`
    }
    ulEl.innerHTML = listItems
}

saveBtn.addEventListener("click",function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    console.log(localStorage.getItem("myLeads"))
    render(myLeads)

})

const localStorageLeads = JSON.parse(localStorage.getItem("myLeads"))
if (localStorageLeads) {
    myLeads = localStorageLeads
    render(myLeads)
}

delEl.addEventListener("dblclick",function(){
    localStorage.clear("localStorageLeads")
    myLeads = []
    render(myLeads)
})

tabEl.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
          myLeads.push(tabs[0].url) 
          localStorage.setItem("myLeads",JSON.stringify(myLeads))
          render(myLeads)
    })
})


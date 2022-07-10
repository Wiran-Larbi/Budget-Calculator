
//? Function Constructor Of Elements
 function Element(option,description,value) {
        this.option = option;
        this.description = description;
        this.value = parseFloat(value);
        
}
Element.prototype.display = function() {
      console.log(this.option);
      console.log(this.description);
      console.log(this.value);
}


//? Important DOM Element's
const BUDGET_AVAILABLE = document.getElementById("total-available");
const ALERT_INCOME = document.querySelector("#income-value p");
const ALERT_EXPENSES = document.querySelector("#expenses-value p");
const ALERT_EXPENSES_PERCENT = document.querySelector("#expenses-value .percent");
const INCOME_TABLE = document.querySelector("#i-table table");
const EXPENSES_TABLE = document.querySelector("#e-table table");

//!- Form Input's
const CONTROL = document.querySelector(".control");
const CONTROL_TYPE = document.getElementById("option");
const CONTROL_DESC = CONTROL.querySelector(".description");
const CONTROL_VAL = CONTROL.querySelector(".value");

//? Important Variables of Our App
let CurrentBudget = parseFloat(BUDGET_AVAILABLE.innerHTML);
let TotalIncome = parseFloat(ALERT_INCOME.innerHTML.substring(1));
let TotalExpenses = parseFloat(ALERT_EXPENSES.innerHTML.substring(1));
let LivePercent = 0.0;
let expense_percent = 0.0;


function unsetInput() {
  CONTROL_DESC.value = ""; 
  CONTROL_VAL.value = "";
  CONTROL_DESC.focus();
}

function unsetTableHead(){
      if(INCOME_TABLE.querySelectorAll("tr").length === 1)
         INCOME_TABLE.parentElement.classList.add("hide-table");
      if(EXPENSES_TABLE.querySelectorAll("tr").length === 1)
         EXPENSES_TABLE.parentElement.classList.add("hide-table");
}
function updateCurrBudget(){
      if(CurrentBudget < 0){
         BUDGET_AVAILABLE.innerHTML = `${(CurrentBudget).toFixed(2)}`;
      }else{
         BUDGET_AVAILABLE.innerHTML = `${(CurrentBudget).toFixed(2)}`;
      } 
}
function updateExpensePercent(){
       expense_percent = ((TotalExpenses/TotalIncome) * 100).toFixed(2);
       if(TotalExpenses < TotalIncome)
       ALERT_EXPENSES_PERCENT.innerHTML = `%${expense_percent}`;
       else
       ALERT_EXPENSES_PERCENT.innerHTML = `%00.00`;
}
function creatingElement(description,value,type) {
           let ELEMENT = document.createElement("tr");
           let TD = document.createElement("td");
           let DIV = document.createElement("div");
               DIV.classList.add("element");
        if(type === "income"){
               DIV.innerHTML = ` 
               <span class="element-desc" style="flex: 0 0 65%;">${description}</span>
               <span class="element-value inc">+${value}</span>
               <img src="icon-x-inc.svg" alt="x icon" class="delete">
                   `;
        }else{
          DIV.innerHTML = ` 
          <span class="element-desc" style="flex:0 0 55%;">${description}</span>
               <span class="element-value exp" >-${value}
               <div class="percent">%${(parseFloat(value / TotalIncome) * 100).toFixed(2)}</div>
               </span>
               <img src="icon-x-exp.svg" alt="x icon" class="delete">
            `;
        }
        TD.appendChild(DIV);
        ELEMENT.appendChild(TD);
         return ELEMENT;
}
function updateIncome(){
          if(TotalIncome < 0) TotalIncome = 0;
         ALERT_INCOME.innerHTML = `+${TotalIncome.toFixed(2)}`;
}
function updateExpenses(){
          if(TotalExpenses < 0) TotalExpenses = 0;
         ALERT_EXPENSES.innerHTML =`-${TotalExpenses.toFixed(2)}`;
}
   
CONTROL.addEventListener("submit",function(e) {
       e.preventDefault();
         //! Checking For Empty Values
        if(CONTROL_DESC.value === "" || CONTROL_VAL.value === "" || CONTROL_VAL.value < 0) {
              console.log("Can't Leave Empty !");
              return;
         }
         

         let elem = new Element(CONTROL_TYPE.options[CONTROL_TYPE.selectedIndex].value, CONTROL_DESC.value,CONTROL_VAL.value);
              BUDGET_AVAILABLE.innerHTML = '';
              if(elem.option === "+"){
                 CurrentBudget += elem.value; 
                 TotalIncome += elem.value;
                 INCOME_TABLE.parentElement.classList.remove("hide-table");
                 updateCurrBudget();
                 updateIncome();
                 
            

                //? Adding To Table
                let ELEMENT = creatingElement(elem.description,elem.value,"income");
                INCOME_TABLE.appendChild(ELEMENT);

                //? Handeling delete button
                 const xBtn = ELEMENT.querySelector(".delete");
                xBtn.addEventListener("click", function() {
                  CurrentBudget -= elem.value;
                  TotalIncome -= elem.value;
                  //? Updating Budget and Income and Expenses Percent
                     updateCurrBudget();
                     updateIncome();
                    
                     
                     //? Removing Element
                     INCOME_TABLE.removeChild(ELEMENT);
                     unsetTableHead();
                     unsetInput();

                });
                
             }else{
                    CurrentBudget -= elem.value;
                    TotalExpenses += elem.value;
                    EXPENSES_TABLE.parentElement.classList.remove("hide-table");
                    updateCurrBudget();
                    updateExpenses();
                   
                    
                    
                    //? Adding To Table
                    let ELEMENT = creatingElement(elem.description,elem.value,"expense");
                    EXPENSES_TABLE.appendChild(ELEMENT);
                   
                     //? Handeling delete button
                     const xBtn = ELEMENT.querySelector(".delete");
                     xBtn.addEventListener("click", function() {
                     CurrentBudget += elem.value;
                     TotalExpenses -= elem.value;
                    //? Updating Budget and Income and Expenses Percent
                     updateCurrBudget();
                     updateExpenses();

                     updateExpensePercent();

                     //? Removing Element
                     EXPENSES_TABLE.removeChild(ELEMENT);
                     unsetTableHead();
                     unsetInput();
                 });
       }
         updateExpensePercent(); 
         unsetInput();

});
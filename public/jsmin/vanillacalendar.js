var vanillacalendar={month:document.querySelectorAll('[data-calendar-area="month"]')[0],next:document.querySelectorAll('[data-calendar-toggle="next"]')[0],previous:document.querySelectorAll('[data-calendar-toggle="previous"]')[0],label:document.querySelectorAll('[data-calendar-label="month"]')[0],activeDates:null,date:new Date(),todaysDate:new Date(),init:function(){this.date.setDate(1)
this.createMonth()
this.createListeners()},createListeners:function(){var _this=this;document.getElementById('next').addEventListener('click',function(){_this.clearCalendar()
var nextMonth=_this.date.getMonth()+1
_this.date.setMonth(nextMonth)
_this.createMonth()})
document.getElementById('previous').addEventListener('click',function(){_this.clearCalendar()
var prevMonth=_this.date.getMonth()-1
_this.date.setMonth(prevMonth)
_this.createMonth()})},createDay:function(num,day,year){this.month=document.getElementById("month");var newDay=document.createElement('div')
var dateEl=document.createElement('span')
dateEl.innerHTML=num
newDay.className='cal__date'
newDay.setAttribute('data-calendar-date',this.date)
if(num===1){var offset=((day-1)*14.28)
if(offset>0){newDay.style.marginLeft=offset+'%'}}if(this.date.getTime()<=this.todaysDate.getTime()-1){newDay.classList.add('cal__date--disabled')}else{newDay.classList.add('cal__date--active')
newDay.setAttribute('data-calendar-status','active')}if(this.date.toString()===this.todaysDate.toString()){newDay.classList.add('cal__date--today')}newDay.appendChild(dateEl)
this.month.appendChild(newDay)},dateClicked:function(){var _this=this
this.activeDates=document.querySelectorAll('[data-calendar-status="active"]')
for(var i=0;i<this.activeDates.length;i++){this.activeDates[i].addEventListener('click',function(event){var a=document.getElementById("dateSelected");a.setAttribute("value",this.dataset.calendarDate.split(" ",4));_this.removeActiveClass()
this.classList.add('cal__date--selected')})}},createMonth:function(){this.label=document.querySelectorAll('[data-calendar-label="month"]')[0];var currentMonth=this.date.getMonth()
while(this.date.getMonth()===currentMonth){this.createDay(this.date.getDate(),this.date.getDay(),this.date.getFullYear())
this.date.setDate(this.date.getDate()+1)}this.date.setDate(1)
this.date.setMonth(this.date.getMonth()-1)
this.label.innerHTML=this.monthsAsString(this.date.getMonth())+' '+this.date.getFullYear()
this.dateClicked()},monthsAsString:function(monthIndex){return['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'][monthIndex]},clearCalendar:function(){vanillacalendar.month.innerHTML=''},removeActiveClass:function(){for(var i=0;i<this.activeDates.length;i++){this.activeDates[i].classList.remove('cal__date--selected')}}}
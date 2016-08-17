!function(e){"use strict";e.App={Collections:{clients:[]},Views:{}}}(window),function(e){"use strict";function t(e,t){this.el=t,this.date=e,this.render(),this.start()}t.prototype.calculateTime=function(){var e=Date.parse(this.date),t=new Date(e),n=new Date,i=t-n;i/=1e3;var o=Math.floor(i%60);i/=60;var a=Math.floor(i%60);i/=60;var l=Math.floor(i%24);i/=24;var s=Math.floor(i%30);i/=30;var r=Math.floor(i%12),d=Math.floor(i/12),c={years:d,months:r,days:s,hours:l,minutes:a,seconds:o},h="";for(var p in c)h+=c[p]+" : "+p+", ";return h},t.prototype.render=function(){this.el.textContent=this.calculateTime()},t.prototype.start=function(){var e=this;this.id=setInterval(function(){e.render()},1e3)},t.prototype.stop=function(){clearTimeout(this.id)},e.Views.EstimatedDateElement=t}(App),function(e){"use strict";function t(){this.eventCollection=[]}t.prototype.addEventListener=function(e,t){this.eventCollection.push({eventType:e,eventHandler:t})},t.prototype.triggerEvent=function(e,t){this.eventCollection.forEach(function(n){e===n.eventType&&n.eventHandler(t)})},e.Views.EventCollection=t}(App),function(e){"use strict";function t(e){this.el=document.createElement("DIV"),this.el.className="popup",this.collection=e.collection,this.model=e.model,this.table=e.table,this.addFormListeners(this.el)}t.prototype.template=function(e,t){var n=document.createElement("DIV");n.className="form";var i=document.createElement("H3");i.textContent="Add New Client",n.appendChild(i);var o=document.createElement("LABEL");o.setAttribute("for","name-input"),o.textContent="Enter client Name",n.appendChild(o);var a=document.createElement("INPUT");a.setAttribute("type","text"),a.value=t.name||"",a.id="name-input",n.appendChild(a);var l=document.createElement("LABEL");l.setAttribute("for","phone-input"),l.textContent="Enter client Phone",n.appendChild(l);var s=document.createElement("INPUT");s.setAttribute("type","text"),s.value=t.phone||"",s.id="phone-input",n.appendChild(s);var r=document.createElement("LABEL");r.setAttribute("for","email-input"),r.textContent="Enter client Email",n.appendChild(r);var d=document.createElement("INPUT");d.setAttribute("type","email"),d.value=t.email||"",d.id="email-input",n.appendChild(d);var c=document.createElement("LABEL");c.setAttribute("for","date-input"),c.textContent="Enter estimated time",n.appendChild(c);var h=document.createElement("INPUT");h.setAttribute("type","date"),h.value=t.date||"",h.id="date-input",n.appendChild(h);var p=document.createElement("DIV");p.className="button-group";var u=document.createElement("BUTTON");u.className="add-btn",u.textContent="Add",p.appendChild(u);var m=document.createElement("BUTTON");m.className="edit-btn",m.textContent="Save",m.style.display="none",p.appendChild(m);var v=document.createElement("BUTTON");v.className="cancel-btn",v.textContent="Cancel",p.appendChild(v),n.appendChild(p),e.appendChild(n)},t.prototype.render=function(){return this.template(this.el,this.model),this.cacheSelectors(),this.el},t.prototype.addFormListeners=function(e){e.addEventListener("click",this.formEventHandler.bind(this))},t.prototype.formEventHandler=function(e){this.cacheSelectors(),"add-btn"===e.target.className&&this.addNewClient(),"cancel-btn"===e.target.className&&this.clearForm(),"edit-btn"===e.target.className&&this.saveEdit()},t.prototype.cacheSelectors=function(){this.name=document.getElementById("name-input"),this.phone=document.getElementById("phone-input"),this.email=document.getElementById("email-input"),this.date=document.getElementById("date-input")},t.prototype.saveEdit=function(){this.model.name=this.name.value,this.model.phone=this.phone.value,this.model.email=this.email.value,this.model.date=this.date.value||this.model.date,this.table.tBody.render(),this.clearForm()},t.prototype.addNewClient=function(){var e=this.collection.length+1,t={id:e,name:this.name.value,phone:this.phone.value,email:this.email.value,date:this.date.value||"2030"};this.table.addClient(t),this.clearForm()},t.prototype.clearForm=function(){this.name.value="",this.phone.value="",this.email.value="",this.date.value="",this.removePopup()},t.prototype.removePopup=function(){var e=document.querySelector(".popup");document.body.removeChild(e)},e.Views.FormView=t}(App),function(e){"use strict";function t(e){this.el=document.createElement("THEAD"),this.el.className="tableHeader",this.collection=e.collection,this.sortBy=e.sortBy,this.reverse=e.reverse,this.table=e.table,this.render(),this.addHeaderListeners.call(this)}t.prototype.templ=function(e){var t=document.createElement("TR"),n=document.createDocumentFragment(),i=document.createElement("TH");i.id="id",i.dataset.sortBy="id",i.textContent="ID",n.appendChild(i);var o=document.createElement("TH");o.id="name",o.dataset.sortBy="name",o.textContent="Name",n.appendChild(o);var a=document.createElement("TH");a.id="phone",a.dataset.sortBy="phone",a.textContent="Phone",n.appendChild(a);var l=document.createElement("TH");l.id="email",l.dataset.sortBy="email",l.textContent="Email",n.appendChild(l);var s=document.createElement("TH");s.id="date",s.dataset.sortBy="date",s.textContent="Estimated time",n.appendChild(s);var r=document.createElement("TH");r.id="delete",r.textContent="Delete",n.appendChild(r);var d=document.createElement("TH");d.id="edit",d.textContent="Edit",n.appendChild(d),t.appendChild(n),e.appendChild(t)},t.prototype.render=function(){return this.templ(this.el),this},t.prototype.addHeaderListeners=function(){this.el.addEventListener("click",this.headerFilterHandler.bind(this))},t.prototype.headerFilterHandler=function(e){function t(){for(var t=e.target.parentElement.children,n=0;n<t.length;n++)t[n].classList.remove("active")}return"TH"===e.target.tagName&&"delete"!==e.target.id&&"edit"!==e.target.id&&void("active"===e.target.className?this.table.tBody.triggerEvent("reverse"):(t(),e.target.classList.add("active"),this.table.tBody.triggerEvent("columnSort",e.target.dataset.sortBy)))},e.Views.HeaderItem=t}(App),function(e){"use strict";function t(e){var t=new App.Views.AppLayout({collection:e});t.render()}function n(){var n=new XMLHttpRequest;n.open("GET","http://localhost:4000/listUsers",!0),n.send(),n.onreadystatechange=function(){if(4===this.readyState)if(this.status>=200&&this.status<300){var i=JSON.parse(n.responseText);App.Collections.clients=i.slice(0,6),t(App.Collections.clients)}else e.alert("error: "+(this.status?this.statusText:"problems with request"))}}function i(){n()}document.addEventListener("DOMContentLoaded",i)}(window),function(e,t){"use strict";function n(t){this.collection=t.collection,this.table=new e.Views.TableView({collection:this.collection}),this.tBody=this.table.tBody,this.button=document.createElement("BUTTON"),this.tBody.addEventListener("edit",this.editModel.bind(this)),this.tBody.el.addEventListener("scroll",this.scrollHandler.bind(this)),this.loadingSettings={loadingInProgress:!1,page:0,pageSize:5,totalItems:12,allPagesLoaded:!1}}n.prototype.scrollHandler=function(){clearTimeout(this.scrollTimerId);var e=this;this.scrollTimerId=setTimeout(function(){e.loadingSettings.loadingInProgress||e.tBody.el.scrollHeight-(e.tBody.el.scrollTop+e.tBody.el.offsetHeight)<=336&&(!e.loadingSettings.totalItems||e.loadingSettings.totalItems>(e.loadingSettings.page+1)*e.loadingSettings.pageSize?(e.loadingSettings.page++,e.loadClients(e.loadingSettings)):e.loadingSettings.allPagesLoaded=!0)},200)},n.prototype.loadClients=function(e){function n(){if(4===this.readyState)if(this.status>=200&&this.status<300){var n=JSON.parse(this.responseText);n=n.splice(e.pageSize*e.page+1,5),i.addAjaxClients(n)}else t.alert("error: "+(this.status?this.statusText:"problems with request"))}var i=this,o=new XMLHttpRequest;o.open("GET","http://localhost:4000/listUsers",!0),o.send(),o.onreadystatechange=n.bind(o)},n.prototype.addAjaxClients=function(e){var t=this;e.forEach(function(e){t.collection.push(e)}),this.tBody.render()},n.prototype.createButton=function(){return this.button.className="addClient",this.button.textContent="Add Client",this.button.addEventListener("click",this.addClient.bind(this)),this.button},n.prototype.addClient=function(){var t=document.querySelector(".popup");if(t)return!1;var n=new e.Views.FormView({collection:this.collection,table:this.table,model:{}});document.body.appendChild(n.render())},n.prototype.render=function(){document.body.appendChild(this.table.render()),document.body.appendChild(this.createButton())},n.prototype.editModel=function(t){function n(){var e=document.querySelector(".popup");e.querySelector("h3").textContent="Edit Client",e.querySelector(".add-btn").style.display="none",e.querySelector(".edit-btn").style.display="inline"}var i=document.querySelector(".popup");if(i)return!1;var o=new e.Views.FormView({collection:this.collection,table:this.table,model:t});document.body.appendChild(o.render()),n()},e.Views.AppLayout=n}(App,window),function(e){"use strict";function t(e){this.el=document.createElement("TR"),this.el.className="client",this.model=e.model,this.el.dataset.id=this.model.id,this.id=this.model.id,this.collection=e.collection,this.render()}t.prototype.templ=function(t,n){var i=document.createDocumentFragment(),o=document.createElement("TD");o.className="client-id",o.textContent=n.id,i.appendChild(o);var a=document.createElement("TD");a.className="client-name",a.textContent=n.name,i.appendChild(a);var l=document.createElement("TD");l.className="client-phone",l.textContent=n.phone,i.appendChild(l);var s=document.createElement("TD");s.className="client-email",s.textContent=n.email,i.appendChild(s);var r=document.createElement("TD");r.className="client-date",this.date=new e.Views.EstimatedDateElement(this.model.date,r),i.appendChild(this.date.el);var d=document.createElement("TD");d.className="client-delete";var c=document.createElement("BUTTON");c.className="delClient",c.textContent="Delete client",d.appendChild(c),i.appendChild(d);var h=document.createElement("TD");h.className="edit-element";var p=document.createElement("BUTTON");p.className="editClient",p.textContent="Edit client",h.appendChild(p),i.appendChild(h),t.appendChild(i)},t.prototype.render=function(){return this.templ(this.el,this.model),this},t.prototype.destroy=function(){this.date.stop(),this.el.parentElement.removeChild(this.el)},e.Views.RowItem=t}(App),function(e){"use strict";function t(t){e.Views.EventCollection.call(this),this.el=document.createElement("TBODY"),this.el.className="tableBody",this.collection=t.collection,this.table=t.table,this.rowItems=[],this.el.addEventListener("click",this.delEditHandlers.bind(this)),this.addEventListener("reverse",this.reverse.bind(this)),this.addEventListener("columnSort",this.sort.bind(this)),this.render()}t.prototype=Object.create(e.Views.EventCollection.prototype),t.prototype.clearTBody=function(){this.el.innerHTML="",this.rowItems.length=0},t.prototype.render=function(){if(this.clearTBody(),0===this.collection.length)this.el.innerHTML='<tr class="dummy"><td colspan ="7">There is no more clients</td></tr>';else{var t=this,n=document.createDocumentFragment();this.collection.forEach(function(i){var o=new e.Views.RowItem({model:i,collection:t.collection});t.rowItems.push(o),n.appendChild(o.el)}),this.el.appendChild(n)}return this.el},t.prototype.reverse=function(){this.collection.reverse(),this.render()},t.prototype.sort=function(e){switch(e){case"id":this.collection.sort(function(t,n){return+t[e]-+n[e]});break;case"date":this.collection.sort(function(t,n){var i=Date.parse(t[e]),o=Date.parse(n[e]);return i-o});break;default:this.collection.sort(function(t,n){return t[e]>n[e]?1:-1})}this.render()},t.prototype.delEditHandlers=function(e){if("delClient"===e.target.className&&this.deleteRow(e),"editClient"===e.target.className){var t=e.target.closest("TR"),n=this.findColIndex(t),i=this.collection[n];this.triggerEvent("edit",i)}},t.prototype.deleteRow=function(e){var t=e.target.closest("TR");if("delClient"!==e.target.className)return!1;var n=this.findColIndex(t);if(this.collection.splice(n,1),0===this.collection.length)this.render();else{var i=this.findRowIndex(t);this.rowItems[i].destroy(),this.rowItems.splice(i,1)}},t.prototype.findRowIndex=function(e){var t;return this.rowItems.forEach(function(n,i){+e.dataset.id===n.model.id&&(t=i)}),t},t.prototype.findColIndex=function(e){var t;return this.collection.forEach(function(n,i){+e.dataset.id===n.id&&(t=i)}),t},e.Views.TableBody=t}(App),function(e){"use strict";function t(t){this.el=document.createElement("TABLE"),this.el.className="list",this.collection=t.collection,this.rowItems=[],this.tBody=new e.Views.TableBody({collection:this.collection,table:this}),this.header=new e.Views.HeaderItem({collection:this.collection,table:this})}t.prototype.addClient=function(e){this.collection.push(e),this.tBody.render()},t.prototype.render=function(){return this.createCaption(),this.el.appendChild(this.header.el),this.el.appendChild(this.tBody.render()),this.el},t.prototype.createCaption=function(){var e=document.createElement("CAPTION");e.textContent="Clients List",this.el.appendChild(e)},e.Views.TableView=t}(App);
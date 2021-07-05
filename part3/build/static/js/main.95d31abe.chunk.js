(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{39:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var r=n(15),c=n.n(r),a=n(6),i=n(3),d=n(1),u=n(0),o=function(e){return Object(u.jsx)(u.Fragment,{children:Object(u.jsxs)("form",{onSubmit:e.handleSubmit,children:[Object(u.jsx)("table",{children:Object(u.jsxs)("tbody",{children:[Object(u.jsxs)("tr",{children:[Object(u.jsx)("td",{children:"name:"}),Object(u.jsx)("td",{children:Object(u.jsx)("input",{value:e.new_name,onChange:e.handleNameChange})})]}),Object(u.jsxs)("tr",{children:[Object(u.jsx)("td",{children:"number:"}),Object(u.jsx)("td",{children:Object(u.jsx)("input",{value:e.new_number,onChange:e.handleNumberChange})})]})]})}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{type:"submit",children:"add"})})]})})},l=function(e){return Object(u.jsxs)("tr",{children:[Object(u.jsx)("td",{children:e.name}),Object(u.jsx)("td",{children:e.number}),Object(u.jsx)("td",{children:Object(u.jsx)("button",{onClick:e.handleDelete,id:e.id,children:"delete"})})]})},s=function(e){return"EMPTY"===e.filtered_persons?Object(u.jsx)("p",{children:"No person found"}):0!==e.filtered_persons.length?Object(u.jsx)("table",{children:Object(u.jsx)("tbody",{children:e.filtered_persons.map((function(t){return Object(u.jsx)(l,{name:t.name,number:t.number,handleDelete:e.handleDelete,id:t.id},t.id)}))})}):Object(u.jsx)("table",{children:Object(u.jsx)("tbody",{children:e.persons.map((function(t){return Object(u.jsx)(l,{name:t.name,number:t.number,handleDelete:e.handleDelete,id:t.id},t.id)}))})})},b=function(e){return Object(u.jsxs)(u.Fragment,{children:["filter shown with: ",Object(u.jsx)("input",{onChange:e.handleFilterChange,value:e.name_filter})]})},j=n(4),h=n.n(j),m="/api/persons",f={getAll:function(){return h.a.get(m)},create:function(e){return h.a.post(m,e)},update:function(e,t){return h.a.put("".concat(m,"/").concat(e),t)},remove:function(e){return h.a.delete("".concat(m,"/").concat(e))}},O=function(e){var t=e.message,n=e.msgType;if(null===t)return null;var r={background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10};return"success"===n?r.color="green":"error"===n&&(r.color="red"),Object(u.jsx)("div",{style:r,children:t})},p=function(){var e=Object(d.useState)([]),t=Object(i.a)(e,2),n=t[0],r=t[1],c=Object(d.useState)(""),l=Object(i.a)(c,2),j=l[0],h=l[1],m=Object(d.useState)(""),p=Object(i.a)(m,2),x=p[0],g=p[1],v=Object(d.useState)(""),w=Object(i.a)(v,2),y=w[0],C=w[1],S=Object(d.useState)([]),_=Object(i.a)(S,2),k=_[0],D=_[1],N=Object(d.useState)(null),T=Object(i.a)(N,2),F=T[0],A=T[1],E=Object(d.useState)(null),P=Object(i.a)(E,2),B=P[0],J=P[1];Object(d.useEffect)((function(){f.getAll().then((function(e){r(e.data)}))}),[]);return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("h1",{children:"Phonebook"}),Object(u.jsx)(O,{message:F,msgType:B}),Object(u.jsx)(b,{handleFilterChange:function(e){var t=e.target.value;if(C(t),0!==t.length){var r=n.filter((function(e){return e.name.toUpperCase().includes(t.toUpperCase())}));0===r.length?D("EMPTY"):D(r)}else D([])},name_filter:y}),Object(u.jsx)("h1",{children:"Add a new"}),Object(u.jsx)(o,{handleSubmit:function(e){e.preventDefault(),J("success");var t=n.find((function(e){return e.name===j}));if(t){if(window.confirm("".concat(j," is already added to phonebook, replace the old number with the new one?"))){var c=Object(a.a)(Object(a.a)({},t),{},{number:x});f.update(c.id,c).then((function(e){r(n.map((function(t){return t.id!==c.id?t:e.data}))),h(""),g(""),C(""),D([]),A("".concat(e.data.name,"'s number has been updated with ").concat(e.data.number))})).catch((function(e){J("error"),A("".concat(c.name," has already been removed")),r(n.filter((function(e){return e.id!==c.id})))}))}}else{var i={name:j,number:x};f.create(i).then((function(e){r(n.concat(e.data)),h(""),g(""),C(""),D([]),A("".concat(e.data.name," added"))}))}setTimeout((function(){A(null)}),5e3)},handleNameChange:function(e){h(e.target.value)},new_name:j,handleNumberChange:function(e){g(e.target.value)},new_number:x}),Object(u.jsx)("h1",{children:"Numbers"}),Object(u.jsx)(s,{persons:n,filtered_persons:k,handleDelete:function(e){J("error");var t=e.target.getAttribute("id"),c=n.find((function(e){return e.id===t}));window.confirm("Delete ".concat(c.name,"?"))&&f.remove(t).then((function(e){r(n.filter((function(e){return e.id!==t}))),A("".concat(c.name," deleted"))})),setTimeout((function(){A(null)}),5e3)}})]})};n(39);c.a.render(Object(u.jsx)(p,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.95d31abe.chunk.js.map
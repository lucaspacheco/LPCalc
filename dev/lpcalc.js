function LPCalc(selector){ 
 	this.d = document; // document
    this.init(selector);
}
LPCalc.prototype.init = function(selector){
    this.r = document.querySelector(selector); // root element
    this.valueHistory = []; // record of operations
    this.currentValue = 0; // Last Result
    this.inputValue = null; // The typed value
    this.opStatus = null; // The operation to be executed
    this.build();
};
LPCalc.prototype.build = function(){
	this.createValue()
		.createControls()
		.initOperations();
};
LPCalc.prototype.createValue = function(){
	this.r.className += ' lpcalc';
	var bvh = this.r.querySelector('[data-calc-history="true"]') !== null ? true : false; // does user has his own built value history?
	var bvi = this.r.querySelector('[data-calc-input="true"]') !== null ? true : false; // does user has his own built value input?
	if (bvh == false || bvi == false ) {
		var vF = this.d.createElement('div'); // Value Div
		vF.className = 'val';
		vF.setAttribute('id','valueDiv');
		if (bvh == false ){
			var vH = this.d.createElement('div'); // Interface record of operations
			vH.className = 'val-history';
			vH.setAttribute('data-calc-history','true');
			vF.appendChild(vH);
		}
		if (bvi == false ) {
			var vI = this.d.createElement('input'); // Value input field
			vI.setAttribute('type','text');
			vI.setAttribute('id','valInput');
			vI.placeholder = 0;
			vI.setAttribute('data-calc-input','true');
			vF.appendChild(vI);
		}
		this.r.appendChild(vF);
	}
	this.historyField = this.r.querySelector('[data-calc-history="true"]');
	this.valueField = this.r.querySelector('[data-calc-input="true"]');
	return this;
};
LPCalc.prototype.createControls = function(){
	var bct = this.r.querySelector('[data-controls="true"]') !== null ? true : false; 
	var bco = this.r.querySelector('[data-operations="true"]') !== null ? true : false; 
	var bcn = this.r.querySelector('[data-numpad="true"]') !== null ? true : false; 
	var operations = [ // Operations
		['add','+'], 
		['sub','-'], 
		['mul','x'],
		['div','/'],
		['exp','x<sup>y</sup>','^'],
		['clr','c'],
		['res','=']
	];
	if(bco == false) {
		bco = this.d.createElement('ul'); // Operations list
		bco.className = 'ops';
		bco.append = true;
	}
		bco.setAttribute('data-operations','true');
		for (i = 0; i < operations.length; i += 1) {
			var bop = this.r.querySelector('[data-operation="'+operations[i][0]+'"]') !== null ? true : false;
	        if(bop == false) {
	        	var op = this.d.createElement('li');
			        op.className = operations[i][0];
			    var bt = this.d.createElement('button');
			    	bt.setAttribute('type','button');
			    	bt.className = 'op-btn';
			    	bt.setAttribute('data-operation',operations[i][0]);
			    	bt.setAttribute('data-op-signal',(operations[i][2]!== undefined?operations[i][2]:operations[i][1]));
			    	bt.innerHTML = operations[i][1];
			    op.appendChild(bt);
			    bco.appendChild(op);
			} else {
				bop.setAttribute('data-operation',operations[i][0]);
			}
	    }
	if(bcn == false) {
    	bcn = this.d.createElement('ul'); // Numeric keypad
    	bcn.className ='numPad';
    	bcn.append = true;
	}
	    bcn.setAttribute('data-numpad','true');
	    for (i = 0; i < 10; i += 1) {
	    	var bop = this.r.querySelector('[data-digit="'+(9-i)+'"') !== null ? true : false;
		    if(bop == false) {
		    	var num = this.d.createElement('li');
		    		num.className = 'num n-'+(9-i);

		    	var bt = this.d.createElement('button');
			    	bt.setAttribute('type','button');
			    	bt.className = 'num-btn';
			    	bt.setAttribute('data-digit',(9-i));
			    	bt.innerHTML = 9-i;
			    num.appendChild(bt);
			    bcn.appendChild(num);
			}
	    }
	    var bop = this.r.querySelector('[data-digit="."') !== null ? true : false;
	    if(bop == false) { 
	    	var num = this.d.createElement('li');
	    		num.className = 'num n-dot';
	    	var bt = this.d.createElement('button');
		    	bt.setAttribute('type','button');
		    	bt.className = 'num-btn';
		    	bt.setAttribute('data-digit','.');
		    	bt.innerHTML = '.';
		    num.appendChild(bt);
		    bcn.appendChild(num);
		}

	if (bct == false ) {
		var cts = this.d.createElement('nav'); // Controls Nav
		cts.setAttribute('id','ctrl');
		cts.className = 'ctrl';
		cts.setAttribute('data-controls','true');
		if(bco.append==true){cts.appendChild(bco);}
	    if(bcn.append==true){cts.appendChild(bcn);}
		this.r.appendChild(cts);
	} else {
		if(bco.append==true){cts.appendChild(bco);}
	    if(bcn.append==true){cts.appendChild(bcn);}
	}
	this.controls = this.r.querySelector('[data-calc-controls="true"]');
	this.operations = operations;
	this.digits = this.r.querySelectorAll('[data-digit]');
	return this;
};
LPCalc.prototype.initOperations = function(){
	self = this;
	for (i = 0; i < self.operations.length; i += 1) {
	    self.r.querySelector('[data-operation="'+self.operations[i][0]+'"]').onclick = function(e){
	    	e.preventDefault();
	    	self.doOperation(this.getAttribute('data-operation'),this.getAttribute('data-op-signal'));
        }
    }
    for (i = 0; i < self.digits.length; i += 1) {
	    self.digits[i].onclick = function(e){
	    	e.preventDefault();
	    	self.addDigit(this.getAttribute('data-digit'));
        }
    }
    self.r.onkeypress = function(e){ 
    	e.preventDefault();
    	switch(e.charCode) {
    		case 43: // +
    			self.doOperation('add');
    			break;
    		case 45: // -
    			self.doOperation('sub');
    			break;
    		case 42: // *
    			self.doOperation('mul');
    			break;
    		case 47: // /
    			self.doOperation('div');
    			break;
    		case 121: // /
    			self.doOperation('exp');
    			break;
    		case 61: // =
				e.preventDefault();
				self.doOperation('res');
				break;
    		default:
    			if(e.charCode >= 48 && e.charCode <= 57) { // number
	    			self.addDigit(e.key)
	    		}
	    		if ( e.charCode == 44 || e.charCode == 46 ) {
	    			if(self.valueField.value.match(/[\.\,]/g) == null) { //If we already have an decimal mark, deny the second.
						self.addDigit(e.key)
					}
	    		}
    			switch (e.keyCode)  {
	    			case 13:
	    			case 61:
	    				e.preventDefault();
	    				self.doOperation('res');
	    			break;
	    		}
    			break;
    	}
    }
    return this;
};
LPCalc.prototype.addDigit = function(digit){
	self.valueField.value += digit;
	self.valueField.setAttribute('data-ready','true');
}
LPCalc.prototype.doOperation = function(op,opSignal){
	if (op == 'clr') {  // resets the calc
		self.valueHistory = [];
		self.historyField.innerHTML = '';
	    self.currentValue = 0;
	    self.optStatus = null;
		self.inputValue = null;
		self.valueField.placeholder = self.currentValue;
		self.valueField.value = '';
		self.valueField.removeAttribute('data-ready');
	    return false;
	}
	if (self.valueField.getAttribute('data-ready') !== undefined) { //if the value field is ready to pass value
		if (self.optStatus == null) { 
			/* if we dont have an operation, but have an number, this probably means that user typed the first variable.
			 * So, we need to save the operation type and wait the other variable. that way, we pass "input" as "current" and resets "input"
			 */
			self.optStatus = op == 'res' ? null : op; 
			self.opSignal = opSignal;
			self.currentValue = self.valueField.getAttribute('data-ready') == undefined ? self.currentValue : Number(self.valueField.value.replace(/,/g, '.')); 

			self.valueField.placeholder = self.currentValue;
			self.valueField.value = '';
			self.valueField.removeAttribute('data-ready'); // Lock operations until we have the second variable
			return false 
		}
		self.inputValue = Number(self.valueField.value.replace(/,/g, '.'));
		self.valueHistory.push([self.currentValue,self.optStatus,self.inputValue]);
		self.historyField.innerHTML = self.historyField.innerHTML == "" ? self.currentValue : self.historyField.innerHTML;
		self.historyField.innerHTML = self.historyField.innerHTML +" <span class='op'>"+ self.opSignal +"</span> "+ self.inputValue;
		switch(self.optStatus){
			case 'add':
				self.currentValue = self.currentValue + self.inputValue;
				break;
			case 'sub':
				self.currentValue = self.currentValue - self.inputValue;
				break;
			case 'mul':
				self.currentValue = self.currentValue * self.inputValue;
				break;
			case 'div':
				self.currentValue = self.currentValue / self.inputValue;
				break;
			case 'exp':
				self.currentValue = Math.pow(self.currentValue, self.inputValue);
				break;
			default:
				self.historyField.innerHTML = '';
				break;
		}
		self.optStatus = null;
		self.inputValue = null;
		self.valueField.placeholder = self.currentValue;
		self.valueField.value = '';
		self.valueField.removeAttribute('data-ready'); //Deny duplicate operations by mistake
	} else {
		self.optStatus = op == 'res' ? null : op; 
		self.opSignal = opSignal;
		self.currentValue = self.valueField.getAttribute('data-ready') == undefined ? self.currentValue : Number(self.valueField.value.replace(/,/g, '.'));
	}
};
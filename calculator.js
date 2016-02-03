function Calculator() {
    this.postFix = [0];
    this.intFixToPostFixStr =[];
    this.DoSomething = function() {
        console.log("I DID SOMETHING");
    };

    this.ProcessPostfix = function(postfixString) {
        for (i = 0; i < postfixString.length; i++) {
            console.log("Proccessing char:" + postfixString[i]);
        }
    };


    this.isOperand = function (infixStrinput) {
        return (!this.isOperator(infixStrinput) ? true : false);
    }

    this.isOperator = function(infixStrinput) {
        return ((infixStrinput == "+") || (infixStrinput == "-") || (infixStrinput == "*") || (infixStrinput == "/") ? true : false);
    }

    this.isEmpty = function(inputStr)
    {
        return ( (inputStr.length == 0 )? true : false);
    }

    this.postfixinterpreter = function(postFixStr) {
        this.postFix = [0];
        for(var i = 0; i < postFixStr.length ; i++){
            
            if(postFixStr[i] == ","){
                this.postFix.push(0);
            }  else if(this.isOperand(postFixStr[i])) {
                var prevValue = this.postFix.pop();
                this.postFix.push(prevValue*10 + (postFixStr[i] - '0'));
            }  else {
                // Is this the correct way to do it? since my first one is always going to be zero
                this.postFix.pop();
                var firstInt = this.postFix.pop();
                var secondInt = this.postFix.pop();
                var operationResult = this.operation(firstInt, secondInt , postFixStr[i])
                this.postFix.push(operationResult);
            }
        }
        
        return this.postFix;
        
    }
    this.operation = function(firstInt, secondInt, operator) {

        if (operator == "+") {
            return firstInt + secondInt;
        }
        if (operator == "-") {
            return secondInt - firstInt;
        }
        if (operator == "*") {
            return firstInt * secondInt;
        }
        if (operator == "/") {
            return secondInt/firstInt ;
        }

    }
    this.operationOrder = function(prevOperator, secondInputOperator){
        // return T if the firstInO
        var fistOpre =0 ;
        var secondOpre =0 ;
        if(prevOperator == "+" || prevOperator == "-" ) 
            {fistOpre = 0;}
             else{ fistOpre = 1;}    
        if(secondInputOperator == "+" || secondInputOperator == "-" ) 
            {secondOpre = 0;}
            else{secondOpre = 1;}   
        return ( fistOpre >= secondOpre ? true: false) ;  
        
    }

    this.intFixToPostFix = function(infixequation){
        var resultStr = '';
        this.intFixToPostFixStr = [" "];
        this.intFixToPostFixStr.pop();
        //var str = '';
        for (var i = 0; i < infixequation.length ; i++){
            var currentOper = infixequation[i];
            if(this.isOperand(currentOper)){
                resultStr+= currentOper ;
            } else {
                    resultStr += ',';
                if(this.isEmpty(this.intFixToPostFixStr)){ 
                    this.intFixToPostFixStr.push(currentOper);
                }
                else{
                   // this.intFixToPostFixStr.push(currentOper);
                   var prevOper = this.intFixToPostFixStr.pop();
                   if(this.operationOrder(prevOper, currentOper)){
                        resultStr += prevOper + ',' ;
                        this.intFixToPostFixStr.push(currentOper);
                   } else{
                        this.intFixToPostFixStr.push(prevOper);
                        this.intFixToPostFixStr.push(currentOper);
                   }
                }

            }

    }

    while(!this.isEmpty(this.intFixToPostFixStr)){
        resultStr += ',' + this.intFixToPostFixStr.pop() ;
    }

    return resultStr;
}
}




var myCalculator = new Calculator();
let answer = 0;
let prev_op = null;
let last = null;
let temp = null;
let point_clicked = 0;

function calculation()
{

    switch(last)
    {
        
        case '+':
            answer = answer + temp;
            isFloat(answer) ? answer.toFixed(2): answer=answer;
            last = '';
            temp = null;
            break;
        
        case '-':
            answer = answer - temp;
            answer = answer.toFixed(2);
            last = '';
            temp = null;
            break;
        
        case 'x':
            answer = answer * temp;
            answer = answer.toFixed(2);
            last = '';
            temp = null;
            break;
        
        case '÷':
            answer = answer / temp;
            answer = answer.toFixed(2);
            last = '';
            temp = null;
            break;

        default:
            answer = temp;
            temp = null;
    }
}

function process_data(value)
{
    console.log(12335);
    // If the input is a operation symbol i.e +,*,-,/ etc.
    if(typeof(value)=='string')
    {
        // If some operations have already been performed
        if(last!=null)
        {
            prev_op = value;
            calculation();
            last = value;
        }
        // If no operations have been performed yet and we are just dealing with numbers
        else
        {
            if(answer==null || answer==0)
            {
                answer = temp;
                temp = null;
            }
            
            prev_op = value;
            last = value;
        }
    }
    // If the input is a number
    else
    {
        // If a new number is entered and previous input was also number so we make 8 and 9 to 89
        if(typeof(prev_op)=='number')
        {
            temp = (temp * 10) + value;
        }
        // If previous operation was a symbol or empty then we just store the number for future
        else
        {
            temp = value;
        }

        prev_op = value;
    }
}


function addDisplay(value)
{
    // Check if the input is empty and prevent use of operation
    if(typeof(value)=='string' && (prev_op==null || typeof(prev_op)=='string'))
    {
        return;
    }

    // Clear the input if after calculating an answer a new digit is used
    if(last=='' && typeof(value)=='number')
    {
        document.getElementById('display_top').value = value;
        answer = null;
        last = null;
        prev_op = null;
        temp = null;
    }
    else if(last=='' && value=='.')
    {
        return;
    }
    // If the input present is simple numbers we add new numbers after them
    else if(typeof(value)=='number' || value=='.')
    {
        document.getElementById('display_top').value += value;
    }
    // If the input present is just numbers or result of expression we print symbol after that
    else
    {
        document.getElementById('display_top').value += ' '+value+' ';
    }
    
    //For every button pressed we perform necessary processing
    if(point_clicked==0 && value=='.')
    {
        point_clicked = 1;
    }
    else if(point_clicked==1 && typeof(value)=='number')
    {
        decimal(value);
    }
    else if(point_clicked==1 && typeof(value)=='string')
    {
        if(value=='.')
        {
            return;
        }

        if(last!='')
        {
            calculation();
        }
        point_clicked = 0;
        process_data(value);
    }
    else
    {
        process_data(value);
    }
    
}

function specialDisplay(code)
{
    // If the input is empty we cant process the special functions on them
    if(document.getElementById('display_top').value=='')
    {
        return;
    }

    //If process different functions based on the request made
    if(code=='101')
    {
        // If last is '' means that the result of previous calculation has already been made 
        // and the content of input can be directly processed
        if(last=='')
        {
            answer = Math.pow(answer,2);
            document.getElementById('display_top').value = answer;
            temp = answer;
        }
        // If no operation has been applied yet and answer variable wont have any value
        else if(last==null)
        {
            answer = Math.pow(temp,2);
            document.getElementById('display_top').value = answer;
            temp = answer;
        }
        // If last is not empty it means that first the expression needs to be calculated then its square can be found
        else if(last!='' && typeof(prev_op)!='string')
        {
            calculation();
            answer = Math.pow(answer,2);
            document.getElementById('display_top').value = answer;
            temp = answer;
        }
    }
    else if(code=='102')
    {
        // If no operation has been applied till now
        if(last==null)
        {
            // If the present input value is not zero we can devide it
            if(temp!=0)
            {
                answer = 1/temp;
                last='';
                temp = answer;
                document.getElementById('display_top').value = answer;

            }
            // Due to division by 0 it will throw an error
            else
            {
                document.getElementById('display_top').value = 'Error';
            }
        }
        // Last is '' which means that the processing has been done and answer can directly be used 
        // for division after checking if the calculated result is not 0
        else if(last=='')
        {
            if(answer==0)
            {
                document.getElementById('display_top').value = 'Error';
            }
            else
            {
                answer = 1/answer;
                document.getElementById('display_top').value = answer;
                temp = answer;
            }
        }
        // If last is non empty this means that the calculation is incomplete
        else
        {
            // So first we calculate the expression before performing operation
            calculation();

            // We check if answer is not 0 then we can perform operation
            if(answer!=0)
            {
                answer = 1/answer;
                document.getElementById('display_top').value = answer;
                temp = answer;
            }
            // If result is 0 hence we cannot perform operation
            else
            {
                document.getElementById('display_top').value = 'Error';
            }
        }
    }
    else
    {
        // For calculating the square root 
        // We first see if last is '' that means previous calculation have already been performed 
        if(last=='' && answer>=0)
        {
            answer = Math.sqrt(answer);
            document.getElementById('display_top').value = answer;
            temp = answer;
        }
        // If last is null means no operation has been performed yet
        else if(last==null && temp>=0 )
        {
            answer = Math.sqrt(temp);
            document.getElementById('display_top').value = answer;
            temp = answer;
        }
        // If last is not '' means that it has incomplete calculation and see if there is no case such as 4 + and 
        // expression to be calculated is complete and not incomplete
        else if(last!='' && typeof(prev_op)!='string')
        {
            // We first calculate the expression before moving forward
            calculation();

            if(answer>=0)
            {
                answer = Math.sqrt(answer);
                document.getElementById('display_top').value = answer;
                temp = answer;
            }
            else
            {
                document.getElementById('display_top').value = 'Error';
            }
            
        }
        else
        {
            document.getElementById('display_top').value = 'Error';
        }
    }
}

function displayResult()
{
    if(last!='' && typeof(prev_op)!='string')
    {
        calculation();
        document.getElementById('display_top').value = answer;
        temp = answer;
    }
}

function clearDisplay()
{
    location.reload();
}

function decimal(num)
{
    temp = (temp * 10) + num;
    temp = temp * 0.1;

    console.log(temp);
}


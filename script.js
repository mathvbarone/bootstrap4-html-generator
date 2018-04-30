const inputNumber = document.querySelector('.columns-number-input');
const generateButton = document.querySelector('.generate-button');
const cleanButton = document.querySelector('.clean-button');
const example = document.querySelector('.example');
const showCode = document.querySelector('.show-code');
let col;
let columns;


cleanCode = e => {
    e.preventDefault();
    showCode.innerHTML = '';
    inputNumber.value = '';
    example.innerHTML = '';
}




showExample = () => {
    col = 
`       <div class="col col-example col-${ 12 / inputNumber.value }">
        </div>
`
    columns = new Array(parseInt(inputNumber.value)).fill(col).join('');
    example.innerHTML = columns;
}
    
 
generateCode = e => {
e.preventDefault();
            
if(inputNumber.value <= 12 ){
    showExample();
        col = 
    `   <div class="col col-${ 12 / inputNumber.value }">
        </div>
    `
    const openRow = [
    `    <div class="row">
    `];
    columns = new Array(parseInt(inputNumber.value)).fill(col);
    const closeRow = [
    `</div>
    `];
    const code = openRow.concat(columns, closeRow).join('');

    showCode.innerHTML = code;
    inputNumber.value = '';
    } else {
        alert('Max 12 columns')
    }
}

    




generateButton.addEventListener('click', generateCode);
cleanButton.addEventListener('click', cleanCode);

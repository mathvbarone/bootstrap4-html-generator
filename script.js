
(() => {
    const inputNumber = document.querySelector('.columns-number-input');
    const generateButton = document.querySelector('.generate-button');
    const cleanButton = document.querySelector('.clean-button');
    const example = document.querySelector('.example');
    const showCode = document.querySelector('.show-code');
    const columnsSpace = document.querySelector('.columns-space');
    const columnsSpaceSet = document.querySelector('.columns-space-set');
    let col;
    let columns;
    
    cleanCode = e => {
        e.preventDefault();
        showCode.innerHTML = '';
        inputNumber.value = 'number-of-columns';
        // columnsSpace.value = 'number-of-columns'
        example.innerHTML = '';
        
    }
    
    showExample = () => {
        col = 
    `       <div class="col-example col-${ 12 / inputNumber.value }">
            </div>
    `
        columns = new Array(parseInt(inputNumber.value)).fill(col).join('');
        example.innerHTML = columns;
    }
    
    checkSpace = () => {
        if(columnsSpace.value === 'space-columns-yes') {
            columnsSpaceSet.classList.add('is-active');
        } else {
            columnsSpaceSet.classList.remove('is-active');
        }
    }

    generateCode = e => {
        e.preventDefault();
        if (inputNumber.value > 12 ){
            alert('Max 12 columns')
        } else {
            console.log(inputNumber.value % 2);
            showExample();
                col = 
            `   <div class="col-${ 12 / inputNumber.value }">
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
        }
    }
    
    // columnsSpace.addEventListener('click', checkSpace);
    generateButton.addEventListener('click', generateCode);
    cleanButton.addEventListener('click', cleanCode);
})();

(() => {
    const inputNumber = document.querySelector('.columns-number-input');
    const generateButton = document.querySelector('.generate-button');
    const cleanButton = document.querySelector('.clean-button');
    const example = document.querySelector('.example');
    const showCode = document.querySelector('.show-code');
    const columnsSpace = document.querySelector('.columns-space');
    const columnsSpaceSet = document.querySelector('.columns-space-set');
    exampleStatus = false;
    let col;
    let columns;
    
    cleanCode = e => {
        e.preventDefault();
        showCode.innerHTML = '';
        columnsSpace.checked = false;
        columnsSpaceSet.value = 'set-spaces';
        inputNumber.value = 'number-of-columns'
        example.innerHTML = '';
        columnsSpaceSet.classList.remove('is-active');
    }

    renderCol = () => {

        switch(columnsSpaceSet.value) {
            case 'space-columns-left':
                col = 
                `       <div class="col-example ml-2 col">
                        </div>
                `
                break;
            case 'space-columns-right':
                col = 
                `       <div class="col-example mr-2 col">
                        </div>
                `
                break;
            case 'space-columns-left-right':
                col = 
                `       <div class="col-example ml-2 mr-2 col">
                        </div>
                `
                break;
            default:
            col = 
            `       <div class="col-example col-${ 12 / inputNumber.value }">
                    </div>
            `
        }
        if(!exampleStatus) {
            col = col.replace('col-example', '');
        }
        console.log(col);
        return col;
    }
    
    showExample = () => {
        exampleStatus = true;
        renderCol();
        columns = new Array(parseInt(inputNumber.value)).fill(col).join('');
        example.innerHTML = columns;
    }
    
    checkSpace = () => {
        if(columnsSpace.checked) {
            columnsSpaceSet.classList.add('is-active');
        } else {
            columnsSpaceSet.classList.remove('is-active');
        }
    }

    generateCode = e => {
        e.preventDefault();
        if ( inputNumber.value === 'number-of-columns' ){
            alert('Select column value.');
        } else {
            exampleStatus = false;
            renderCol();
            showExample();
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
    
    columnsSpace.addEventListener('change', checkSpace);
    generateButton.addEventListener('click', generateCode);
    cleanButton.addEventListener('click', cleanCode);
})();
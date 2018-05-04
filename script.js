
(() => {
    const inputNumber = document.querySelector('.columns-number-input');
    const generateButton = document.querySelector('.generate-button');
    const cleanButton = document.querySelector('.clean-button');
    const example = document.querySelector('.example');
    const showCode = document.querySelector('.show-code');
    const columnsSpaceSet = document.querySelector('.columns-space-set');
    let exampleStatus = false;
    let col;
    let columns;
    
    cleanCode = e => {
        e.preventDefault();
        showCode.innerHTML = '';
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
        return col;
    }
    

    renderColumn = () => {
        columns = new Array(parseInt(inputNumber.value)).fill(col);
        columns[0] = columns[0].replace('ml-2','');
        columns[columns.length - 1] = columns[columns.length - 1].replace('mr-2','');
        return columns;
    }

    showExample = () => {
        renderCol();
        renderColumn();
        example.innerHTML = columns.join('');
    }
    


    generateCode = e => {
        e.preventDefault();
        if ( inputNumber.value === 'number-of-columns' ){
            alert('Select column value.');
        } else {
            showExample();
            renderCol();
            col = col.replace('col-example', '');
            renderColumn();
            const openRow = [
            `            <div class="row">
            `];

            const closeRow = [
            `</div>
            `];
            const code = openRow.concat(columns, closeRow).join('');
            console.log(code);
            showCode.innerHTML = code;
        }
    }
    
    generateButton.addEventListener('click', generateCode);
    cleanButton.addEventListener('click', cleanCode);
})();

(() => {
    const inputNumber = document.querySelector('.columns-number-input');
    const generateButton = document.querySelector('.generate-button');
    const cleanButton = document.querySelector('.clean-button');
    const columnsSpace = document.querySelector('.columns-space');
    const example = document.querySelector('.example');
    const showCode = document.querySelector('.show-code');
    let col;
    let columns;
    
    cleanCode = e => {
        e.preventDefault();
        showCode.innerHTML = '';
        columnsSpace.value = 'set-spaces';
        inputNumber.value = ''
        example.innerHTML = '';
    }

    renderCol = () => {

        switch (columnsSpace.value) {
            case 'space-columns-left':
            col = 
            `       <div class="col-example ml-md-2 col-md">
                    </div>
            `
            break;
            case 'space-columns-right':
            col = 
            `       <div class="col-example mr-md-2 col-md">
                    </div>
            `
            break;
            case 'space-columns-left-right':
            col = 
            `       <div class="col-example ml-md-2 mr-md-2 col-md">
                    </div>
            `
            break;
            default:
            col = 
            `       <div class="col-example col-md">
                    </div>
            `
        }
        return col;
    }
    
    renderColumn = () => {
        columns = new Array(parseInt(inputNumber.value)).fill(col);
        columns[0] = columns[0].replace('ml-md-2','');
        columns[columns.length - 1] = columns[columns.length - 1].replace('mr-md-2','');
        return columns;
    }

    showExample = () => {
        renderCol();
        renderColumn();
        example.innerHTML = columns.join('');
    }
    
    generateCode = e => {
        e.preventDefault();
        if (!inputNumber.value){
            alert('Select column value');
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
            showCode.innerHTML = code;
        }
    }
    
    generateButton.addEventListener('click', generateCode);
    cleanButton.addEventListener('click', cleanCode);
})();
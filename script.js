
(() => {
    const inputNumber = document.querySelector('.columns-number-input');
    const generateButton = document.querySelector('.generate-button');
    const cleanButton = document.querySelector('.clean-button');
    const columnsSpace = document.querySelector('.columns-space');
    const example = document.querySelector('.example');
    const showCode = document.querySelector('.show-code');
    const responsiveInput = document.querySelector('.is-responsive');
    const spaceWidthInput = document.querySelector('.space-width');
    const checkColumnsSpace = document.querySelector('.check-columns-space');
    let col;
    let columns;
    let spacerClass;
    let responsiveClass;
    let responsiveSpacer;
    
    cleanCode = e => {
        e.preventDefault();
        showCode.classList.add('is-hidden');
        columnsSpace.value = 'set-spaces';
        inputNumber.value = ''
        example.innerHTML = '';
        spaceWidthInput.classList.add('is-hidden');
        columnsSpace.classList.add('is-hidden');
        responsiveInput.checked = false;
        checkColumnsSpace.checked = false;
        showCode.innerHTML = '';
        spaceWidthInput.value = 'set-space-width';
    }
    
    showSpacesBetween = () => {
        if (checkColumnsSpace.checked) {
            spaceWidthInput.classList.remove('is-hidden');
            columnsSpace.classList.remove('is-hidden');
        } else {
            spaceWidthInput.classList.add('is-hidden');
            columnsSpace.classList.add('is-hidden');
            columnsSpace.value = 'set-spaces';
            spaceWidthInput.value = 'set-space-width';
            if (inputNumber.value) {
                generateCode();
            } 
        }
    }
    
    renderCol = exampleClass  => {
        
        exampleClass === 'isExample' ?  exampleClass = 'col-example' : exampleClass = '';
        responsiveInput.checked ? responsiveClass = 'col-md' : responsiveClass = 'col';
        responsiveInput.checked ? responsiveSpacer = '-md' : responsiveSpacer = '';

        if(spaceWidthInput.value !== 'set-space-width') {
            spaceWidth = `-${spaceWidthInput.value}`;
        } else {
            spaceWidth = '-0';
        }
               
        switch (columnsSpace.value) {
            case 'space-columns-left':
            spacerClass = `ml${responsiveSpacer}${spaceWidth}`;
            break;

            case 'space-columns-right':
            spacerClass = `mr${responsiveSpacer}${spaceWidth}`;
            break;

            case 'space-columns-left-right':
            spacerClass = `mr${responsiveSpacer}${spaceWidth} ml${responsiveSpacer}${spaceWidth}`;
            break;

            default:
            spacerClass = '';
        }
        
        col = 
        `       <div class="${responsiveClass} ${exampleClass} ${spacerClass}">
                </div>
        `
        return col;
    }
    
    renderColumn = () => {
        columns = new Array(parseInt(inputNumber.value)).fill(col);
                
        if(columns[0].indexOf('ml') !== -1) {
            columns[0] = columns[0].replace(spacerClass,'');    
        }

        if(columns[columns.length - 1].indexOf('mr') !== -1) {
            columns[columns.length - 1] = columns[columns.length - 1].replace(spacerClass,'');
        }

        return columns;
    }

    showExample = () => {
        renderCol('isExample');
        renderColumn();
        example.innerHTML = columns.join('');
    }
    
    generateCode = () => {
        if (!inputNumber.value){
            alert('Select column value');
        } else if(inputNumber.value < 0){
            inputNumber.value = '';
            alert('Only posisive numbers');
        } else {
            showCode.classList.remove('is-hidden');
            showExample();
            renderCol('notExample');
            renderColumn();
            const openRow = [
            `           <div class="row">
            `];

            const closeRow = [
            `  </div>
            `];
            const code = openRow.concat(columns, closeRow).join('');            
            showCode.innerHTML = code;
            return false;
        }
    }

    init = () => {
        checkColumnsSpace.addEventListener('change', showSpacesBetween);
        generateButton.addEventListener('click', generateCode);
        cleanButton.addEventListener('click', cleanCode);
    }

    init();
    
})();
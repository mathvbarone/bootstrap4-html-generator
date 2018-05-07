
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
    const btnCopy = document.querySelector('.btn-copy');
    let col;
    let columns;
    let spacerClass;
    let responsiveClass;
    let responsiveSpacer;
    
    cleanCode = e => {
        e.preventDefault();
        spaceWidthInput.classList.add('is-hidden');
        showCode.classList.add('is-hidden');
        columnsSpace.classList.add('is-hidden');
        btnCopy.classList.add('is-hidden');
        columnsSpace.value = 'set-spaces';
        inputNumber.value = ''
        example.innerHTML = '';
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
    
    renderColumns = () => {
        columns = new Array(parseInt(inputNumber.value)).fill(col);
                
        if(columns[0].indexOf('ml') !== -1 ) {
            columns[0] = columns[0].replace(`ml${responsiveSpacer}${spaceWidth}`,'');    
        }

        if(columns[columns.length - 1].indexOf('mr') !== -1) {
            columns[columns.length - 1] = columns[columns.length - 1].replace(`mr${responsiveSpacer}${spaceWidth}`,'');
        }

        return columns;
    }

    
    showExample = () => {
        renderCol('isExample');
        renderColumns();
        example.innerHTML = columns.join('');
    }

    copyContent = e => {
        e.preventDefault;
        if(inputNumber.value) {
            showCode.select();
            document.execCommand("Copy");
            alert('Code copied to your clipboard!');
        }

    }
    
    generateCode = () => {
        if (!inputNumber.value){
            alert('Select column value');
        } else if(inputNumber.value < 0){
            inputNumber.value = '';
            alert('Only positive numbers');
        } else {
            btnCopy.classList.remove('is-hidden');
            showCode.classList.remove('is-hidden');
            showExample();
            renderCol('notExample');
            renderColumns();
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
        btnCopy.addEventListener('click', copyContent);
    }

    init();
    
})();


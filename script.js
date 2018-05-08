
(() => {
    const fluidCol = document.querySelector('.fluid-col-input');
    const fixedCol = document.querySelector('.fixed-col-input');
    const fluidInputNumber = document.querySelector('.columns-fluid-input');
    const fixedInputNumber = document.querySelector('.columns-fixed-input');
    const generateButton = document.querySelector('.generate-button');
    const cleanButton = document.querySelector('.clean-button');
    const columnsSpace = document.querySelector('.columns-space');
    const example = document.querySelector('.example');
    const showCode = document.querySelector('.show-code');
    const responsiveInput = document.querySelector('.is-responsive');
    const spaceWidthInput = document.querySelector('.space-width');
    const checkColumnsSpace = document.querySelector('.check-columns-space');
    const generatorContent = document.querySelector('.generator-content');
    const btnCopy = document.querySelector('.btn-copy');
    const btnRows = document.querySelector('.buttons-row');
    let col;
    let columns;
    let spacerClass;
    let responsiveClass;
    let responsiveSpacer;


    toggleItem = item => {
        if(item.classList.contains('is-hidden')) {
            item.classList.remove('is-hidden');
        } else {
            item.classList.add('is-hidden');
        }
    }

    showItem = item =>  item.classList.remove('is-hidden');
    hideItem = item =>  item.classList.add('is-hidden');

    showContent = () => {
        if( fluidCol.checked || fixedCol.checked ) {
            showItem(btnRows);
            showItem(generatorContent);
        }
        fluidCol.checked ? showItem(fluidInputNumber) : hideItem(fluidInputNumber);        
        fixedCol.checked ? showItem(fixedInputNumber) : hideItem(fixedInputNumber);
    }

    
    cleanCode = e => {
        e.preventDefault();
        hideItem(spaceWidthInput);
        hideItem(showCode);
        hideItem(columnsSpace);
        hideItem(btnCopy);
        fluidInputNumber.value = ''
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
        }
    }
    
    renderCol = exampleClass  => {
        
        exampleClass === 'isExample' ?  exampleClass = 'col-example' : exampleClass = '';
        responsiveInput.checked ? responsiveClass = 'col-md' : responsiveClass = 'col';
        responsiveInput.checked ? responsiveSpacer = '-md' : responsiveSpacer = '';
        spaceWidth = `-${spaceWidthInput.value}`;
        
               
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
        columns = new Array(parseInt(fluidInputNumber.value)).fill(col);
                
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
        if(fluidInputNumber.value) {
            showCode.select();
            document.execCommand("Copy");
            alert('Code copied to your clipboard!');
        }

    }
    
    generateCode = () => {
        if (!fluidInputNumber.value){
            alert('Select column value');
        } else if(fluidInputNumber.value < 0){
            fluidInputNumber.value = '';
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
        fluidCol.addEventListener('click', showContent);
        fixedCol.addEventListener('click', showContent);
        checkColumnsSpace.addEventListener('change', showSpacesBetween);
        generateButton.addEventListener('click', generateCode);
        cleanButton.addEventListener('click', cleanCode);
        btnCopy.addEventListener('click', copyContent);
    }

    init();
    
})();


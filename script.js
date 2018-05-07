
(() => {
    const inputNumber = document.querySelector('.columns-number-input');
    const generateButton = document.querySelector('.generate-button');
    const cleanButton = document.querySelector('.clean-button');
    const columnsSpace = document.querySelector('.columns-space');
    const example = document.querySelector('.example');
    const showCode = document.querySelector('.show-code');
    const responsiveInput = document.querySelector('.is-responsive');
    const spaceWidthInput = document.querySelector('.space-width');
    let col;
    let columns;
    
    cleanCode = e => {
        e.preventDefault();
        showCode.innerHTML = '';
        columnsSpace.value = 'set-spaces';
        inputNumber.value = ''
        example.innerHTML = '';
    }

    showSpaceWidth = () => {
        if (columnsSpace.value !== 'set-spaces') {
            spaceWidthInput.classList.remove('is-hidden');
        } else {
            spaceWidthInput.classList.add('is-hidden');
        }
    }

    renderCol = exampleClass  => {

        let spacerClass;
        let responsiveClass;
        let responsiveSpacer;

        exampleClass === 'isExample' ?  exampleClass = 'col-example' : exampleClass = '';
        
        responsiveInput.checked ? responsiveClass = 'col-md' : responsiveClass = 'col';

        responsiveInput.checked ? responsiveSpacer = '-md' : responsiveSpacer = '';

        if(spaceWidthInput.value !== 'set-space-width') {
            spaceWidth = `-${spaceWidthInput.value}`;
        } else {
            spaceWidth = '';
        }
        
        
        
        switch (columnsSpace.value) {
            case 'space-columns-left':
            spacerClass = `ml${responsiveSpacer}${spaceWidth}`;
            break;

            case 'space-columns-right':
            spacerClass = `mr${responsiveSpacer}${spaceWidth}`;
            break;

            case 'space-columns-left-right':
            spacerClass = `mr${responsiveSpacer}${spaceWidth} ml${spaceResponsive}${spaceWidth}`;
            break;

            default:
            spacerClass = `${responsiveSpacer}${spaceWidth}`;
        }
        

        col = 
        `       <div class="${spacerClass} ${responsiveClass} ${exampleClass}">
                </div>
        `
        return col;
    }
    
    renderColumn = () => {
        columns = new Array(parseInt(inputNumber.value)).fill(col);
        // columns[0] = columns[0].replace('ml-md-2','');
        // columns[columns.length - 1] = columns[columns.length - 1].replace('mr-md-2','');
        return columns;
    }

    showExample = () => {
        renderCol('isExample');
        renderColumn();
        example.innerHTML = columns.join('');
    }
    
    generateCode = e => {
        e.preventDefault();
        if (!inputNumber.value){
            alert('Select column value');
        } else {
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
        }
    }
    
    columnsSpace.addEventListener('change', showSpaceWidth);
    generateButton.addEventListener('click', generateCode);
    cleanButton.addEventListener('click', cleanCode);
})();
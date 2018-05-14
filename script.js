(() => {

  // COLS VARIABLES
  const fluidFixedCol = document.querySelector('.fluid-fixed-col');
  const fluidInputNumber = document.querySelector('.columns-fluid-input');
  const fixedInputNumber = document.querySelector('.columns-fixed-input');

  // COLUMNS VARIABLES
  const columnWidth = document.querySelector('.column-width-input');
  const columnsSpace = document.querySelector('.columns-space');

  // SPACE BETWEEN COLUMNS VARIABLES
  const spaceWidthInput = document.querySelector('.space-width');

  // ALIGN
  const alignHor = document.querySelector('.align-hor');
  const alignVert = document.querySelector('.align-vert');

  // BTNS VARIABLES
  const generateButton = document.querySelector('.generate-button');
  const cleanButton = document.querySelector('.clean-button');
  const btnCopy = document.querySelector('.btn-copy');

  // EXAMPLE VARIABLES
  const example = document.querySelector('.example');
  const exampleContent = document.querySelector('.example-content');
  const showCode = document.querySelector('.show-code');

  // RESPONSIVE INPUT VARIABLE
  const responsiveInput = document.querySelector('.is-responsive');

  // REATTRIBUTABLE VARIABLES
  let input;
  let col;
  let columns;
  let code;
  let openRow;
  
  let closeRow;
  let spacerClass;
  let responsiveClass;
  let responsiveSpacer;
  let alignHorClass;
  let alignVertClass;
  let message;


  toggleItem = item => {
    if (item.classList.contains('is-hidden')) {
      item.classList.remove('is-hidden');
    } else {
      item.classList.add('is-hidden');
    }
  };

  showItem = item => item.classList.remove('is-hidden');
  hideItem = item => item.classList.add('is-hidden');


  showGapSize = () => {
    columnsSpace.value !== 'space-columns' ? showItem(spaceWidthInput) : '';
  };


  cleanCode = e => {
    e.preventDefault();
    hideItem(spaceWidthInput);
    hideItem(btnCopy);
    alignHor.value = 'set-hor-align';
    alignVert.value = 'set-vert-align';
    fluidInputNumber.value = '';
    fixedInputNumber.value = 'number-of-columns';
    columnWidth.value = 'width-of-columns';
    example.innerHTML = '';
    responsiveInput.checked = false;
    showCode.innerHTML = '';
    spaceWidthInput.value = 'set-space-width';
  };


  showContent = () => {
    fluidFixedCol.value === 'fluid-col' ? showItem(fluidInputNumber) : hideItem(fluidInputNumber);

    if (fluidFixedCol.value === 'fixed-col') {
      showItem(fixedInputNumber);
      showItem(columnWidth);
    } else {
      hideItem(columnWidth);
      hideItem(fixedInputNumber);
    }
  };


  renderCol = exampleClass => {
    exampleClass === 'isExample' ? exampleClass = 'col-example' : exampleClass = ''; 
    responsiveInput.checked ? responsiveSpacer = '-md' : responsiveSpacer = '';
    spaceWidth = `-${spaceWidthInput.value}`;

    if (responsiveInput.checked && fluidFixedCol.value === 'fluid-col') {
      responsiveClass = 'col-md';
    } else if (!responsiveInput.checked && fluidFixedCol.value === 'fluid-col') {
      responsiveClass = 'col';
    }

    if (responsiveInput.checked && fluidFixedCol.value === 'fixed-col') {
      responsiveClass = `col-md-${columnWidth.value}`;
    } else if (!responsiveInput.checked && fluidFixedCol.value === 'fixed-col') {
      responsiveClass = `col-${columnWidth.value}`;
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
        `;
    return col;
  };

  renderColumns = exampleClass => {

    renderCol(exampleClass);

    if (fluidFixedCol.value === 'fixed-col') {
      input = fixedInputNumber;
    } else if (fluidFixedCol.value === 'fluid-col') {
      input = fluidInputNumber;
    }

    columns = new Array(parseInt(input.value)).fill(col);

    if (columns[0].indexOf('ml') !== -1) {
      columns[0] = columns[0].replace(`ml${responsiveSpacer}${spaceWidth}`, '');
    }

    if (columns[columns.length - 1].indexOf('mr') !== -1) {
      columns[columns.length - 1] = columns[columns.length - 1].replace(`mr${responsiveSpacer}${spaceWidth}`, '');
    }
    return columns;
  };

  renderCode = exampleClass => {
    renderColumns(exampleClass);

    switch (alignHor.value) {
      case 'align-hor-left':
      alignHorClass = 'justify-content-start';
      break;

      case 'align-hor-right':
      alignHorClass = 'justify-content-end';
      break;

      case 'align-hor-center':
      alignHorClass = 'justify-content-center';
      break;

      default:
      alignHorClass = '';
    }

    switch (alignVert.value) {
      case 'align-vert-top':
      alignVertClass = 'align-items-start';
      break;

      case 'align-vert-bottom':
      alignVertClass = 'align-items-end';
      break;

      case 'align-vert-center':
      alignVertClass = 'align-items-center';
      break;

      default:
      alignVertClass = '';
    }

    openRow = [
      `           <div class="row col ${alignHorClass} ${alignVertClass}">
          `];

    closeRow = [
      `  </div>
          `];

    code = openRow.concat(columns, closeRow).join('');
    // code = beautify.html(htmlContent, {
    //   indent_size: 4,
    //   wrap_line_length: 100,
    //   max_preserve_newlines: 0,
    // });

    return code;
  }




  showExample = () => {
    renderCode('isExample');
    example.innerHTML = code;
  };

  copyContent = (e) => {
    e.preventDefault;
    showCode.select();
    document.execCommand('Copy');
    alert('Code copied to your clipboard!');
  };


  validateMsg = () => {
    if (fluidFixedCol.value === 'fluid-col') {
      if (!fluidInputNumber.value) {
        message = 'Select column Value';
      } else if (fluidInputNumber.value < 0) {
        message = 'Only positive numbers';
      }
      return true;
    }

    if (fluidFixedCol.value === 'fixed-col') {
      if (fixedInputNumber.value === 'number-of-columns') {
        message = 'Select column Value';
      } else if (columnWidth.value === 'width-of-columns') {
        message = 'Select Column Size';
      }      
      return true;
    }    

    return false;
  }


  generateCode = () => {
    validateMsg();
    if (message) {
      alert(`${message}`);
    } else {
      showItem(btnCopy);
      showItem(showCode);
      renderCode('notExample');
      showCode.innerHTML = code;
      return false;
    }
  };

  init = () => {
    columnsSpace.addEventListener('change', showGapSize);
    fluidFixedCol.addEventListener('click', showContent);
    generateButton.addEventListener('click', showExample);
    generateButton.addEventListener('click', generateCode);
    cleanButton.addEventListener('click', cleanCode);
    btnCopy.addEventListener('click', copyContent);
  };

  init();

})();


const wrapp = document.querySelector('.wrapper');
const btnContainer = document.querySelector('.buttonContainer');
const productBtns = document.querySelectorAll('.buttons');
const addInput = document.querySelector('.userAdd');
const addBtn = document.querySelector('.add');
const searchInput = document.querySelector('.userSearch');
const list = document.querySelector('.list');
const textContainer = document.querySelector('.textContainer');
const editableListTitle = document.querySelector('.editableListTitle');

const arrBtns = [...productBtns];
//-----------------------------------------------------------







const quantityBtnTextChange = (e) => { // funkcja sterująca jednostką miary

    if (e.target.textContent.includes('opk.') && e.target.dataset.key === e.target.parentNode.dataset.key) {
        e.target.textContent = 'szt.'
    } else if (e.target.textContent.includes('szt.') && e.target.dataset.key === e.target.parentNode.dataset.key) {
        e.target.textContent = 'opk.'
    }


}


const createButtonToCopyText = () => { // funkcja tworząca przycisk do kopiowania

    if (document.querySelectorAll('.productName').length === 1) {
        const copy = document.createElement('button')
        copy.textContent = 'Kopiuj listę do schowka'
        copy.classList.add('copy')


        wrapp.appendChild(copy)
        copy.addEventListener('click', copyTextToClipboard); //wtedy to działa i prawidłowo wyzwala funkcję kopiującą // zastanowić się czy nie trzeba tutaj przekazać tego jakoś w argumencie ? 

    }

    document.querySelectorAll('.textToFormat').forEach((productFormatArea, index) => productFormatArea.dataset.key = index);
}


const createResetButton = () => { // funkcja tworząca przycisk resetu
    if (document.querySelectorAll('.productName').length === 0) { // przez argument wypada przekazać product name zamiast querry selectora 

        const resetBtn = document.createElement('button');
        resetBtn.classList.add('reset')
        resetBtn.textContent = 'Resetuj wszystko';
        wrapp.appendChild(resetBtn)

        resetBtn.addEventListener('click', resetAplication);
    }
}
const createEditableListTitle = () => { // funkcja tworząca tytuł dla listy edytowalnej

    if (document.querySelectorAll('.productName').length === 0) {
        editableListTitle.style.display = 'block'; // ujednolicić product name przez przekazywanie w argumentach będzie wtedy czyściej


    }

}

const removeEditableListTitle = () => {

    const listArr = document.querySelectorAll('.product');
    console.log(listArr);


    if (listArr.length == 0 && document.querySelector('.editableListTitle'))
        editableListTitle.style.display = 'none'; // jak to usuwanie ogarnąć ? 

}


const removeCopyTextAndResetButton = () => { // funkcja usuwająca przyciski resetu i kopiowania do schowka


    if (editableListTitle.style.display == 'none' && document.querySelector('.copy')) {
        document.querySelector('.copy').remove(); // cnowu wypada to wszystko poprzekazywać między funkcjami przy pomocy argumentów
        document.querySelector('.reset').remove();



    }
}


const copyTextToClipboard = () => { // zbyt dużo query selectorów użyć argumentów do przekazywania między funkcjami zamiast ciągle to łapać 



    if (!textContainer.textContent) {

        document.querySelectorAll('.textToFormat').forEach(element => textContainer.innerText += `\n ${element.textContent}`);
    } else {
        textContainer.textContent = '';
        document.querySelectorAll('.textToFormat').forEach(element => textContainer.innerText += `\n ${element.textContent}`);
    }
    if (document.querySelectorAll('.productName').length >= 1) {
        document.querySelector('.copy').textContent = 'Aktualizuj schowek';
    }

    document.querySelector('.outputListTitle').style.display = 'block';

    const range = document.createRange();
    range.selectNode(textContainer);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();



    //---------------------------------------------------//

    const copyBtn = document.querySelector('.copy')
    copyBtn.addEventListener('click', copyTextToClipboard);



}


const clearClipboardAndOutputList = () => { // czyszczenie schowka i listy finalnej 
    if (!list.textContent) {
        textContainer.textContent = ''
        document.querySelector('.outputListTitle').style.display = 'none';
    };
}


const resetAplication = () => { // resetowanie wszytkich parametrów aplikacji 

    document.querySelectorAll('.product').forEach(product => product.remove());
    document.querySelector('.outputListTitle').style.display = 'none';
    removeEditableListTitle()
    removeCopyTextAndResetButton()
    addInput.value = '';
    searchInput.value = '';
    textContainer.textContent = '';

    // problem że czasami przycisk się nie usuwa


}

let valueText = '';
const addNewCustomProductToList = () => { //funkcja odpowiada za dodanie nowego customowego produktu do contanainera z przyciskami kreującymi liste

    if (confirm('Dodać produkt do listy edycji ?')) {
        console.log('działa');

        createEditableListTitle()
        createResetButton()
        if (!list.textContent.includes(addInput.value)) {
            createProductNodes(`${addInput.value} \u0020 \u0020 \u0020 \u0020 \u0020 \u0020 \u0020`)
        }
    }
    const newCustomProduct = document.createElement('button');
    newCustomProduct.classList.add('buttons');
    newCustomProduct.textContent = `${addInput.value} \u0020 \u0020 \u0020 \u0020 \u0020 \u0020 \u0020`
    valueText = newCustomProduct.textContent
    console.log(valueText);
    console.log(arrBtns);
    const comparsion = () => { // funkcja która porównuje czy nie ma takich samych produktów w liście wyborów

        const btnsContainer = [...productBtns];

        arrBtns.forEach(button => {
            if (button.textContent.toLowerCase().includes(addInput.value.toLowerCase()))
                newCustomProduct.textContent = ''
        })

        btnsContainer.forEach(btnOfProduct => {

            if (btnOfProduct.textContent.toLowerCase().includes(addInput.value.toLowerCase()))

                newCustomProduct.textContent = ''
        });
    }
    comparsion()

    if (newCustomProduct.textContent) {

        arrBtns.push(newCustomProduct)
        btnContainer.appendChild(newCustomProduct);
    } else if (!newCustomProduct.textContent) {
        alert('podaj prawidłowy produkt, którego nie ma na w puli dostępnych produktów')

    }


    document.querySelectorAll('.buttons').forEach(button => button.addEventListener('click', moveProductToEditList));
    // aby wywołać ponownie funkcję addProduct żeby się dało dodać 
    addInput.value = '';



    list.querySelectorAll('.plus, .minus').forEach(button => button.addEventListener('click', valueManage))





    list.querySelectorAll('.remove').forEach(button => button.addEventListener('click', removeProductFromEditList))
}
addBtn.addEventListener('click', addNewCustomProductToList);



const createProductNodes = (text, div) => { // funkcja tworzy węzły producktów
    // argument jest tutaj przekazany wewnątrz funkcji moveProductToEditList
    console.log(text);
    if (!list.textContent.includes()) { // tutaj po ty,m warunku trzeba wyodrębnić funkcje tworzące od nadających text w liscie edytowalnej


        const div = document.createElement('div');
        div.classList.add('product');

        const textToFormat = document.createElement('div');
        textToFormat.classList.add('textToFormat')

        const p = document.createElement('p');
        p.classList.add('productName')
        p.textContent = text;

        const btnPlus = document.createElement('button');
        btnPlus.classList.add('plus');
        btnPlus.textContent = '+';

        const btnMin = document.createElement('button');
        btnMin.classList.add('minus');
        btnMin.textContent = '-';

        const valueInput = document.createElement('span');
        valueInput.classList.add('value');
        valueInput.setAttribute('contenteditable', true)
        valueInput.textContent = 1;

        const quantityOptionBtn = document.createElement('button');
        quantityOptionBtn.classList.add('quantityOptionBtn');
        quantityOptionBtn.textContent = 'szt.'

        const remove = document.createElement('button');
        remove.classList.add('remove')
        remove.textContent = 'Usuń'

        list.appendChild(div);
        list.appendChild(textToFormat);
        textToFormat.appendChild(p);
        textToFormat.appendChild(valueInput);
        textToFormat.appendChild(quantityOptionBtn);
        div.appendChild(textToFormat);
        div.appendChild(btnMin);
        div.appendChild(btnPlus);
        div.appendChild(remove);

        createButtonToCopyText()


    }

}


const moveProductToEditList = (e) => { //dodawanie produktu do listy edycji
    console.log(valueText); // przenosi nam ładnie text content
    createEditableListTitle()

    createResetButton()
    let text = e.target.textContent

    if (!list.textContent.includes(text)) { // tutaj po ty,m warunku trzeba wyodrębnić funkcje tworzące od nadających text w liscie edytowalnej
        createProductNodes(text) // przekazane jest to jako argument do createProductNodes


    }





    document.querySelectorAll('.quantityOptionBtn').forEach((option, index) => {
        option.addEventListener('click', quantityBtnTextChange)
        option.dataset.key = index;
    });

    list.querySelectorAll('.plus, .minus').forEach(button => button.addEventListener('click', valueManage))





    list.querySelectorAll('.remove').forEach(button => button.addEventListener('click', removeProductFromEditList))



}
arrBtns.forEach(button => button.addEventListener('click', moveProductToEditList));



const valueManage = (e) => { // funkcja służąca do inkrementacji ilości przyciskami

    list.querySelectorAll('.product').forEach((product, index) => {

        product.dataset.key = index

    });

    list.querySelectorAll('.value').forEach((value, index) => {

        value.dataset.key = index

    });
    list.querySelectorAll('.plus').forEach((plusBtn, index) => {

        plusBtn.dataset.key = index

    });
    list.querySelectorAll('.minus').forEach((minusBtn, index) => {

        minusBtn.dataset.key = index

    });

    const index = e.target.dataset.key
    const plus = document.querySelector(`.plus[data-key = "${index}"]`);
    const minus = document.querySelector(`.minus[data-key = "${index}"]`);
    const activeInput = document.querySelector(`span[data-key="${index}"]`)

    if (e.target.dataset.key == e.target.parentNode.dataset.key) {
        if (e.target == plus) {

            activeInput.textContent++

        } else if (e.target.textContent == minus.textContent && activeInput.textContent >= 2) {

            activeInput.textContent--
        }
    }
}
const removeProductFromEditList = (e) => { // usuwa poszczególne producty z listy edytowalnej
    console.log(e.target.parentNode);
    e.target.parentNode.remove()
    removeEditableListTitle()
    clearClipboardAndOutputList()
    removeCopyTextAndResetButton()

}

const searchProductFromList = (e) => {

    list.querySelectorAll('.productName').forEach(product => {
        if (product.textContent.toLowerCase().includes(e.target.value.toLowerCase())) {

            product.style.backgroundColor = 'orange';

        }
        if (e.target.value === '') product.style.backgroundColor = '';
    })
};
searchInput.addEventListener('input', searchProductFromList);


//-----------------------------------------------------------



// zastanów się czy potrzebne jest usuwanie przycisków z puli produktów

//trzeba nazwy listy stowrzyć w htmlu i ukrywać poprostu zamiast tworzyć i usuwać

// dodaj możliwość dodawania nowych produktów bezpośrednio do listy ewentualnie zapytanie czy chcesz dodać tylko do containera czy też do listy w tym kontekscie trzeba nauczyć się robić popup z tak lub nie

// można dorobić możliwość dopisywania notatek do poszczególnych pozycji z listy (zapytać Ali czy jej potrzeba)

// dodać h2 nad divami że lista edytowalna i że lista gotowa do kopiowania i że kontener z produktami

// dodać flavicon i ogólne stylowanie

//  można dodać ptaszki które jak się kliknie odznaczają że coś zrobione jest, ale to raczej kwestia przyszłości

// na koniec trzeba zoptymalizować kod używając do tego debbugowania i obserwacji zmiennych -- można skorzystać z artykułu w necie podlinkowanego na Trello 
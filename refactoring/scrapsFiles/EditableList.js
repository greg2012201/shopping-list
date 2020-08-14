class EditableList {
    constructor() {

        this.list = document.querySelector('.list');

        if (!this.list.textContent.includes()) {
            this.div = document.createElement('div');
            this.div.classList.add('product');

            this.textToFormat = document.createElement('div');
            this.textToFormat.classList.add('textToFormat')

            this.p = document.createElement('p');
            this.p.classList.add('productName')
            // this.p.textContent = text;

            this.btnPlus = document.createElement('button');
            this.btnPlus.classList.add('plus');
            this.btnPlus.textContent = '+';

            this.btnMin = document.createElement('button');
            this.btnMin.classList.add('minus');
            this.btnMin.textContent = '-';

            this.valueInput = document.createElement('span');
            this.valueInput.classList.add('value');
            this.valueInput.setAttribute('contenteditable', true)
            this.valueInput.textContent = 1;

            this.quantityOptionBtn = document.createElement('button');
            this.quantityOptionBtn.classList.add('quantityOptionBtn');
            this.quantityOptionBtn.textContent = 'szt.'

            this.remove = document.createElement('button');
            this.remove.classList.add('remove')
            this.remove.textContent = 'Usuń'
        }
    }


    createProductNodes(e) { //tworzymy tutaj ale przeniesienie powinno odbyć się w interface 
        console.log(this.list.textContent);
        // let text = e.target.textContent;

        /*  if (!this.list.textContent.includes()) { // tutaj po ty,m warunku trzeba wyodrębnić funkcje tworzące od nadających text w liscie edytowalnej


             */ // obsługę listy edytowalnej pasuje utworzyć może EditableList
        // najprawdzopodobinej najlepszym rozwiązaniem będzie umieśćić w konstruktorze to co jest powyżej czyli i rozdzielić to z append, tylko czy wtedy nie bęzie problemu z tym że nam się stworzą tylko raz elementy ?    w innym wypadku prawdopodobna będzie potrzeba wykonania paru domknięć aby wynieść zmienne wyżej

        /* -------------------------------------------------------------------------- */
        this.list.appendChild(this.div);
        this.list.appendChild(this.textToFormat);
        this.textToFormat.appendChild(this.p);
        this.textToFormat.appendChild(this.valueInput);
        this.textToFormat.appendChild(this.quantityOptionBtn);
        this.div.appendChild(this.textToFormat);
        this.div.appendChild(this.btnMin);
        this.div.appendChild(this.btnPlus);
        this.div.appendChild(this.remove);







    }
    removeProductFromEditableList(e) {
        console.log('działa');
        e.target.parentNode.remove()

    }

    createEditableListTitle() { // funkcja tworząca tytuł dla listy edytowalnej
        const editableListTitle = document.querySelector('.editableListTitle');
        editableListTitle.style.display = 'block';

    }

    removeEditableListTitle() {


    }
}
class EditableList {
    constructor() {

        this.list = document.querySelector('.list');
        this.wrapp = document.querySelector('.wrapper');
        this.editableListTitle = document.querySelector('.editableListTitle');
        /*  this.productsNames = this.createEditableListInterface(); //returned form clouser */
        this.copyBtn = this.createEditableListInterface(); // clousure
        this.resetBtn = this.createEditableListInterface(); // clousure 



        this.key = 0


    }
    createProductNodes(e) { //tworzymy tutaj ale przeniesienie powinno odbyć się w interface 

        let text = e.target.textContent;


        if (!this.list.textContent.includes()) { // tutaj po ty,m warunku trzeba wyodrębnić funkcje tworzące od nadających text w liscie edytowalnej
            this.key++

            const product = document.createElement('div');
            product.classList.add('product');
            product.dataset.key = this.key;



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

            this.list.appendChild(product);
            this.list.appendChild(textToFormat);
            textToFormat.appendChild(p);
            textToFormat.appendChild(valueInput);
            textToFormat.appendChild(quantityOptionBtn);
            product.appendChild(textToFormat);
            product.appendChild(btnMin);
            product.appendChild(btnPlus);
            product.appendChild(remove);

            return this.product = product



        }



    }
    removeProductFromEditableList(e) {

        e.target.parentNode.remove()



    }

    createEditableListInterface() { // zastanawia mnie czy nie warto użyć teego grlobalnie także dla przyciskInterface

        this.editableListTitle.style.display = 'block';
        const productsNames = document.querySelectorAll('.productName');
        // to musi koniecznie iść do domknięcia w górę żeby to przekazać do remova

        if (this.editableListTitle.style.display === 'block' && productsNames.length == 0)
            this.editableListTitle.style.display = 'none';


        else if (productsNames.length === 1) {

            const resetBtn = document.createElement('button');
            resetBtn.classList.add('reset');
            resetBtn.textContent = 'Resetuj wszystko';
            this.wrapp.appendChild(resetBtn);

            const copyBtn = document.createElement('button')
            copyBtn.textContent = 'Kopiuj listę do schowka'
            copyBtn.classList.add('copy')
            this.wrapp.appendChild(copyBtn)



            //copy.addEventListener('click', copyTextToClipboard); 

            return this.copyBtn = copyBtn, this.resetBtn = resetBtn; // clousure 
        }


    }

    removeEditableListInterface() {

        console.log(this.copyBtn);


        if (document.querySelectorAll('.productName').length == 0) {
            // document.querySelector('.editableListTitle').style.display = 'none';

            this.editableListTitle.style.display = 'none';
            this.copyBtn.remove();
            this.resetBtn.remove();


        } // trzeba  jakiś warunek skonstruować 

    }




}
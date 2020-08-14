class Interface {

    constructor() {

        this.productPalette = new ProductPalette();
        this.editableList = new EditableList()

        this.productBtns = document.querySelectorAll('.buttons').forEach(button => button.addEventListener('click', this.render.bind(this)));





    }
    render(e) {


        this.editableList.createProductNodes(e);
        // this.editableList.removeEditableListTitle();

        this.editableList.createEditableListInterface();



        document.querySelectorAll('.remove').forEach((button) => button.addEventListener('click', this.editableList.removeProductFromEditableList)); // dobrze by było pochwytać to ze zmiennych nie koniecznie z querry selectora w tym celu do constructora editable list trzeba by zrobić clousure tych elementów

        document.querySelectorAll('.remove').forEach((button) => button.addEventListener('click', this.editableList.removeEditableListInterface.bind(this.editableList))); // tu  można sprytnie bindować 


        this.editableList.resetBtn.addEventListener('click', this.resetAplication.bind(this));


    }
    resetAplication() {



        this.editableList.editableListTitle.style.display = 'none';
        this.editableList.copyBtn.remove();
        this.editableList.resetBtn.remove();
        document.querySelectorAll('.product').forEach(product => product.remove());

    }


}
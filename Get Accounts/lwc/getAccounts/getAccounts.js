import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

export default class GetAccounts extends LightningElement {
    accountsToDisplay = [];
    quantityOfRecords = 5;

    connectedCallback(){
        this.retrieveAccounts();
    }

    retrieveAccounts() {
        if (this.quantityOfRecords < 1) {
            console.error('The number of records should be a positive number');
            return;
        }

        getAccounts({ count: this.quantityOfRecords })
            .then(response => {
                this.accountsToDisplay = response;
                console.log(response);
            })
            .catch(error => {
                console.error('Error fetching data: ' + JSON.stringify(error));
            });
    }
    

    quantityChange(event){
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value) && value > 0) {
            this.quantityOfRecords = value;
        } else {
            console.error('The number of records should be a positive number');
            this.quantityOfRecords = 5;
        }        
        this.retrieveAccounts();
    }
    
}

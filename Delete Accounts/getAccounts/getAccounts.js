import { LightningElement, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';
import LightningConfirm from 'lightning/confirm';
import AccountDeleter from '@salesforce/apex/AccountController.AccountDeleter';

export default class GetAccounts extends LightningElement {
    accountsToDisplay = [];
    quantityOfRecords = 5;
    @track accountId = ''
    @track filterValue = ''

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

    async handleConfirmClick(event) {
        this.accountId = event.target.dataset.accountid;
        const dataName = event.target.dataset.name;
        const result = await LightningConfirm.open({
            message: 'Are you sure to delete to '+dataName+'?',
            variant: 'headerless',
            label: 'this is the aria-label value',
            // setting theme would have no effect
        });
        if (result) {
            console.log('El valor de data-id es:', this.accountId);
            this.handleDelete();
        }
    }

    handleDelete() {
        AccountDeleter({ accountId: this.accountId })
            .then(response  => {                
                console.log(response );

                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Account Deleted',
                        variant: 'success',
                    }),
                );
                this.quantityOfRecords = 5;
                this.retrieveAccounts();
            })
            .catch(error => {
                console.error('Error to delete this Account: ' + JSON.stringify(error));

                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error to delete this Account',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );

            });
    }   
}

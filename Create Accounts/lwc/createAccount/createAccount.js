import { LightningElement, track } from 'lwc';
import createAccount from '@salesforce/apex/AccountController.createAccount';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CreateAccount extends LightningElement {

    @track accountName = '';
    @track accountPhone = '';
    @track accountWebsite = '';

    handleInputChange(event) {
        const fieldForm = event.target.dataset.id;
        if (fieldForm === 'name') {
            this.accountName = event.target.value;
        } else if (fieldForm === 'website') {
            this.accountWebsite = event.target.value;
        } else if (fieldForm === 'phone') {
            this.accountPhone = event.target.value;
        }
    }

    handleSave() {
        createAccount({ name: this.accountName, website: this.accountWebsite, phone: this.accountPhone })
            .then(responseAccountId  => {                
                console.log(responseAccountId );

                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Account created with the ID: ' + responseAccountId,
                        variant: 'success',
                    }),
                );


                this.accountName    = ''
                this.accountPhone   = ''
                this.accountWebsite = ''
            })
            .catch(error => {
                console.error('Error to create an Account: ' + JSON.stringify(error));

                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error to create an Account',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );

            });
    }

}
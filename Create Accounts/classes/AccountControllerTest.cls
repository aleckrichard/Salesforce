@isTest
private class AccountControllerTest {
    @isTest
    static void createAccountTest() {
    
        String name = 'test';
        String phone = '6511223344';
        String website = 'www.test.com';

        Test.startTest();
        String accountId = AccountController.createAccount(name, website, phone);
        Test.stopTest();

        Account createdAccount = [SELECT Id, Name, Website, Phone FROM Account WHERE Id = :accountId];
        System.assertNotEquals(null, createdAccount, 'La cuenta debe haberse creado.');
        System.assertEquals(name, createdAccount.Name, 'El nombre de la cuenta debe coincidir.');
        System.assertEquals(website, createdAccount.Website, 'El sitio web de la cuenta debe coincidir.');
        System.assertEquals(phone, createdAccount.Phone, 'El teléfono de la cuenta debe coincidir.');    
    
    }


    @isTest
    static void getHighRevenueAccountRecordsTest() {
        Test.startTest();
        List<Account> highRevenueAccounts = AccountController.getHighRevenueAccountRecords();
        Test.stopTest();
    }
    
    @testSetup
    static void setup() {
        // Crear cuentas de prueba con datos de ingresos anuales
        List<Account> accounts = new List<Account>();
        for (Integer i = 0; i < 15; i++) {
            accounts.add(new Account(
                Name = 'Test Account ' + i,
                AnnualRevenue = i * 100000
            ));
        }
        insert accounts;
    }

    @isTest
    static void getAccountsTest(){
        Integer quantity = 10;
        Test.startTest();
        List<Account> accounts = AccountController.getAccounts(quantity);
        Test.stopTest();

        System.assertEquals(10, accounts.size(), 'Debe devolver exactamente 10 cuentas.');
    }

}
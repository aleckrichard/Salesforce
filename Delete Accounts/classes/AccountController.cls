public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getHighRevenueAccountRecords(){
        return [SELECT Id, Name, AnnualRevenue FROM Account Limit 12];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(Integer count){
        return [SELECT Id, Name, Website FROM Account Limit :count];
    }

   @AuraEnabled
   public static String createAccount(String name, String website, String phone){
    try {
      Account account = new Account();
      account.Name = name;
      account.Website = website;
      account.Phone = phone;
      insert account;
      return account.Id;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
   } 

   @AuraEnabled
   public static string AccountDeleter(Id accountId){
    
    if(accountId == null){
      throw new IllegalArgumentException('the Account ID cannot be null');
    }
    try {
      Account accountToDelete = [SELECT Id FROM Account WHERE Id = :accountId LIMIT 1];
      delete accountToDelete;
      return 'Account Deleted';
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
   }

}
public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getHighRevenueAccountRecords(){
      try {
        return [SELECT Id, Name, AnnualRevenue FROM Account Limit 12];
      } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
      }
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(Integer count){
      try {
        return [SELECT Id, Name, AnnualRevenue FROM Account Limit :count];
      } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
      }
    }

}
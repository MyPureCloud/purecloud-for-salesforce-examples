trigger ContactTrigger on Contact(after insert, before update, after update) {
  if (DoNotCallManager.bypassTrigger) {
    return;
  }

  if (Trigger.isUpdate) {
    for (Contact c : Trigger.new) {
      Contact oldContact = Trigger.oldMap.get(c.Id);
      if (Trigger.isBefore) {
        if (oldContact.DoNotCall == true && c.DoNotCall == false) {
          c.DoNotCall = true;
        }
      } else {
        if (oldContact.DoNotCall == false && c.DoNotCall == true) {
          DoNotCallManager.addPhoneNumber(c.Id, c.Phone);
        }
      }
    }
  }

  if (Trigger.isInsert && Trigger.isAfter) {
    for (Contact c : Trigger.new) {
      if (c.DoNotCall == true) {
        DoNotCallManager.addPhoneNumber(c.Id, c.Phone);
      }
    }
  }
}
